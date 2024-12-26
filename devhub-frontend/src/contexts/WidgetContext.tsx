import React, { createContext, useContext, useState } from "react";

export type WidgetType =
  | "activity"
  | "github"
  | "stackoverflow"
  | "projects"
  | "news"
  | "jobs"
  | "challenges";

interface WidgetSettings {
  id: WidgetType;
  title: string;
  visible: boolean;
  order: number;
}

interface WidgetContextType {
  widgets: WidgetSettings[];
  toggleWidget: (id: WidgetType) => void;
  reorderWidgets: (startIndex: number, endIndex: number) => void;
  resetLayout: () => void;
}

const defaultWidgets: WidgetSettings[] = [
  { id: "activity", title: "Activity Feed", visible: true, order: 0 },
  { id: "github", title: "GitHub", visible: true, order: 1 },
  { id: "stackoverflow", title: "Stack Overflow", visible: true, order: 2 },
  { id: "projects", title: "Projects", visible: true, order: 3 },
  { id: "news", title: "Tech News", visible: true, order: 4 },
  { id: "jobs", title: "Job Listings", visible: true, order: 5 },
  { id: "challenges", title: "Coding Challenges", visible: true, order: 6 },
];

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export const WidgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [widgets, setWidgets] = useState<WidgetSettings[]>(() => {
    if (typeof window === "undefined") return defaultWidgets;
    const saved = localStorage.getItem("widgetSettings");
    return saved ? JSON.parse(saved) : defaultWidgets;
  });

  const toggleWidget = (id: WidgetType) => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === id ? { ...widget, visible: !widget.visible } : widget
      )
    );
  };

  const reorderWidgets = (startIndex: number, endIndex: number) => {
    const result = Array.from(widgets);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const reordered = result.map((widget, index) => ({
      ...widget,
      order: index,
    }));

    setWidgets(reordered);
  };

  const resetLayout = () => {
    setWidgets(defaultWidgets);
  };

  return (
    <WidgetContext.Provider
      value={{ widgets, toggleWidget, reorderWidgets, resetLayout }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidgets = () => {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error("useWidgets must be used within a WidgetProvider");
  }
  return context;
};
