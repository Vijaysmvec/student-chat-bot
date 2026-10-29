import { GoogleGenAI } from "@google/genai";

export const LEARNING_MODES = [
  { id: "Beginner Tutor", label: "Beginner Tutor", icon: "GraduationCap", desc: "Intuitive analogies & simple step-by-step guidance" },
  { id: "Advanced Tutor", label: "Advanced Tutor", icon: "Brain", desc: "Deep technical rigor, formal proofs & trade-offs" },
  { id: "Coding Mentor", label: "Coding Mentor", icon: "Code2", desc: "Clean code, debugging, and idiomatic practices" },
  { id: "AI/ML Expert", label: "AI/ML Expert", icon: "Cpu", desc: "Neural networks, math formulas & model architectures" },
  { id: "DSA Coach", label: "DSA Coach", icon: "Binary", desc: "Algorithmic patterns, complexity analysis & hints" },
  { id: "Interview Coach", label: "Interview Coach", icon: "Briefcase", desc: "STAR framework, mock practice & recruiter feedback" },
  { id: "Socratic Tutor", label: "Socratic Tutor", icon: "Sparkles", desc: "Guided inquiry and hints to lead you to discovery" },
  { id: "Exam Revision", label: "Exam Revision", icon: "BookCheck", desc: "High-yield summaries, formulas & common pitfalls" },
] as const;

export type LearningMode = (typeof LEARNING_MODES)[number]["id"];

export const SYSTEM_PROMPTS: Record<LearningMode, string> = {
  "Beginner Tutor": `You are EduNova AI in "Beginner Tutor" mode. 
Your goal is to make computer science, software engineering, and academic concepts crystal clear to beginners.
Guidelines:
1. Start with an engaging real-world analogy.
2. Break down the concept into 3-4 numbered steps.
3. Provide a clear, bite-sized example.
4. Highlight common misconceptions.
5. End with a simple check-your-understanding question.
Always use Markdown formatting. For mathematical expressions, use LaTeX syntax ($inline$ or $$display$$).`,

  "Advanced Tutor": `You are EduNova AI in "Advanced Tutor" mode.
Your audience consists of senior computer science students and engineers preparing for high-bar technical roles.
Guidelines:
1. Provide comprehensive technical depth, architectural trade-offs, and invariants.
2. Include formal mathematical notation ($...$, $$...$$) where applicable.
3. Discuss memory layouts, CPU cache implications, concurrent safety, and edge cases.
4. Reference industry standards and design patterns.`,

  "Coding Mentor": `You are EduNova AI in "Coding Mentor" mode.
Your purpose is to produce production-grade, maintainable code and teach clean coding practices.
Guidelines:
1. Write clean, readable code with type annotations and concise comments.
2. Provide time and space complexity in Big-O notation: $\\mathcal{O}(\\cdot)$.
3. Highlight edge cases (null inputs, empty arrays, overflows).
4. Offer optimization suggestions or refactoring alternatives.`,

  "AI/ML Expert": `You are EduNova AI in "AI & Machine Learning Expert" mode.
You specialize in machine learning theory, deep learning architectures, Generative AI, and mathematical derivations.
Guidelines:
1. Explain the underlying mathematical optimization problem using LaTeX ($...$, $$...$$).
2. Clearly explain tensor dimensions, activations, loss functions, and gradients.
3. Provide practical PyTorch or Python code examples where relevant.
4. Address hyperparameter tuning, overfitting mitigation, and evaluation metrics (F1, BLEU, ROC-AUC).`,

  "DSA Coach": `You are EduNova AI in "DSA Coach" mode.
Your objective is to help students master Data Structures and Algorithms for technical interviews.
Guidelines:
1. Identify the algorithmic pattern (e.g., Two Pointers, Monotonic Stack, Top-down DP).
2. State time and space complexity with justification.
3. Provide a structured walkthrough before showing full code.
4. Highlight common interview follow-ups (e.g., "What if the input stream is infinite?").`,

  "Interview Coach": `You are EduNova AI in "Interview Coach" mode.
You conduct mock technical and behavioral interviews for top tech companies.
Guidelines:
1. Evaluate answers based on technical accuracy, structure (STAR method for behavioral), and clarity.
2. Point out specific strengths and areas for improvement.
3. Offer an upgraded, more persuasive phrasing of the candidate's answer.
4. Ask a sharp, realistic follow-up question.`,

  "Socratic Tutor": `You are EduNova AI in "Socratic Tutor" mode.
DO NOT immediately hand out the complete solution.
Guidelines:
1. Acknowledge the student's question and identify the core underlying premise.
2. Ask 1-2 guiding questions or provide an illuminating hint to help the student deduce the answer themselves.
3. Encourage their reasoning and praise correct intuition.
4. If they are stuck after multiple attempts, gently reveal the mechanism step by step.`,

  "Exam Revision": `You are EduNova AI in "Exam Revision" mode.
Deliver high-yield, quick-to-digest revision notes designed for pre-exam cramming and revision.
Guidelines:
1. High-yield definition in 2 sentences.
2. Core formulas and diagrams described in text or LaTeX ($...$).
3. Top 3 "Exam Trap" mistakes students make.
4. 3 quick practice flash-quiz questions with answers.`,
};

