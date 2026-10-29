"use client";

import { useState, useEffect } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  mode?: string;
  sources?: string[];
}

export interface Conversation {
  id: string;
  title: string;
  learningMode: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  estimatedMinutes: number;
}

export interface QuizAttempt {
  id: string;
  topic: string;
  score: number;
  totalQuestions: number;
  date: string;
  timeSpentSeconds: number;
}

export interface InterviewSession {
  id: string;
  role: string;
  type: "Technical" | "HR";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  score: number;
  date: string;
  feedback: {
    strengths: string[];
    improvements: string[];
    technicalScore: number;
    communicationScore: number;
    summary: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  academicYear: string;
  major: string;
  institution: string;
  targetRole: string;
  targetCompany: string;
  preferredLanguage: string;
  studyStreak: number;
  weeklyHoursGoal: number;
  weeklyHoursLogged: number;
  placementReadiness: number;
  theme: "dark" | "light";
  geminiApiKey?: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Alex Rivera",
  email: "alex.rivera@edunova.edu",
  academicYear: "3rd Year B.Tech",
  major: "Computer Science & Engineering",
  institution: "Apex Institute of Technology",
  targetRole: "Full-Stack AI Engineer",
  targetCompany: "Google / OpenAI",
  preferredLanguage: "Python",
  studyStreak: 12,
  weeklyHoursGoal: 20,
  weeklyHoursLogged: 14.5,
  placementReadiness: 78,
  theme: "dark",
  geminiApiKey: "",
};

const DEFAULT_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "Graph Traversal: BFS vs DFS with Code",
    learningMode: "DSA Coach",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    messages: [
      {
        id: "m-1",
        role: "user",
        content: "What is the difference between BFS and DFS in terms of time and space complexity?",
        timestamp: "2 hours ago",
      },
      {
        id: "m-2",
        role: "assistant",
        content: `### BFS vs. DFS: Core Comparison

Both **Breadth-First Search (BFS)** and **Depth-First Search (DFS)** traverse a graph with $V$ vertices and $E$ edges in:
$$\\mathcal{O}(V + E)$$

#### Key Architectural Differences:
1. **BFS (Queue-based FIFO)**: Explores all neighbor nodes at current depth before advancing to next level.
   - **Space Complexity**: $\\mathcal{O}(W)$ where $W$ is the maximum width of the graph (in worst-case balanced binary tree: $\\mathcal{O}(V/2) = \\mathcal{O}(V)$).
   - **Best for**: Shortest path in unweighted graphs, level-order traversal.

2. **DFS (Stack-based / Recursion LIFO)**: Explores as deep as possible along each branch before backtracking.
   - **Space Complexity**: $\\mathcal{O}(H)$ where $H$ is the maximum height/depth of the tree or recursion stack.
   - **Best for**: Topological sort, cycle detection, maze solving, connected components.`,
        timestamp: "2 hours ago",
        mode: "DSA Coach",
      },
    ],
  },
  {
    id: "conv-2",
    title: "Explain Self-Attention in Transformers",
    learningMode: "AI/ML Expert",
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    messages: [
      {
        id: "m-3",
        role: "user",
        content: "How does the Scaled Dot-Product Attention equation work?",
        timestamp: "Yesterday",
      },
      {
        id: "m-4",
        role: "assistant",
        content: `### Scaled Dot-Product Attention

The foundational equation from *Attention Is All You Need* (Vaswani et al.) is defined as:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

#### Component Breakdown:
- **$Q$ (Query)**: What you are looking for (shape $N \\times d_k$).
- **$K$ (Key)**: What each token offers as metadata (shape $M \\times d_k$).
- **$QK^T$**: Computes dot-product similarity between every query and every key.
- **$\\frac{1}{\\sqrt{d_k}}$**: Scaling factor to prevent large dot-products from pushing the softmax into regions with vanishing gradients.
- **$\\text{softmax}(\\cdot)$**: Normalizes scores into a probability distribution summing to 1 across rows.
- **$V$ (Value)**: Weighted average of semantic values based on computed attention weights!`,
        timestamp: "Yesterday",
        mode: "AI/ML Expert",
      },
    ],
  },
];

