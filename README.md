# EduNova AI — Next-Generation Student AI Companion & Placement Preparation Platform

> **"Code Smarter. Learn Faster. Get Hired."**

EduNova AI is a full-stack, futuristic AI learning companion and developer placement preparation platform. Engineered specifically for engineering students, software developers, and placement aspirants, EduNova AI fuses an immersive dark-first glassmorphism workstation with Google Gemini intelligence, interactive algorithm visualizers, a live coding playground, and comprehensive mock interview simulations.

---

## 🌟 Key Product Modules

### 1. 🤖 AI Learning Companion (`/chat`)
- **8 Specialized Pedagogical Modes**:
  - `Beginner Tutor`: Engaging analogies, intuition-first breakdowns, and welcoming tone.
  - `Advanced Tutor`: Deep technical rigor, formal proofs, architectural trade-offs, and memory layouts.
  - `Coding Mentor`: Clean, idiomatic production-grade code with edge-case audits.
  - `AI/ML Expert`: Mathematical formulations, tensor dimensions, and backpropagation derivations.
  - `DSA Coach`: Algorithmic patterns, invariants, two-pointer / DP approaches, and interview follow-ups.
  - `Interview Coach`: Mock interview evaluations using STAR method and technical rubrics.
  - `Socratic Tutor`: Progressive hints and guided inquiry that lead the learner to deduce answers.
  - `Exam Revision`: Rapid high-yield notes, key formulas, bullet points, and common traps.
- **Mathematical Rendering**: Full LaTeX support powered by KaTeX (inline `$formula$` and display `$$display$$`).
- **Syntax Highlighting & Code Management**: Formatted code blocks with one-click copy, language indicators, and responsive scrollbars.
- **Persistent Conversations**: Grouped by Today, Yesterday, and Older with search, rename, and deletion controls.

### 2. ⚡ Student Command Dashboard (`/dashboard`)
- Contextual greeting with real-time academic goal tracking.
- Prominent AI Command Bar with interactive suggestion chips.
- Live Placement Readiness Index indicator.
- Daily coding streak counter and weekly study hours progress bar.
- Quick-launch cards to all core workstations.

### 3. 💻 Interactive Coding Playground (`/coding`)
- Multi-language support: Python 3, JavaScript (Node), C++ 20.
- Problem description, constraints, and sample test case panel.
- Monaco-style code editor with line numbers and template resets.
- AI Code Explainer, AI Bug Detector, and Time/Space Complexity Analyzer.
- Sandboxed execution terminal with status reporting.

### 4. 📊 DSA Academy & Algorithm Visualizer (`/dsa`)
- Comprehensive curriculum covering 140+ standard LeetCode problems.
- Interactive Step-by-Step Algorithm Visualizers:
  - **Bubble Sort**: Animated comparisons, swaps, and sorted partitions.
  - **Binary Search**: Low, Mid, and High pointer markers narrowing the search range.
- Playback controls: Play / Pause, Step Forward, Speed (0.5x, 1x, 2x), and Array Randomizer.

### 5. 🧠 AI & Machine Learning Lab (`/aiml`)
- 4 Learning Tracks: Python for Data Science, Core ML, Deep Learning, Generative AI & Transformers.
- Interactive Visualizers:
  - **Linear Regression**: Dynamic slope ($m$) and intercept ($b$) sliders with live Mean Squared Error (MSE) calculation.
  - **Neural Network Forward Pass**: Interactive feature inputs, hidden layer ReLU activations, and Sigmoid output probability.

### 6. 🎙️ Technical Interview Simulator (`/interviews`)
- Role selection (Full-Stack AI Engineer, Backend Software Developer, Data Scientist).
- Difficulty settings (Beginner, Intermediate, Advanced).
- Virtual AI Avatar with real-time countdown timer.
- Text and Speech-to-Text input options.
- Comprehensive scorecard report with technical accuracy, communication clarity, and sample upgraded answers.

### 7. 🤝 HR & Behavioral Interview Preparation (`/hr-interview`)
- STAR Framework (Situation, Task, Action, Result) interactive guides.
- Common behavioral interview questions (Conflict resolution, Leadership, Handling critical failures).
- AI Critique & Phrasing Upgrade providing instant rewrites with measurable metrics.

### 8. 🎯 Aptitude & Reasoning Center (`/aptitude`)
- Quantitative Aptitude, Logical Reasoning, and Verbal Ability tests.
- Timed test simulation with question palette and countdown clock.
- Deterministic score calculation and step-by-step mathematical explanations.

### 9. 📄 AI Resume Analyzer & ATS Audit (`/resume-analyzer`)
- Resume text parser and target role comparator.
- Transparent ATS heuristic score (0 - 100).
- Detected technical keywords and missing competency checklist.
- Custom project defense interview questions generated directly from your resume.

### 10. 🏆 Placement Preparation Dashboard (`/placement`)
- Overall weighted Placement Readiness score.
- Core Computer Science Topic Checklist (OS, DBMS, Computer Networks, System Design) with interactive completion toggles.
- 4-Week Placement Sprint roadmap.

### 11. 📅 Smart Study Planner (`/study-planner`)
- Daily, Weekly, and Monthly study task manager with priority tags.
- Embedded Pomodoro Focus Timer with 25-minute sprint sessions.
- AI Timetable Generator proposing personalized revision schedules.

### 12. 🃏 Quiz & Flashcard Studio (`/quiz`)
- Topic-specific AI quiz generator with instant grading and review.
- 3D Animated Flip Flashcards with CSS perspective transforms.

### 13. 📑 Notes & Document Intelligence (`/documents`)
- Upload lecture notes, PDFs, Markdown documents, and code files.
- Grounded AI Q&A with exact source section citations.

### 14. 📈 Learning Analytics (`/analytics`)
- Weekly study time area chart with Recharts.
- Subject mastery bar chart.
- Assessment score progression line chart.

### 15. ⚙️ Profile & Settings (`/settings`)
- Academic credentials configuration.
- Optional custom Google Gemini API Key input (stored locally in browser).
- Workspace data export (JSON backup) and reset controls.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom glassmorphism design tokens
- **Typography**: Inter / Geist Sans & Geist Mono
- **Math & Equations**: [KaTeX](https://katex.org/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown) + Remark GFM
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **AI Engine**: Google Gemini API via official `@google/genai` SDK + Intelligent Offline Simulator
- **Data & State**: LocalStorage persistence + Firestore-ready schema

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### 2. Installation
Clone the repository and install dependencies:
\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

If you have a Google Gemini API key from [Google AI Studio](https://aistudio.google.com/), add it:
\`\`\`env
GEMINI_API_KEY="your-gemini-api-key"
GEMINI_MODEL="gemini-2.5-flash"
\`\`\`
*(If no API key is provided, EduNova AI automatically enables its built-in Intelligent Simulation Engine so all features work seamlessly offline).*

### 4. Running the Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Building for Production
\`\`\`bash
npm run build
npm run start
\`\`\`

---

## 🔒 Security & Privacy

1. **Zero Secret Leaks**: Gemini API keys and sensitive server operations are handled exclusively through server-side Route Handlers. No credentials are leaked to client bundles.
2. **Safe Code Evaluation**: The coding playground utilizes a sandboxed evaluation engine with bounded runtime limits.
3. **Strict Validation**: All incoming API requests are validated with [Zod](https://zod.dev/).

---

## 📄 License
MIT License. Built for students, developers, and educators worldwide.
"# Student-chat-bot" 
