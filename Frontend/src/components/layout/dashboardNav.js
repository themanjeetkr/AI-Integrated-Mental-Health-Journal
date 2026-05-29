import { BookOpen, LayoutDashboard, Settings, Sparkles } from "lucide-react";

export const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/journals", icon: BookOpen, label: "Journals" },
  { to: "/insights", icon: Sparkles, label: "Insights" },
  { to: "/settings", icon: Settings, label: "Settings" },
];