export async function generateEduNovaResponse(params: {
  prompt: string;
  learningMode: LearningMode;
  contextMessages?: { role: string; content: string }[];
  apiKeyOverride?: string;
}): Promise<{ content: string; isDemo: boolean; model: string }> {
  const apiKey = params.apiKeyOverride || process.env.GEMINI_API_KEY || "";
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    return {
      content: generateSimulatedResponse(params.prompt, params.learningMode),
      isDemo: true,
      model: "EduNova AI Smart Simulator (Configure GEMINI_API_KEY for live provider)",
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const systemPrompt = SYSTEM_PROMPTS[params.learningMode] || SYSTEM_PROMPTS["Beginner Tutor"];

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser Question:\n${params.prompt}` }],
        },
      ],
    });

    const text = response.text || "No response received from Gemini.";
    return {
      content: text,
      isDemo: false,
      model: modelName,
    };
  } catch (error: any) {
    console.error("Gemini API call failed, falling back to smart simulation:", error?.message || error);
    return {
      content: `> **[Demo Mode Note]** Provider call was redirected to EduNova's offline engine (${error?.message || "Check API key or quota"}).\n\n` +
        generateSimulatedResponse(params.prompt, params.learningMode),
      isDemo: true,
      model: "EduNova Intelligent Fallback",
    };
  }
}

