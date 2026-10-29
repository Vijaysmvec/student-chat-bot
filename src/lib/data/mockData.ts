export interface DsaTopic {
  id: string;
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Hard";
  category: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  problemsCount: number;
  completedCount: number;
}

export const DSA_TOPICS: DsaTopic[] = [
  {
    id: "arrays",
    name: "Arrays & Dynamic Arrays",
    difficulty: "Beginner",
    category: "Linear",
    description: "Contiguous memory allocations, prefix sums, sliding window, and two-pointer paradigms.",
    timeComplexity: "Lookup: O(1), Insert: O(N)",
    spaceComplexity: "O(N)",
    problemsCount: 24,
    completedCount: 18,
  },
  {
    id: "binary-search",
    name: "Binary Search & Search Space",
    difficulty: "Beginner",
    category: "Searching",
    description: "Logarithmic search on monotonic functions, search space division, and rotated arrays.",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    problemsCount: 16,
    completedCount: 14,
  },
  {
    id: "linked-lists",
    name: "Linked Lists & Fast/Slow Pointers",
    difficulty: "Beginner",
    category: "Linear",
    description: "Singly, doubly linked lists, cycle detection via Floyd's algorithm, and list reversals.",
    timeComplexity: "Insert at Head: O(1), Search: O(N)",
    spaceComplexity: "O(N)",
    problemsCount: 18,
    completedCount: 12,
  },
  {
    id: "trees",
    name: "Binary Trees & BST",
    difficulty: "Intermediate",
    category: "Non-Linear",
    description: "Inorder, preorder, postorder, level order traversals, lowest common ancestors, and balancing.",
    timeComplexity: "Balanced Search: O(log N)",
    spaceComplexity: "O(H)",
    problemsCount: 22,
    completedCount: 15,
  },
  {
    id: "graphs",
    name: "Graphs (BFS, DFS, Dijkstra)",
    difficulty: "Intermediate",
    category: "Non-Linear",
    description: "Adjacency lists, cycle detection, topological sorting (Kahn's), and shortest path algorithms.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    problemsCount: 28,
    completedCount: 16,
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    difficulty: "Hard",
    category: "Optimization",
    description: "Overlapping subproblems, optimal substructure, memoization, and bottom-up tabulation.",
    timeComplexity: "Varies (e.g. O(N*W))",
    spaceComplexity: "O(N) or O(N*W)",
    problemsCount: 35,
    completedCount: 19,
  },
];

export interface AIMLTrack {
  id: string;
  title: string;
  level: "Fundamentals" | "Core ML" | "Deep Learning" | "Generative AI";
  modulesCount: number;
  duration: string;
  summary: string;
  keyTopics: string[];
}

export const AIML_TRACKS: AIMLTrack[] = [
  {
    id: "python-ai",
    title: "Python for Data Science & AI",
    level: "Fundamentals",
    modulesCount: 6,
    duration: "12 Hours",
    summary: "Vectorized computing with NumPy, data manipulation with Pandas, and visualization with Matplotlib.",
    keyTopics: ["Broadcasting", "DataFrame Indexing", "Linear Algebra Primitives", "Data Cleaning"],
  },
  {
    id: "supervised-learning",
    title: "Supervised & Unsupervised ML",
    level: "Core ML",
    modulesCount: 8,
    duration: "18 Hours",
    summary: "Linear Regression, Logistic Regression, Decision Trees, Random Forests, SVM, and K-Means clustering.",
    keyTopics: ["Cost Functions", "Gradient Descent", "Bias-Variance Tradeoff", "ROC-AUC & F1-Score"],
  },
  {
    id: "deep-learning",
    title: "Deep Neural Networks & Architectures",
    level: "Deep Learning",
    modulesCount: 7,
    duration: "20 Hours",
    summary: "Multi-layer Perceptrons, Backpropagation, CNNs for vision, and Sequence models (RNN/LSTM).",
    keyTopics: ["Activation Functions", "Backpropagation Calculus", "Convolution Filters", "Adam Optimizer"],
  },
  {
    id: "genai-llms",
    title: "Generative AI, Transformers & RAG",
    level: "Generative AI",
    modulesCount: 5,
    duration: "15 Hours",
    summary: "Transformer Self-Attention, Vector Embeddings, Semantic Search, and Retrieval-Augmented Generation.",
    keyTopics: ["Scaled Dot-Product Attention", "Tokenization", "Vector Databases", "Prompt Engineering"],
  },
];