const DEFAULT_TASKS: StudyTask[] = [
  {
    id: "task-1",
    title: "Solve 3 Dynamic Programming problems (Knapsack variations)",
    subject: "Data Structures & Algorithms",
    dueDate: "Today",
    priority: "High",
    status: "In Progress",
    estimatedMinutes: 60,
  },
  {
    id: "task-2",
    title: "Revise Operating Systems: Virtual Memory & Page Replacement",
    subject: "Core CS",
    dueDate: "Tomorrow",
    priority: "Medium",
    status: "Pending",
    estimatedMinutes: 45,
  },
  {
    id: "task-3",
    title: "Complete Mock Technical Interview for Frontend/Full-Stack role",
    subject: "Placement Prep",
    dueDate: "In 2 days",
    priority: "High",
    status: "Pending",
    estimatedMinutes: 30,
  },
  {
    id: "task-4",
    title: "Review SQL Window Functions (ROW_NUMBER, RANK, DENSE_RANK)",
    subject: "Database Management",
    dueDate: "Yesterday",
    priority: "Low",
    status: "Completed",
    estimatedMinutes: 40,
  },
];

const DEFAULT_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: "qa-1",
    topic: "Computer Networks: TCP/IP & OSI Model",
    score: 9,
    totalQuestions: 10,
    date: "Oct 25, 2026",
    timeSpentSeconds: 320,
  },
  {
    id: "qa-2",
    topic: "Operating Systems: Process Synchronization & Deadlocks",
    score: 8,
    totalQuestions: 10,
    date: "Oct 26, 2026",
    timeSpentSeconds: 410,
  },
  {
    id: "qa-3",
    topic: "Python & Machine Learning Fundamentals",
    score: 10,
    totalQuestions: 10,
    date: "Oct 27, 2026",
    timeSpentSeconds: 290,
  },
];

const STORAGE_KEYS = {
  PROFILE: "edunova_profile_v1",
  CONVERSATIONS: "edunova_conversations_v1",
  TASKS: "edunova_tasks_v1",
  QUIZZES: "edunova_quizzes_v1",
  INTERVIEWS: "edunova_interviews_v1",
};

export function getInitialProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function getInitialConversations(): Conversation[] {
  if (typeof window === "undefined") return DEFAULT_CONVERSATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return raw ? JSON.parse(raw) : DEFAULT_CONVERSATIONS;
  } catch {
    return DEFAULT_CONVERSATIONS;
  }
}

export function getInitialTasks(): StudyTask[] {
  if (typeof window === "undefined") return DEFAULT_TASKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    return raw ? JSON.parse(raw) : DEFAULT_TASKS;
  } catch {
    return DEFAULT_TASKS;
  }
}

export function getInitialQuizzes(): QuizAttempt[] {
  if (typeof window === "undefined") return DEFAULT_QUIZ_ATTEMPTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    return raw ? JSON.parse(raw) : DEFAULT_QUIZ_ATTEMPTS;
  } catch {
    return DEFAULT_QUIZ_ATTEMPTS;
  }
}

export function useEduNovaStore() {
  const [profile, setProfileState] = useState<UserProfile>(DEFAULT_PROFILE);
  const [conversations, setConversationsState] = useState<Conversation[]>(DEFAULT_CONVERSATIONS);
  const [tasks, setTasksState] = useState<StudyTask[]>(DEFAULT_TASKS);
  const [quizzes, setQuizzesState] = useState<QuizAttempt[]>(DEFAULT_QUIZ_ATTEMPTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProfileState(getInitialProfile());
    setConversationsState(getInitialConversations());
    setTasksState(getInitialTasks());
    setQuizzesState(getInitialQuizzes());
    setIsLoaded(true);
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updates };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(next));
      }
      return next;
    });
  };

  const addConversation = (conv: Conversation) => {
    setConversationsState((prev) => {
      const next = [conv, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(next));
      }
      return next;
    });
  };

  const updateConversation = (id: string, updates: Partial<Conversation>) => {
    setConversationsState((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c));
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(next));
      }
      return next;
    });
  };

  const deleteConversation = (id: string) => {
    setConversationsState((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(next));
      }
      return next;
    });
  };

  const addTask = (task: Omit<StudyTask, "id">) => {
    const newTask: StudyTask = { ...task, id: "task-" + Date.now() };
    setTasksState((prev) => {
      const next = [newTask, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(next));
      }
      return next;
    });
  };

  const updateTaskStatus = (id: string, status: StudyTask["status"]) => {
    setTasksState((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, status } : t));
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(next));
      }
      return next;
    });
  };

  const deleteTask = (id: string) => {
    setTasksState((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(next));
      }
      return next;
    });
  };

  const recordQuizAttempt = (attempt: Omit<QuizAttempt, "id" | "date">) => {
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: "qa-" + Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setQuizzesState((prev) => {
      const next = [newAttempt, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(next));
      }
      return next;
    });
  };

  return {
    isLoaded,
    profile,
    updateProfile,
    conversations,
    addConversation,
    updateConversation,
    deleteConversation,
    tasks,
    addTask,
    updateTaskStatus,
    deleteTask,
    quizzes,
    recordQuizAttempt,
  };
}
