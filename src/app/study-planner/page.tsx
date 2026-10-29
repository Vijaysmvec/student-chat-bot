"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  Plus,
  Clock,
  CheckCircle2,
  Trash2,
  Sparkles,
  Flame,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/Badge";
import { useEduNovaStore, StudyTask } from "@/lib/store/appState";

export default function StudyPlannerPage() {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useEduNovaStore();
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");

  // New task form state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("DSA");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("High");
  const [newDueDate, setNewDueDate] = useState("Today");
  const [newMinutes, setNewMinutes] = useState(45);

  // AI Timetable Generator State
  const [generatingSchedule, setGeneratingSchedule] = useState(false);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "Pending") return t.status !== "Completed";
    if (filter === "Completed") return t.status === "Completed";
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle.trim(),
      subject: newSubject,
      priority: newPriority,
      dueDate: newDueDate,
      status: "Pending",
      estimatedMinutes: Number(newMinutes),
    });

    setNewTitle("");
    setShowAddModal(false);
  };

  const handleAiAutoSchedule = () => {
    setGeneratingSchedule(true);
    setTimeout(() => {
      addTask({
        title: "⚡ AI Revision: Review Dynamic Programming Knapsack subproblems",
        subject: "DSA Sprint",
        priority: "High",
        dueDate: "Today (Evening)",
        status: "Pending",
        estimatedMinutes: 60,
      });
      addTask({
        title: "⚡ AI Revision: Solve 5 Computer Networks OSI & TCP MCQs",
        subject: "Core CS",
        priority: "Medium",
        dueDate: "Tomorrow (Morning)",
        status: "Pending",
        estimatedMinutes: 30,
      });
      setGeneratingSchedule(false);
    }, 600);
  };

  return (
    <AppShell
      title="Smart Study Planner & Task Calendar"
      subtitle="Organize academic commitments, build revision timetables, and track focus sprints"
    >
      <div className="space-y-6">
        {/* Planner Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-violet-400" />
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700/60">
              {(["All", "Pending", "Completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filter === f ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleAiAutoSchedule}
              disabled={generatingSchedule}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 text-xs font-semibold border border-violet-500/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{generatingSchedule ? "Generating..." : "AI Generate Schedule"}</span>
            </button>

            <GradientButton
              size="sm"
              onClick={() => setShowAddModal(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Add New Task
            </GradientButton>
          </div>
        </div>

        {/* Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <GlassCard key={task.id} className="p-5 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <button
                      onClick={() =>
                        updateTaskStatus(task.id, task.status === "Completed" ? "Pending" : "Completed")
                      }
                      className={`mt-0.5 ${
                        task.status === "Completed" ? "text-emerald-400" : "text-slate-600 hover:text-slate-400"
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <div>
                      <h4
                        className={`text-sm font-semibold leading-snug ${
                          task.status === "Completed" ? "line-through text-slate-500" : "text-white"
                        }`}
                      >
                        {task.title}
                      </h4>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span className="text-violet-400 font-medium">{task.subject}</span>
                        <span>•</span>
                        <span className="text-amber-400">Due {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={task.priority === "High" ? "rose" : task.priority === "Medium" ? "amber" : "neutral"}
                    size="sm"
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3 h-3 text-cyan-400" /> {task.estimatedMinutes} Mins
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          ))}

          {filteredTasks.length === 0 && (
            <div className="col-span-2 text-center py-12 glass-panel rounded-2xl text-slate-400 text-xs">
              No tasks found in this view. Click "Add New Task" or use "AI Generate Schedule".
            </div>
          )}
        </div>

        {/* Add Task Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <div className="w-full max-w-md rounded-2xl bg-[#10162A] border border-white/[0.12] p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <h3 className="text-base font-bold text-white">Create New Study Task</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Task Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Solve 5 Graph problems on LeetCode"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Subject</label>
                    <input
                      type="text"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Due Date</label>
                    <input
                      type="text"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      placeholder="Today, Tomorrow..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Duration (Mins)</label>
                    <input
                      type="number"
                      value={newMinutes}
                      onChange={(e) => setNewMinutes(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <GradientButton type="submit">Create Task</GradientButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
