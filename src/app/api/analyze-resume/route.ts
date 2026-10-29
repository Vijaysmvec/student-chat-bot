import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const resumeSchema = z.object({
  resumeText: z.string().min(20, "Please provide more resume text for a meaningful analysis"),
  targetRole: z.string().default("Full-Stack Software Engineer"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = resumeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid resume text" }, { status: 400 });
    }

    const { resumeText, targetRole } = parsed.data;
    const lower = resumeText.toLowerCase();

    // Skills checklist
    const commonSkills = ["python", "javascript", "typescript", "react", "next.js", "node.js", "sql", "docker", "aws", "git", "c++", "java", "data structures", "algorithms", "rest api", "graphql", "machine learning", "pytorch"];
    const detectedSkills = commonSkills.filter(s => lower.includes(s));
    const missingSkills = ["Docker", "Kubernetes", "CI/CD Pipeline", "System Design", "Cloud (AWS/GCP)", "Unit Testing (Jest/Pytest)"].filter(
      s => !lower.includes(s.toLowerCase())
    );

    // Heuristic ATS score based on word count, bullet points, detected skills
    const lengthScore = Math.min(30, Math.floor(resumeText.split(/\s+/).length / 10));
    const skillsScore = Math.min(40, detectedSkills.length * 4);
    const metricScore = (lower.includes("%") || lower.includes("increased") || lower.includes("reduced") || lower.includes("optimized")) ? 20 : 10;
    const totalScore = Math.min(96, Math.max(52, lengthScore + skillsScore + metricScore));

    const analysis = {
      overallScore: totalScore,
      targetRole,
      detectedSkills: detectedSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
      missingKeywords: missingSkills,
      strengths: [
        `Clear demonstration of technical foundations with ${detectedSkills.length} relevant skill keywords.`,
        "Projects feature modern development stacks.",
        "Demonstrated hands-on programming experience.",
      ],
      improvementRecommendations: [
        "Quantify your project outcomes using metrics (e.g., 'Reduced query latency by 42% using Redis caching').",
        `Add missing high-demand industry keywords: ${missingSkills.slice(0, 3).join(", ")}.`,
        "Highlight unit testing, automated deployments, and continuous integration practices.",
        "Ensure every bullet point follows the Action Verb + Context + Result (XYZ) formula.",
      ],
      customInterviewQuestions: [
        `"I see you have built projects using ${detectedSkills[0] || 'Python'}. What was the most challenging technical bottleneck you faced and how did you debug it?"`,
        `"How would you re-architect your primary project to handle 100,000 daily active users?"`,
        `"Describe how you structured database queries or data models in your featured project."`,
      ],
    };

    return NextResponse.json({ success: true, analysis });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to analyze resume" }, { status: 500 });
  }
}
