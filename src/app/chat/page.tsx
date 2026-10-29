"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Send,
  Plus,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Bookmark,
  ChevronDown,
  Search,
  BookOpen,
  GraduationCap,
  Brain,
  Code2,
  Cpu,
  Binary,
  Briefcase,
  BookCheck,
  AlertCircle,
  Square,
  Mic,
  MicOff,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { Badge } from "@/components/ui/Badge";
import { VoiceWave } from "@/components/ui/VoiceWave";
import { useEduNovaStore, Message, Conversation } from "@/lib/store/appState";
import { LEARNING_MODES, LearningMode } from "@/lib/gemini/client";

function ChatContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");
  const conversationIdParam = searchParams.get("id");

  const {
    conversations,
    addConversation,
    updateConversation,
    deleteConversation,
    profile,
  } = useEduNovaStore();

  const [activeConvId, setActiveConvId] = useState<string>(
    conversationIdParam || (conversations[0]?.id || "conv-default")
  );
  const [selectedMode, setSelectedMode] = useState<LearningMode>("Beginner Tutor");
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [historySearch, setHistorySearch] = useState("");
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [voiceActive, setVoiceActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConvId);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isGenerating]);

  // Handle initial prompt from URL query
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendPrompt(initialQuery.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const handleStartNewChat = () => {
    const newConv: Conversation = {
      id: "conv-" + Date.now(),
      title: "New Conversation",
      learningMode: selectedMode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: "m-welcome-" + Date.now(),
          role: "assistant",
          content: `Hello ${profile.name}! I am your **EduNova AI** learning companion set to **${selectedMode}** mode.\n\nAsk any question, paste code, or upload documents to get started.`,
          timestamp: "Just now",
          mode: selectedMode,
        },
      ],
    };
    addConversation(newConv);
    setActiveConvId(newConv.id);
  };

  const handleSendPrompt = async (promptToSend?: string) => {
    const text = promptToSend || inputMessage.trim();
    if (!text || isGenerating) return;

    setInputMessage("");
    setAttachedFileName(null);

    let currentConv = activeConversation;
    if (!currentConv) {
      const newConv: Conversation = {
        id: "conv-" + Date.now(),
        title: text.slice(0, 32) + (text.length > 32 ? "..." : ""),
        learningMode: selectedMode,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
      };
      addConversation(newConv);
      currentConv = newConv;
      setActiveConvId(newConv.id);
    }

    const userMessage: Message = {
      id: "m-user-" + Date.now(),
      role: "user",
      content: attachedFileName ? `[Attachment: ${attachedFileName}]\n\n${text}` : text,
      timestamp: "Just now",
    };

    const updatedMessages = [...(currentConv.messages || []), userMessage];
    updateConversation(currentConv.id, {
      title: currentConv.messages.length === 0 ? text.slice(0, 32) : currentConv.title,
      messages: updatedMessages,
      learningMode: selectedMode,
    });

    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          learningMode: selectedMode,
          apiKeyOverride: profile.geminiApiKey || undefined,
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        id: "m-ai-" + Date.now(),
        role: "assistant",
        content: data.content || "Could not generate response. Please try again.",
        timestamp: "Just now",
        mode: selectedMode,
      };

      updateConversation(currentConv.id, {
        messages: [...updatedMessages, assistantMessage],
      });
    } catch (err: any) {
      const errorMessage: Message = {
        id: "m-err-" + Date.now(),
        role: "assistant",
        content: `Error connecting to EduNova engine: ${err.message}. Please verify your network.`,
        timestamp: "Just now",
      };
      updateConversation(currentConv.id, {
        messages: [...updatedMessages, errorMessage],
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFileName(file.name);
    }
  };

  const filteredHistory = conversations.filter((c) =>
    c.title.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-6.5rem)] gap-4">
      {/* Left Chat Sessions Drawer */}
      <div className="hidden lg:flex flex-col w-72 shrink-0 rounded-2xl glass-panel p-3 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Conversations</span>
          <button
            onClick={handleStartNewChat}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-600/30 hover:bg-violet-600 text-violet-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> New
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
            className="w-full bg-slate-900/80 border border-white/[0.08] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50"
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {filteredHistory.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition-all group ${
                activeConvId === conv.id
                  ? "bg-violet-600/25 border border-violet-500/40 text-white"
                  : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="truncate flex-1 pr-2">
                <div className="font-semibold truncate">{conv.title}</div>
                <div className="text-[10px] text-cyan-400 mt-0.5">{conv.learningMode}</div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                  if (activeConvId === conv.id) {
                    const remaining = conversations.filter((c) => c.id !== conv.id);
                    if (remaining.length > 0) setActiveConvId(remaining[0].id);
                  }
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-rose-400 p-1 rounded transition-opacity"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-500">No conversations found.</div>
          )}
        </div>
      </div>

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col rounded-2xl glass-panel-elevated overflow-hidden border border-white/[0.08]">
        {/* Chat Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">
                {activeConversation?.title || "AI Learning Companion"}
              </h2>
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Mode: <strong className="text-cyan-300">{selectedMode}</strong>
              </span>
            </div>
          </div>

          {/* Mode Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setModeDropdownOpen(!modeDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.1] hover:border-violet-500/50 text-xs font-semibold text-slate-200 transition-all"
            >
              <span>{selectedMode}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {modeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl p-2 bg-[#10162A] border border-white/[0.12] shadow-2xl z-50 animate-in fade-in zoom-in-95 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Select Pedagogical Mode
                </div>
                {LEARNING_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setSelectedMode(mode.id as LearningMode);
                      setModeDropdownOpen(false);
                    }}
                    className={`w-full flex flex-col text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                      selectedMode === mode.id
                        ? "bg-violet-600/30 text-white border border-violet-500/40"
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <span className="font-bold flex items-center gap-1.5">
                      {mode.label}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">{mode.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {(!activeConversation?.messages || activeConversation.messages.length === 0) && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="max-w-md">
                <h3 className="text-lg font-bold text-white">How can EduNova AI assist you today?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ask conceptual doubts, solve coding challenges, derive math formulas, or practice technical interview questions.
                </p>
              </div>
            </div>
          )}

          {activeConversation?.messages?.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 md:gap-4 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] md:max-w-[78%] rounded-2xl p-4 md:p-5 text-sm ${
                    isUser
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-sm shadow-md"
                      : "bg-[#10162A]/90 border border-white/[0.08] text-slate-200 rounded-tl-sm shadow-lg"
                  }`}
                >
                  {!isUser && msg.mode && (
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/[0.06] text-[11px] font-semibold text-cyan-400">
                      <span>{msg.mode}</span>
                    </div>
                  )}

                  {isUser ? (
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                  ) : (
                    <MarkdownRenderer content={msg.content} />
                  )}

                  {/* Actions for assistant messages */}
                  {!isUser && (
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.08] text-xs text-slate-400">
                      <span className="text-[11px] text-slate-500">{msg.timestamp}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleSendPrompt(activeConversation?.messages[activeConversation.messages.length - 2]?.content || "")}
                          className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
                          title="Regenerate answer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-slate-800 hover:text-emerald-400 transition-colors"
                          title="Helpful"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-slate-800 hover:text-rose-400 transition-colors"
                          title="Not helpful"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0 border border-white/20">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing State Indicator */}
          {isGenerating && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300 shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-2 text-slate-400">EduNova AI is thinking with {selectedMode}...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 md:p-4 border-t border-white/[0.08] bg-slate-950/60 space-y-2">
          {voiceActive && (
            <div className="space-y-2">
              <VoiceWave
                isActive={true}
                mode="listening"
                statusText="Live Voice Input Active • Speak your doubt clearly"
              />
              <div className="flex justify-end gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    setInputMessage("Can you explain how Dijkstra's Shortest Path algorithm works step by step?");
                    setVoiceActive(false);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-mono underline cursor-pointer"
                >
                  + Voice sample: "Explain Dijkstra algorithm"
                </button>
              </div>
            </div>
          )}

          {attachedFileName && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-500/15 border border-violet-500/30 text-xs text-violet-300 w-fit">
              <Paperclip className="w-3.5 h-3.5" />
              <span>Attached: {attachedFileName}</span>
              <button
                onClick={() => setAttachedFileName(null)}
                className="hover:text-rose-400 ml-1"
              >
                ×
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt();
            }}
            className="relative flex items-center gap-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileAttach}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 hover:border-violet-500 text-slate-400 hover:text-white transition-colors"
              title="Attach notes or file"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setVoiceActive(!voiceActive)}
              className={`p-2.5 rounded-xl border transition-all ${
                voiceActive
                  ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                  : "bg-slate-900 border-slate-700/60 text-slate-400 hover:text-cyan-300"
              }`}
              title="Voice input mode"
            >
              {voiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask EduNova AI in ${selectedMode} mode...`}
              disabled={isGenerating}
              className="flex-1 bg-slate-900/90 border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all disabled:opacity-50"
            />

            <GradientButton
              type="submit"
              disabled={!inputMessage.trim() || isGenerating}
              icon={isGenerating ? <Square className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            >
              {isGenerating ? "Stop" : "Send"}
            </GradientButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <AppShell
      title="AI Learning Companion"
      subtitle="Interact with 8 specialized AI learning modes, LaTeX math, and code walkthroughs"
      showContextPanel={false}
    >
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading AI Companion...</div>}>
        <ChatContent />
      </Suspense>
    </AppShell>
  );
}
