"use client";

import React, { useState } from "react";
import {
  Cpu,
  Sparkles,
  Sliders,
  Play,
  RotateCcw,
  Layers,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { AIML_TRACKS } from "@/lib/data/mockData";

export default function AimlLabPage() {
  const [activeVisualizer, setActiveVisualizer] = useState<"regression" | "knn" | "neural">("regression");

  // Linear Regression Interactive States
  const [slope, setSlope] = useState<number>(1.5);
  const [intercept, setIntercept] = useState<number>(10);
  const sampleDataPoints = [
    { x: 10, y: 25 },
    { x: 20, y: 42 },
    { x: 30, y: 55 },
    { x: 40, y: 68 },
    { x: 50, y: 88 },
    { x: 60, y: 98 },
    { x: 70, y: 115 },
    { x: 80, y: 130 },
  ];

  // Calculate MSE
  const mse = (
    sampleDataPoints.reduce((acc, pt) => {
      const pred = slope * pt.x + intercept;
      return acc + Math.pow(pt.y - pred, 2);
    }, 0) / sampleDataPoints.length
  ).toFixed(1);

  // Neural Net forward pass states
  const [inputVal1, setInputVal1] = useState<number>(0.8);
  const [inputVal2, setInputVal2] = useState<number>(0.4);
  const h1 = Math.max(0, inputVal1 * 0.7 + inputVal2 * 0.3); // ReLU
  const h2 = Math.max(0, inputVal1 * -0.5 + inputVal2 * 0.9);
  const outputProb = (1 / (1 + Math.exp(-(h1 * 0.8 + h2 * 0.6)))).toFixed(3);

  // KNN States
  const [knnK, setKnnK] = useState<number>(3);
  const [queryPoint, setQueryPoint] = useState<{ x: number; y: number }>({ x: 50, y: 55 });

  const knnDataset = [
    { id: 1, x: 25, y: 35, cls: "A" },
    { id: 2, x: 30, y: 55, cls: "A" },
    { id: 3, x: 20, y: 70, cls: "A" },
    { id: 4, x: 35, y: 80, cls: "A" },
    { id: 5, x: 40, y: 30, cls: "A" },
    { id: 6, x: 75, y: 65, cls: "B" },
    { id: 7, x: 80, y: 85, cls: "B" },
    { id: 8, x: 65, y: 75, cls: "B" },
    { id: 9, x: 85, y: 45, cls: "B" },
    { id: 10, x: 70, y: 30, cls: "B" },
  ];

  // Calculate nearest neighbors
  const knnDistances = knnDataset
    .map((pt) => {
      const dist = Math.hypot(pt.x - queryPoint.x, pt.y - queryPoint.y);
      return { ...pt, dist };
    })
    .sort((a, b) => a.dist - b.dist);

  const nearestNeighbors = knnDistances.slice(0, knnK);
  const classACount = nearestNeighbors.filter((n) => n.cls === "A").length;
  const classBCount = nearestNeighbors.filter((n) => n.cls === "B").length;
  const predictedClass = classACount >= classBCount ? "Class A" : "Class B";
  const confidence = Math.round((Math.max(classACount, classBCount) / knnK) * 100);

  return (
    <AppShell
      title="AI & Machine Learning Learning Lab"
      subtitle="Interactive mathematical foundations, tensor intuition, and hands-on ML visualizers"
    >
      <div className="space-y-6">
        {/* Visualizer Container */}
        <GlassCard elevated className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-violet-400" />
                <h2 className="text-lg font-bold text-white tracking-tight">Interactive ML Visualizer</h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect how weights, hyperplanes, and activation functions shape model predictions
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700/60">
              <button
                onClick={() => setActiveVisualizer("regression")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeVisualizer === "regression" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Linear Regression
              </button>
              <button
                onClick={() => setActiveVisualizer("knn")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeVisualizer === "knn" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                KNN Classifier
              </button>
              <button
                onClick={() => setActiveVisualizer("neural")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeVisualizer === "neural" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Neural Forward Pass
              </button>
            </div>
          </div>

          {/* Linear Regression Interactive Canvas */}
          {activeVisualizer === "regression" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 h-72 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 relative overflow-hidden flex items-end">
                  <svg className="w-full h-full overflow-visible">
                    {/* Grid lines */}
                    <line x1="0" y1="260" x2="100%" y2="260" stroke="#334155" strokeWidth="1" />
                    <line x1="20" y1="0" x2="20" y2="260" stroke="#334155" strokeWidth="1" />

                    {/* Data Points */}
                    {sampleDataPoints.map((pt, i) => (
                      <circle
                        key={i}
                        cx={`${(pt.x / 90) * 100}%`}
                        cy={`${260 - (pt.y / 150) * 240}`}
                        r="6"
                        className="fill-cyan-400 stroke-cyan-200 stroke-2"
                      />
                    ))}

                    {/* Fitted Line: y = slope * x + intercept */}
                    <line
                      x1="20"
                      y1={`${260 - (intercept / 150) * 240}`}
                      x2="95%"
                      y2={`${260 - ((slope * 85 + intercept) / 150) * 240}`}
                      stroke="#8B5CF6"
                      strokeWidth="3.5"
                      strokeDasharray="4"
                    />
                  </svg>
                  <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-xs space-y-1">
                    <div className="font-mono text-cyan-300 font-bold">Model: ŷ = {slope}x + {intercept}</div>
                    <div className="text-slate-300 font-mono">Mean Squared Error (MSE): <strong className="text-amber-400">{mse}</strong></div>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="lg:col-span-4 space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-white/[0.08]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-violet-400" /> Parameter Tuning
                  </h4>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Slope (m / Weight):</span>
                      <span className="font-mono text-cyan-300 font-bold">{slope}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={slope}
                      onChange={(e) => setSlope(Number(e.target.value))}
                      className="w-full accent-violet-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Intercept (b / Bias):</span>
                      <span className="font-mono text-cyan-300 font-bold">{intercept}</span>
                    </div>
                    <input
                      type="range"
                      min="-10"
                      max="30"
                      step="1"
                      value={intercept}
                      onChange={(e) => setIntercept(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setSlope(1.5);
                      setIntercept(10);
                    }}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset to Optimal Line
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* KNN Classifier Interactive Canvas */}
          {activeVisualizer === "knn" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 h-80 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 relative overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full max-w-lg" viewBox="0 0 100 100">
                    {/* Grid lines */}
                    <line x1="10" y1="90" x2="90" y2="90" stroke="#1E293B" strokeWidth="0.8" />
                    <line x1="10" y1="10" x2="10" y2="90" stroke="#1E293B" strokeWidth="0.8" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1 1" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1 1" />

                    {/* Connecting lines from query point to nearest neighbors */}
                    {nearestNeighbors.map((n) => (
                      <line
                        key={`line-${n.id}`}
                        x1={queryPoint.x}
                        y1={queryPoint.y}
                        x2={n.x}
                        y2={n.y}
                        stroke="#F59E0B"
                        strokeWidth="0.8"
                        strokeDasharray="2 1"
                        opacity="0.8"
                      />
                    ))}

                    {/* Dataset Points */}
                    {knnDataset.map((pt) => {
                      const isNeighbor = nearestNeighbors.some((n) => n.id === pt.id);
                      return (
                        <g key={pt.id}>
                          {isNeighbor && (
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="4"
                              fill="none"
                              stroke={pt.cls === "A" ? "#22D3EE" : "#8B5CF6"}
                              strokeWidth="0.8"
                              className="animate-ping"
                              opacity="0.7"
                            />
                          )}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="2.5"
                            fill={pt.cls === "A" ? "#06B6D4" : "#7C3AED"}
                            stroke={isNeighbor ? "#FFFFFF" : "none"}
                            strokeWidth="0.7"
                          />
                        </g>
                      );
                    })}

                    {/* Query Point with radar ring */}
                    <circle
                      cx={queryPoint.x}
                      cy={queryPoint.y}
                      r="6"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="0.8"
                      className="animate-pulse"
                    />
                    <circle
                      cx={queryPoint.x}
                      cy={queryPoint.y}
                      r="3.2"
                      fill="#F59E0B"
                      stroke="#FFFFFF"
                      strokeWidth="0.9"
                    />
                  </svg>

                  {/* Prediction Pill Overlay */}
                  <div className="absolute top-4 right-4 bg-slate-900/95 border border-slate-700/80 rounded-xl p-3 text-xs space-y-1 shadow-xl">
                    <div className="text-slate-400">Predicted Class:</div>
                    <div
                      className={`font-mono text-sm font-extrabold ${
                        predictedClass === "Class A" ? "text-cyan-400" : "text-violet-400"
                      }`}
                    >
                      {predictedClass} ({confidence}% confidence)
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Votes: Class A ({classACount}) • Class B ({classBCount})
                    </div>
                  </div>
                </div>

                {/* Slider Controls for KNN */}
                <div className="lg:col-span-4 space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-white/[0.08]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-amber-400" /> KNN Hyperparameters
                  </h4>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>K (Nearest Neighbors):</span>
                      <span className="font-mono text-amber-400 font-bold">{knnK}</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 3, 5, 7].map((kVal) => (
                        <button
                          key={kVal}
                          onClick={() => setKnnK(kVal)}
                          className={`flex-1 py-1 rounded-lg text-xs font-semibold ${
                            knnK === kVal ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {kVal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Query Point X Position:</span>
                      <span className="font-mono text-cyan-300 font-bold">{queryPoint.x}</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="85"
                      value={queryPoint.x}
                      onChange={(e) => setQueryPoint((p) => ({ ...p, x: Number(e.target.value) }))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Query Point Y Position:</span>
                      <span className="font-mono text-cyan-300 font-bold">{queryPoint.y}</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="85"
                      value={queryPoint.y}
                      onChange={(e) => setQueryPoint((p) => ({ ...p, y: Number(e.target.value) }))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeVisualizer === "neural" && (
            <div className="h-72 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 flex items-center justify-around relative">
              {/* Input Layer */}
              <div className="flex flex-col items-center gap-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Input Layer</span>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-center">
                    <div className="text-[10px] text-slate-400">X1 (Feature)</div>
                    <input
                      type="number"
                      step="0.1"
                      value={inputVal1}
                      onChange={(e) => setInputVal1(Number(e.target.value))}
                      className="w-16 bg-slate-950 border border-slate-700 text-center text-cyan-300 rounded font-mono text-xs py-0.5 mt-1"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-center">
                    <div className="text-[10px] text-slate-400">X2 (Feature)</div>
                    <input
                      type="number"
                      step="0.1"
                      value={inputVal2}
                      onChange={(e) => setInputVal2(Number(e.target.value))}
                      className="w-16 bg-slate-950 border border-slate-700 text-center text-cyan-300 rounded font-mono text-xs py-0.5 mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="text-slate-600 font-mono text-xs">➔ W1 ➔</div>

              {/* Hidden Layer (ReLU) */}
              <div className="flex flex-col items-center gap-6">
                <span className="text-[11px] font-bold text-violet-400 uppercase">Hidden Layer (ReLU)</span>
                <div className="space-y-3">
                  <div className="w-20 p-2.5 rounded-xl bg-violet-950/50 border border-violet-500/40 text-center">
                    <div className="text-[10px] text-slate-400">H1</div>
                    <div className="font-mono text-xs font-bold text-white mt-1">{h1.toFixed(2)}</div>
                  </div>
                  <div className="w-20 p-2.5 rounded-xl bg-violet-950/50 border border-violet-500/40 text-center">
                    <div className="text-[10px] text-slate-400">H2</div>
                    <div className="font-mono text-xs font-bold text-white mt-1">{h2.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div className="text-slate-600 font-mono text-xs">➔ W2 ➔</div>

              {/* Output Layer (Sigmoid) */}
              <div className="flex flex-col items-center gap-6">
                <span className="text-[11px] font-bold text-emerald-400 uppercase">Output (Sigmoid)</span>
                <div className="w-28 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center shadow-lg shadow-emerald-500/20">
                  <div className="text-[10px] text-slate-400">P(Class = 1)</div>
                  <div className="font-mono text-base font-extrabold text-emerald-400 mt-1">{outputProb}</div>
                </div>
              </div>
            </div>
          )}
        </GlassCard>

        {/* AI & ML Learning Tracks */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Engineering Curricula & Specializations</h3>
            <span className="text-xs text-slate-400">From Python to Transformer Architectures</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AIML_TRACKS.map((track) => (
              <GlassCard key={track.id} interactive className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="violet" size="sm">
                    {track.level}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-400">{track.duration}</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">{track.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{track.summary}</p>
                </div>

                <div className="pt-2 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                  {track.keyTopics.map((topic, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                      {topic}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
