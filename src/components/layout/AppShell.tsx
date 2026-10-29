"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { ContextPanel } from "./ContextPanel";
import { cn } from "@/lib/utils/cn";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showContextPanel?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  title,
  subtitle,
  showContextPanel = true,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060816] text-slate-100 bg-mesh-grid flex">
      {/* Left Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 min-w-0",
          collapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        <TopNav
          title={title}
          subtitle={subtitle}
          onMobileOpen={() => setMobileOpen(true)}
        />

        <div className="flex-1 flex min-w-0">
          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
            {children}
          </main>

          {showContextPanel && <ContextPanel />}
        </div>
      </div>
    </div>
  );
};
