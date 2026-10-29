"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Binary,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Sparkles,
  BarChart3,
  Layers,
  ChevronRight,
  Info,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { DSA_TOPICS } from "@/lib/data/mockData";

const TREE_NODES = [
  { id: 1, val: 50, x: 250, y: 35, left: 2, right: 3 },
  { id: 2, val: 30, x: 130, y: 105, left: 4, right: 5 },
  { id: 3, val: 70, x: 370, y: 105, left: 6, right: 7 },
  { id: 4, val: 20, x: 70, y: 175, left: null, right: null },
  { id: 5, val: 40, x: 190, y: 175, left: null, right: null },
  { id: 6, val: 60, x: 310, y: 175, left: null, right: null },
  { id: 7, val: 85, x: 430, y: 175, left: null, right: null },
];

const TREE_EDGES = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 6 },
  { from: 3, to: 7 },
];

export default function DsaAcademyPage() {
  const [selectedAlgo, setSelectedAlgo] = useState<"bubble" | "binary" | "tree">("bubble");
  const [treeMode, setTreeMode] = useState<"bfs" | "dfs">("bfs");
  const [array, setArray] = useState<number[]>([45, 12, 85, 32, 89, 39, 69, 22, 55, 18]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(250);
  const [stepCount, setStepCount] = useState<number>(0);
  const [targetSearch, setTargetSearch] = useState<number>(39);
  const [binaryPointers, setBinaryPointers] = useState<{ low: number; mid: number; high: number } | null>(null);

  // Tree traversal state
  const [activeTreeNode, setActiveTreeNode] = useState<number | null>(null);
  const [visitedTreeNodes, setVisitedTreeNodes] = useState<number[]>([]);
  const [treeStructureState, setTreeStructureState] = useState<string[]>([]);

  const resetArray = () => {
    setIsPlaying(false);
    setComparing([]);
    setSortedIndices([]);
    setStepCount(0);
    setBinaryPointers(null);
    setActiveTreeNode(null);
    setVisitedTreeNodes([]);
    setTreeStructureState([]);
    if (selectedAlgo === "binary") {
      setArray([12, 18, 22, 32, 39, 45, 55, 69, 85, 89]);
    } else {
      const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 85) + 10);
      setArray(newArr);
    }
  };

  useEffect(() => {
    resetArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAlgo]);

  const runTreeTraversal = async () => {
    setActiveTreeNode(null);
    setVisitedTreeNodes([]);
    setStepCount(0);
    setTreeStructureState([]);

    // BFS (Level Order): 1(50), 2(30), 3(70), 4(20), 5(40), 6(60), 7(85)
    // DFS (Pre-order): 1(50), 2(30), 4(20), 5(40), 3(70), 6(60), 7(85)
    const sequence = treeMode === "bfs" ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 4, 5, 3, 6, 7];
    const visited: number[] = [];
    const log: string[] = [];

    for (let i = 0; i < sequence.length; i++) {
      const nodeId = sequence[i];
      setActiveTreeNode(nodeId);
      setStepCount((s) => s + 1);

      const nodeObj = TREE_NODES.find((n) => n.id === nodeId);
      if (nodeObj) {
        log.push(String(nodeObj.val));
        setTreeStructureState([...log]);
      }

      await new Promise((r) => setTimeout(r, speedMs * 2));
      visited.push(nodeId);
      setVisitedTreeNodes([...visited]);
    }

    setActiveTreeNode(null);
    setIsPlaying(false);
  };

  // Bubble sort step generator
  const runBubbleStep = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        setStepCount((s) => s + 1);
        await new Promise((r) => setTimeout(r, speedMs));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await new Promise((r) => setTimeout(r, speedMs));
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setComparing([]);
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setIsPlaying(false);
  };

  // Binary search step runner
  const runBinarySearch = async () => {
    const arr = [...array];
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      setBinaryPointers({ low, mid, high });
      setComparing([mid]);
      setStepCount((s) => s + 1);
      await new Promise((r) => setTimeout(r, speedMs * 2));

      if (arr[mid] === targetSearch) {
        setSortedIndices([mid]);
        setIsPlaying(false);
        return;
      }
      if (arr[mid] < targetSearch) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    setBinaryPointers(null);
    setComparing([]);
    setIsPlaying(false);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (selectedAlgo === "bubble") runBubbleStep();
      else if (selectedAlgo === "binary") runBinarySearch();
      else if (selectedAlgo === "tree") runTreeTraversal();
    }
  };

  return (
    <AppShell
      title="DSA Academy & Algorithm Visualizer"
      subtitle="Master fundamental data structures & algorithms with step-by-step visual animation"
    >
      <div className="space-y-6">
        {/* Visualizer Container */}
        <GlassCard elevated className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Binary className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-white tracking-tight">Interactive Algorithm Workbench</h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Observe pointer mutations, swaps, recursive partitions, and graph/tree traversals in real time
              </p>
            </div>

            {/* Algorithm Select Tabs */}
            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700/60">
              <button
                onClick={() => setSelectedAlgo("bubble")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedAlgo === "bubble" ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Bubble Sort
              </button>
              <button
                onClick={() => setSelectedAlgo("binary")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedAlgo === "binary" ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Binary Search
              </button>
              <button
                onClick={() => setSelectedAlgo("tree")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedAlgo === "tree" ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Tree BFS / DFS
              </button>
            </div>
          </div>

          {/* Visual Canvas Area */}
          {selectedAlgo === "tree" ? (
            <div className="h-72 rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 flex flex-col items-center justify-between relative overflow-hidden">
              <svg className="w-full h-52 max-w-lg" viewBox="0 0 500 220">
                <defs>
                  <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>

                {/* Edges */}
                {TREE_EDGES.map((edge, idx) => {
                  const fromNode = TREE_NODES.find((n) => n.id === edge.from)!;
                  const toNode = TREE_NODES.find((n) => n.id === edge.to)!;
                  const isEdgeActive =
                    visitedTreeNodes.includes(edge.from) &&
                    (visitedTreeNodes.includes(edge.to) || activeTreeNode === edge.to);

                  return (
                    <line
                      key={idx}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isEdgeActive ? "url(#edgeGlow)" : "rgba(100, 116, 139, 0.35)"}
                      strokeWidth={isEdgeActive ? "3" : "2"}
                      strokeDasharray={isEdgeActive ? "none" : "4 2"}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* Nodes */}
                {TREE_NODES.map((node) => {
                  const isActive = activeTreeNode === node.id;
                  const isVisited = visitedTreeNodes.includes(node.id);

                  let fillColor = "#1E293B";
                  let strokeColor = "#475569";
                  if (isActive) {
                    fillColor = "#06B6D4";
                    strokeColor = "#22D3EE";
                  } else if (isVisited) {
                    fillColor = "#059669";
                    strokeColor = "#10B981";
                  }

                  return (
                    <g key={node.id} className="cursor-pointer transition-all duration-300">
                      {isActive && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="28"
                          fill="none"
                          stroke="#22D3EE"
                          strokeWidth="2"
                          opacity="0.6"
                          className="animate-ping"
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="20"
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth="2.5"
                        className="transition-all duration-300 filter drop-shadow-md"
                      />
                      <text
                        x={node.x}
                        y={node.y + 5}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="12"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {node.val}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Traversal sequence bar */}
              <div className="w-full flex items-center justify-between px-4 py-2 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Traversal Output:</span>
                  {treeStructureState.length === 0 ? (
                    <span className="text-slate-500 italic">Press play to begin traversal...</span>
                  ) : (
                    <div className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold">
                      {treeStructureState.map((val, idx) => (
                        <span key={idx} className="flex items-center gap-1">
                          <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60">
                            {val}
                          </span>
                          {idx < treeStructureState.length - 1 && <span className="text-slate-600">➔</span>}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Mode:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setTreeMode("bfs");
                        resetArray();
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        treeMode === "bfs" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      BFS (Queue)
                    </button>
                    <button
                      onClick={() => {
                        setTreeMode("dfs");
                        resetArray();
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        treeMode === "dfs" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      DFS (Stack)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 rounded-2xl bg-slate-950/80 border border-slate-800/80 p-6 flex items-end justify-center gap-3 relative overflow-hidden">
              {array.map((val, idx) => {
                const isComp = comparing.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                const isMid = binaryPointers?.mid === idx;
                const isLow = binaryPointers?.low === idx;
                const isHigh = binaryPointers?.high === idx;

                let barColor = "bg-slate-700";
                if (isSorted) barColor = "bg-emerald-500 shadow-lg shadow-emerald-500/30";
                else if (isComp || isMid) barColor = "bg-cyan-400 shadow-lg shadow-cyan-400/40 animate-pulse";
                else if (isLow) barColor = "bg-violet-500";
                else if (isHigh) barColor = "bg-rose-500";

                return (
                  <div key={idx} className="flex-1 max-w-[48px] flex flex-col items-center gap-2 transition-all duration-200">
                    <span className="text-[11px] font-mono font-bold text-slate-300">{val}</span>
                    <div
                      className={`w-full rounded-t-xl transition-all duration-200 ${barColor}`}
                      style={{ height: `${Math.max(20, val * 2.2)}px` }}
                    />
                    <span className="text-[10px] text-slate-500 font-mono">[{idx}]</span>
                    {isLow && <span className="text-[9px] font-bold text-violet-400">LOW</span>}
                    {isMid && <span className="text-[9px] font-bold text-cyan-400">MID</span>}
                    {isHigh && <span className="text-[9px] font-bold text-rose-400">HIGH</span>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <GradientButton
                size="sm"
                onClick={handlePlayToggle}
                icon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              >
                {isPlaying ? "Pause" : "Play Animation"}
              </GradientButton>

              <button
                onClick={resetArray}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700/60 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Randomize
              </button>

              {selectedAlgo === "binary" && (
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>Target:</span>
                  <input
                    type="number"
                    value={targetSearch}
                    onChange={(e) => setTargetSearch(Number(e.target.value))}
                    className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div>Steps Taken: <span className="font-mono font-bold text-white">{stepCount}</span></div>
              <div className="flex items-center gap-2">
                <span>Speed:</span>
                <button
                  onClick={() => setSpeedMs(400)}
                  className={`px-2 py-1 rounded text-xs ${speedMs === 400 ? "bg-violet-600 text-white" : "bg-slate-900 text-slate-400"}`}
                >
                  0.5x
                </button>
                <button
                  onClick={() => setSpeedMs(250)}
                  className={`px-2 py-1 rounded text-xs ${speedMs === 250 ? "bg-violet-600 text-white" : "bg-slate-900 text-slate-400"}`}
                >
                  1x
                </button>
                <button
                  onClick={() => setSpeedMs(100)}
                  className={`px-2 py-1 rounded text-xs ${speedMs === 100 ? "bg-violet-600 text-white" : "bg-slate-900 text-slate-400"}`}
                >
                  2x
                </button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* DSA Curriculum Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">DSA Core Curriculum & Progress</h3>
            <span className="text-xs text-slate-400">6 Curated Tracks • 143 LeetCode Standards</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DSA_TOPICS.map((topic) => (
              <GlassCard key={topic.id} interactive className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={topic.difficulty === "Beginner" ? "emerald" : topic.difficulty === "Intermediate" ? "amber" : "rose"}
                    size="sm"
                  >
                    {topic.difficulty}
                  </Badge>
                  <span className="text-xs font-mono text-cyan-400">{topic.timeComplexity}</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">{topic.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{topic.description}</p>
                </div>

                <div className="pt-2 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Mastery Progress</span>
                    <span className="font-semibold text-white">
                      {topic.completedCount} / {topic.problemsCount} Solved
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
                      style={{ width: `${(topic.completedCount / topic.problemsCount) * 100}%` }}
                    />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
