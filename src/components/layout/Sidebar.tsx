"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  MessageSquare,
  Code2,
  Binary,
  Cpu,
  Briefcase,
  Users,
  Target,
  CalendarDays,
  HelpCircle,
  FileText,
  LineChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useEduNovaStore } from "@/lib/store/appState";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}) => {
  const pathname = usePathname();
  const { profile, conversations, deleteConversation } = useEduNovaStore();
  const [searchHistory, setSearchHistory] = useState("");

  const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "AI Companion", href: "/chat", icon: MessageSquare, badge: "AI" },
    { label: "Coding Playground", href: "/coding", icon: Code2, badge: "IDE" },
    { label: "DSA Academy", href: "/dsa", icon: Binary },
    { label: "AI & ML Lab", href: "/aiml", icon: Cpu, badge: "New" },
    { label: "Tech Interview", href: "/interviews", icon: Briefcase },
    { label: "HR Interview", href: "/hr-interview", icon: Users },
    { label: "Aptitude Center", href: "/aptitude", icon: Target },
    { label: "Resume Analyzer", href: "/resume-analyzer", icon: FileCheck },
    { label: "Placement Prep", href: "/placement", icon: CheckCircle2 },
    { label: "Study Planner", href: "/study-planner", icon: CalendarDays },
    { label: "Quiz Studio", href: "/quiz", icon: HelpCircle },
    { label: "Notes & Docs", href: "/documents", icon: FileText },
    { label: "Analytics", href: "/analytics", icon: LineChart },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchHistory.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300",
          "bg-[#070B1A]/95 backdrop-blur-2xl border-r border-white/[0.08] shadow-2xl",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/[0.08]">
          <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.35)] shrink-0 transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                  EduNova <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-cyan-300 border border-violet-500/30 font-mono font-bold">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Next-Gen Workspace</span>
              </div>
            )}
          </Link>

          <button
            onClick={onToggle}
            className="hidden lg:flex w-7 h-7 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 items-center justify-center text-slate-400 hover:text-white transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Link
            href="/chat"
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl py-2.5 font-semibold transition-all duration-200",
              "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white shadow-lg shadow-violet-600/30 hover:scale-[1.02]",
              collapsed ? "px-0" : "px-4"
            )}
            title="Start New Chat"
          >
            <Plus className="w-4 h-4 shrink-0 stroke-[2.5]" />
            {!collapsed && <span className="text-xs font-bold tracking-wide">New AI Chat</span>}
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1 py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group relative",
                  isActive
                    ? "bg-gradient-to-r from-violet-600/25 to-cyan-600/15 text-white border border-violet-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40",
                  collapsed && "justify-center px-0"
                )}
                title={collapsed ? item.label : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-violet-400 to-cyan-400 rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-all",
                    isActive ? "text-cyan-400 scale-110" : "text-slate-400 group-hover:text-violet-400"
                  )}
                />
                {!collapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}

          {/* Conversations Section (When expanded) */}
          {!collapsed && conversations.length > 0 && (
            <div className="pt-4 border-t border-white/[0.08] mt-3">
              <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center justify-between">
                <span>Recent Chats</span>
                <span className="text-[10px] font-mono text-slate-500">{conversations.length}</span>
              </div>
              <div className="space-y-1">
                {filteredConversations.slice(0, 4).map((conv) => (
                  <div
                    key={conv.id}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 group transition-all"
                  >
                    <Link href={`/chat?id=${conv.id}`} className="truncate flex-1 pr-2">
                      <div className="truncate text-slate-300 font-medium">{conv.title}</div>
                      <div className="text-[10px] text-cyan-400/80 font-mono">{conv.learningMode}</div>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 hover:text-rose-400 p-1 rounded transition-opacity"
                      title="Delete chat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-white/[0.08] bg-slate-950/40">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 transition-all",
              collapsed && "justify-center p-0"
            )}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0 border border-white/20 shadow-md">
              {profile.name.charAt(0)}
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-200 truncate">{profile.name}</span>
                <span className="text-[10px] text-cyan-400 truncate font-mono">{profile.targetRole}</span>
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
};
