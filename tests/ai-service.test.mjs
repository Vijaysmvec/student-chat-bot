import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { SYSTEM_PROMPTS, LEARNING_MODES, generateEduNovaResponse } from "../src/lib/gemini/client.ts";

describe("EduNova AI Service & Pedagogical Modes", () => {
  test("All 8 Learning Modes have complete system instructions", () => {
    assert.equal(LEARNING_MODES.length, 8);
    for (const mode of LEARNING_MODES) {
      assert.ok(SYSTEM_PROMPTS[mode.id], `Missing system prompt for mode: ${mode.id}`);
      assert.ok(SYSTEM_PROMPTS[mode.id].length > 50, `System prompt too short for: ${mode.id}`);
    }
  });

  test("Offline Fallback handles BFS/DFS questions with math and code", async () => {
    const res = await generateEduNovaResponse({
      prompt: "What is the difference between BFS and DFS?",
      learningMode: "DSA Coach",
    });

    assert.equal(res.isDemo, true);
    assert.ok(res.content.includes("Breadth-First Search"));
    assert.ok(res.content.includes("Depth-First Search"));
    assert.ok(res.content.includes("mathcal{O}(V + E)"));
    assert.ok(res.content.includes("```python"));
  });

  test("Offline Fallback handles Attention and Transformers with LaTeX", async () => {
    const res = await generateEduNovaResponse({
      prompt: "Explain transformer self-attention",
      learningMode: "AI/ML Expert",
    });

    assert.equal(res.isDemo, true);
    assert.ok(res.content.includes("\\text{Attention}(Q, K, V)"));
    assert.ok(res.content.includes("softmax"));
    assert.ok(res.content.includes("sqrt{d_k}"));
  });

  test("Socratic Tutor mode avoids immediate answer dumping", async () => {
    const res = await generateEduNovaResponse({
      prompt: "How to invert a binary tree?",
      learningMode: "Socratic Tutor",
    });

    assert.equal(res.isDemo, true);
    assert.ok(res.content.includes("Let's Explore This Together"));
    assert.ok(res.content.includes("initial intuition"));
  });
});