function generateSimulatedResponse(prompt: string, mode: LearningMode): string {
  const p = prompt.toLowerCase();

  if (p.includes("bfs") || p.includes("dfs") || p.includes("graph")) {
    return `### Graph Traversals: Deep Dive

When exploring graphs, the two fundamental traversal algorithms are **Breadth-First Search (BFS)** and **Depth-First Search (DFS)**.

#### 1. Time & Space Complexity
Both algorithms visit every reachable vertex $V$ and traverse every edge $E$:
$$\\text{Time Complexity} = \\mathcal{O}(V + E)$$

Space complexity differs based on the traversal geometry:
- **BFS**: $\\mathcal{O}(W)$ where $W$ is the maximum graph width (queue size).
- **DFS**: $\\mathcal{O}(H)$ where $H$ is the maximum graph depth (call stack size).

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    
    while queue:
        vertex = queue.popleft()
        order.append(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order
\`\`\`

#### 2. Key Interview Takeaways
- Use **BFS** when searching for the *shortest path* in unweighted graphs or finding the minimum moves.
- Use **DFS** for topological sort, cycle detection, path existence, or tree reconstructions.`;
  }

  if (p.includes("attention") || p.includes("transformer") || p.includes("neural") || p.includes("llm")) {
    return `### Scaled Dot-Product Attention in Modern LLMs

At the heart of the Transformer architecture lies **Scaled Dot-Product Attention**:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

#### Step-by-Step Mathematical Flow:
1. **Projection**: Input embeddings are multiplied by learned weight matrices $W_Q, W_K, W_V$ of dimension $d_{\\text{model}} \\times d_k$.
2. **Affinity Matrix**: $QK^T$ computes all-pairs pairwise dot products between query tokens and key tokens.
3. **Scaling**: Division by $\\sqrt{d_k}$ stabilizes the variance of the dot products. For large $d_k$, dot products grow large in magnitude, pushing the softmax function into regions with near-zero gradients.
4. **Softmax Normalization**: Row-wise softmax produces attention weights summing to 1:
$$\\alpha_{ij} = \\frac{\\exp(q_i \\cdot k_j / \\sqrt{d_k})}{\\sum_m \\exp(q_i \\cdot k_m / \\sqrt{d_k})}$$
5. **Context Aggregation**: Multiplying with $V$ yields contextualized token embeddings.`;
  }

  if (p.includes("decorator") || p.includes("python")) {
    return `### Python Decorators: Clean & Idiomatic Explanation

A decorator in Python is a function that takes another function as an argument, extends its behavior without modifying it directly, and returns a new callable function.

#### Core Syntax & Example:
\`\`\`python
import time
from functools import wraps

def time_execution(func):
    """Decorator to benchmark function execution runtime."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start_time
        print(f"[{func.__name__}] Executed in {duration * 1000:.3f} ms")
        return result
    return wrapper

@time_execution
def compute_fibonacci(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print("Result:", compute_fibonacci(100000))
\`\`\`

#### Why \`@wraps(func)\` Matters
Without \`@wraps\`, the decorated function loses its original \`__name__\` and \`__doc__\`. Always use \`functools.wraps\` in production!`;
  }

  // Generic mode-specific responses
  switch (mode) {
    case "Socratic Tutor":
      return `### Let's Explore This Together! 💡

That's a fantastic question on **"${prompt}"**. Before I give you a direct formula or code snippet, let's break it down:

1. **What is your initial intuition?** If you had to solve this manually on a whiteboard with pen and paper, what is the first step you would take?
2. **Constraint Check:** What happens in the simplest possible edge case (e.g., $N = 0$ or an empty input)?

*Think about these two points for a moment. Reply with your thought process and we'll build the complete optimal solution together!*`;

    case "Exam Revision":
      return `### ⚡ High-Yield Revision Summary: ${prompt}

- **Definition:** The fundamental mechanism dealing with \`${prompt}\` in academic curricula.
- **Core Formula / Relationship:**
$$\\text{Efficiency} = \\frac{\\text{Useful Output Work}}{\\text{Total Energy Input}} \\times 100\\%$$
- **3 Top Exam Pitfalls to Avoid:**
  1. Forgetting base cases or null pointer boundary checks.
  2. Confusing average-case time complexity with worst-case bounds.
  3. Omitting the space complexity consumed by the internal call stack.
- **Quick Test Question:** What is the primary difference in space efficiency between iterative and recursive implementations of this concept?`;

    case "Interview Coach":
      return `### 🎯 Technical Interview Evaluation

**Topic:** ${prompt}

#### 1. Ideal Communication Structure (STAR / Problem Framework)
- **Clarification:** Always confirm input constraints, expected output formats, and performance SLAs first.
- **Brute Force Baseline:** Briefly state the $\\mathcal{O}(N^2)$ baseline before jumping to the optimal solution. Shows mature problem-solving progression.
- **Optimal Strategy:** Clearly name your chosen data structure and algorithm pattern.

#### 2. Follow-Up Questions an Interviewer Will Ask You:
1. *"How would your solution adapt if the data could not fit entirely into RAM and had to be streamed from disk?"*
2. *"Can you write 3 edge case unit tests that would break a naive implementation?"*`;

    default:
      return `### Understanding ${prompt}

Here is a structured explanation of **${prompt}** tailored to your learning goals.

#### 1. Core Principle
This concept solves the challenge of structuring computational tasks efficiently. It provides:
- **Determinism:** Reliable execution across varied inputs.
- **Scalability:** Predictable resource consumption as input size $N$ increases.

#### 2. Practical Implementation
\`\`\`typescript
// Example demonstration
function solveProblem<T>(input: T[]): { count: number; items: T[] } {
  const items = [...input];
  return {
    count: items.length,
    items,
  };
}
\`\`\`

#### 3. Complexity & Invariants
- **Time Complexity:** $\\mathcal{O}(N)$
- **Space Complexity:** $\\mathcal{O}(1)$ auxiliary space

Feel free to ask for a deeper dive, test cases, or an alternative perspective!`;
  }
}
