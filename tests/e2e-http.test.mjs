import { test, describe } from "node:test";
import assert from "node:assert/strict";

const BASE_URL = "http://localhost:3000";

describe("EduNova AI Live End-to-End Route Validation", () => {
  const routes = [
    { path: "/", titleCheck: "EduNova AI" },
    { path: "/dashboard", titleCheck: "Dashboard" },
    { path: "/chat", titleCheck: "AI Companion" },
    { path: "/coding", titleCheck: "Coding" },
    { path: "/dsa", titleCheck: "DSA" },
    { path: "/aiml", titleCheck: "Machine Learning" },
    { path: "/interviews", titleCheck: "Interview" },
    { path: "/hr-interview", titleCheck: "HR" },
    { path: "/aptitude", titleCheck: "Aptitude" },
    { path: "/resume-analyzer", titleCheck: "Resume" },
    { path: "/placement", titleCheck: "Placement" },
    { path: "/study-planner", titleCheck: "Study Planner" },
    { path: "/quiz", titleCheck: "Quiz" },
    { path: "/documents", titleCheck: "Notes" },
    { path: "/analytics", titleCheck: "Analytics" },
    { path: "/settings", titleCheck: "Settings" },
    { path: "/login", titleCheck: "Account" },
    { path: "/onboarding", titleCheck: "Onboarding" },
  ];

  for (const r of routes) {
    test(`GET ${r.path} returns HTTP 200 and renders HTML`, async () => {
      const res = await fetch(`${BASE_URL}${r.path}`);
      assert.equal(res.status, 200, `Expected 200 for ${r.path}, got ${res.status}`);
      const text = await res.text();
      assert.ok(text.length > 500, `Response too short for ${r.path}`);
      assert.ok(text.includes("<!DOCTYPE html>"), `Missing HTML doctype on ${r.path}`);
    });
  }
});

describe("EduNova AI API Endpoints Live Execution", () => {
  test("POST /api/chat generates valid response payload", async () => {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: "Explain Python Decorators with examples",
        learningMode: "Coding Mentor",
      }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.content.length > 50);
    assert.ok(data.timestamp);
  });

  test("POST /api/quiz generates 5 structured questions", async () => {
    const res = await fetch(`${BASE_URL}/api/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: "Operating Systems Virtual Memory",
        count: 5,
        difficulty: "Medium",
      }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.questions.length, 5);
    for (const q of data.questions) {
      assert.ok(q.question);
      assert.equal(q.options.length, 4);
      assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
      assert.ok(q.explanation);
    }
  });

  test("POST /api/analyze-resume extracts skills and score", async () => {
    const sampleResume = `
Alex Vance - Computer Science Student
Skills: Python, TypeScript, React, Next.js, SQL, Docker, Machine Learning
Projects: Built an intelligent distributed caching engine and AI chat workspace.
    `;
    const res = await fetch(`${BASE_URL}/api/analyze-resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeText: sampleResume,
        targetRole: "Full-Stack AI Engineer",
      }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.analysis.overallScore >= 50 && data.analysis.overallScore <= 100);
    assert.ok(data.analysis.detectedSkills.length > 0);
    assert.ok(data.analysis.customInterviewQuestions.length > 0);
  });

  test("POST /api/code-assist executes code safely in sandbox", async () => {
    const res = await fetch(`${BASE_URL}/api/code-assist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: "const x = 10; const y = 25; console.log(x + y);",
        language: "javascript",
        action: "run",
      }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.output.trim(), "35");
  });
});
