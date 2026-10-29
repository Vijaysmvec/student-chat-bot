import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateEduNovaResponse, LearningMode } from "@/lib/gemini/client";

const chatRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty").max(10000, "Prompt is too long"),
  learningMode: z.string().default("Beginner Tutor"),
  apiKeyOverride: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { prompt, learningMode, apiKeyOverride } = parsed.data;

    const result = await generateEduNovaResponse({
      prompt,
      learningMode: learningMode as LearningMode,
      apiKeyOverride,
    });

    return NextResponse.json({
      success: true,
      content: result.content,
      isDemo: result.isDemo,
      model: result.model,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("API /api/chat error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