export interface CoreCSTopic {
  id: string;
  subject: string;
  topics: { name: string; completed: boolean; important: boolean }[];
}

export const CORE_CS_SYLLABUS: CoreCSTopic[] = [
  {
    id: "os",
    subject: "Operating Systems",
    topics: [
      { name: "Process vs Thread & Context Switching", completed: true, important: true },
      { name: "CPU Scheduling (FCFS, SJF, Round Robin)", completed: true, important: true },
      { name: "Process Synchronization & Semaphores", completed: true, important: true },
      { name: "Deadlocks (Coffman conditions, Banker's algorithm)", completed: false, important: true },
      { name: "Virtual Memory & Page Replacement (LRU, FIFO)", completed: false, important: true },
    ],
  },
  {
    id: "dbms",
    subject: "DBMS & SQL",
    topics: [
      { name: "ACID Properties & Transactions", completed: true, important: true },
      { name: "Database Normalization (1NF, 2NF, 3NF, BCNF)", completed: true, important: true },
      { name: "Indexing (B-Trees vs B+ Trees, Hash Index)", completed: true, important: true },
      { name: "SQL Joins & Complex Window Functions", completed: false, important: true },
      { name: "Concurrency Control & Two-Phase Locking", completed: false, important: false },
    ],
  },
  {
    id: "cn",
    subject: "Computer Networks",
    topics: [
      { name: "OSI 7-Layer vs TCP/IP Model", completed: true, important: true },
      { name: "TCP 3-Way Handshake vs UDP", completed: true, important: true },
      { name: "DNS Resolution & HTTP/HTTPS with TLS", completed: true, important: true },
      { name: "Routing Protocols (OSPF, BGP) & IP Addressing", completed: false, important: false },
      { name: "Congestion Control & Flow Control (Sliding Window)", completed: false, important: true },
    ],
  },
  {
    id: "system-design",
    subject: "System Design Fundamentals",
    topics: [
      { name: "Horizontal vs Vertical Scaling & Load Balancers", completed: true, important: true },
      { name: "Caching Strategies (Redis, Write-through, LRU)", completed: true, important: true },
      { name: "CAP Theorem & Database Sharding", completed: false, important: true },
      { name: "Microservices vs Monoliths & Message Queues", completed: false, important: true },
    ],
  },
];

export interface AptitudeQuestion {
  id: string;
  category: "Quantitative" | "Logical" | "Verbal";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SAMPLE_APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: "apt-1",
    category: "Quantitative",
    question: "A pipe can fill a tank in 6 hours and another pipe can empty it in 8 hours. If both pipes are opened together, in how many hours will the tank be filled?",
    options: ["18 hours", "20 hours", "24 hours", "28 hours"],
    correctIndex: 2,
    explanation: "Net rate per hour = (1/6 - 1/8) = (4 - 3)/24 = 1/24. Hence, the tank is filled in 24 hours.",
  },
  {
    id: "apt-2",
    category: "Quantitative",
    question: "If the price of a commodity increases by 25%, by what percentage must a household reduce its consumption so that the total expenditure remains unchanged?",
    options: ["15%", "20%", "25%", "30%"],
    correctIndex: 1,
    explanation: "Reduction formula = [r / (100 + r)] * 100% = [25 / 125] * 100% = 20%.",
  },
  {
    id: "apt-3",
    category: "Logical",
    question: "Find the next number in the series: 3, 7, 15, 31, 63, ___?",
    options: ["127", "125", "128", "131"],
    correctIndex: 0,
    explanation: "Each number follows the pattern: x_{n} = 2 * x_{n-1} + 1. So, 2 * 63 + 1 = 127.",
  },
  {
    id: "apt-4",
    category: "Logical",
    question: "Statements: All laptops are devices. Some devices are phones. Conclusions: I. Some laptops are phones. II. All devices are laptops.",
    options: ["Only I follows", "Only II follows", "Either I or II follows", "Neither I nor II follows"],
    correctIndex: 3,
    explanation: "From 'All L are D' and 'Some D are P', there is no direct definite overlap required between L and P. Neither conclusion follows.",
  },
  {
    id: "apt-5",
    category: "Verbal",
    question: "Choose the word most nearly opposite in meaning to EPHEMERAL:",
    options: ["Transient", "Perpetual", "Fragile", "Obscure"],
    correctIndex: 1,
    explanation: "'Ephemeral' means lasting for a very short time. The opposite is 'Perpetual' (everlasting/permanent).",
  },
];
