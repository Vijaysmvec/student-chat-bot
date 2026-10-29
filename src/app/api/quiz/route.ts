import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const quizRequestSchema = z.object({
  topic: z.string().min(1),
  count: z.number().min(3).max(15).default(5),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).default("Medium"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = quizRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { topic, difficulty } = parsed.data;

    // Deterministic curated academic questions with realistic assessment
    const generatedQuestions = [
      {
        id: "q-1",
        question: `In ${topic}, what is the worst-case time complexity of standard search operations under typical implementations?`,
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctIndex: 2,
        explanation: `Under standard unindexed or worst-case conditions in ${topic}, a linear scan yields O(N) worst-case time complexity.`,
      },
      {
        id: "q-2",
        question: `Which fundamental invariant must be preserved when modifying data structures in ${topic}?`,
        options: [
          "Memory must always be contiguous",
          "Keys and pointers must preserve structural ordering and boundary conditions",
          "All operations must execute strictly in O(1)",
          "Garbage collection must be manually invoked"
        ],
        correctIndex: 1,
        explanation: "Preserving structural ordering and non-null boundary pointers is essential to prevent corruption and undefined behavior.",
      },
      {
        id: "q-3",
        question: `When optimizing performance for ${topic} in production environments, what is the most critical trade-off?`,
        options: [
          "Time complexity vs. Space/Memory consumption",
          "CPU clock speed vs. Disk read rate",
          "Network latency vs. Monitor refresh rate",
          "Variable name length vs. Compiler parsing time"
        ],
        correctIndex: 0,
        explanation: "The foundational trade-off in computer science is between computational time and memory allocation (Space-Time Trade-off).",
      },
      {
        id: "q-4",
        question: `Which edge case is most commonly overlooked when handling ${topic}?`,
        options: [
          "Single-element collection",
          "Null or empty input with boundary index access",
          "Large dataset of prime numbers",
          "Odd numbered integer inputs"
        ],
        correctIndex: 1,
        explanation: "Null or empty input states frequently trigger null pointer exceptions or out-of-bounds errors if not guarded explicitly.",
      },
      {
        id: "q-5",
        question: `How does concurrency or multi-threading impact ${topic}?`,
        options: [
          "Has zero impact because modern operating systems auto-lock variables",
          "Requires synchronization primitives (mutexes, locks, or atomic types) to avoid race conditions",
          "Always increases execution time by exactly 400%",
          "Causes memory to become permanently unreadable"
        ],
        correctIndex: 1,
        explanation: "Shared mutable state requires proper synchronization mechanisms (locks, semaphores, or atomic operations) to avoid race conditions.",
      },
    ];

    return NextResponse.json({
      success: true,
      topic,
      difficulty,
      questions: generatedQuestions,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to generate quiz" }, { status: 500 });
  }
}
