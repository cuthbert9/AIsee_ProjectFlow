import { useState, useEffect } from "react";
import DataSourceCard from "./DataSourceCard.tsx";
import { useFormContext } from "react-hook-form";

export default function Configuration() {
  const widgetsData = [
    {
      key: "mentionsVolume",
      title: "Mentions Volume",
      description: "Time-series chart of mentions over time",
    },
    {
      key: "sentimentOverview",
      title: "Sentiment Overview",
      description: "Sentiment gauge and distribution",
    },
    {
      key: "sourceBreakdown",
      title: "Source Breakdown",
      description: "Pie chart of mention sources",
    },
    {
      key: "topEntities",
      title: "Top Entities",
      description: "Most mentioned people, brands, topics",
    },
    {
      key: "keywordTrends",
      title: "Keyword Trends",
      description: "Trending keywords and hashtags",
    },
    {
      key: "aiInsights",
      title: "AI Insights",
      description: "AI-powered recommendations",
    },
    {
      key: "radioTrends",
      title: "Radio Trends",
      description: "Radio broadcast analytics",
    },
    {
      key: "alertsSnapshot",
      title: "Alerts Snapshot",
      description: "Recent alert triggers",
    },
  ];
  const { setValue, register, trigger, watch } = useFormContext();

  // Register the widgets field with validation
  useEffect(() => {
    register("widgets", {
      required: "Please select at least one dashboard widget",
      validate: (value) =>
        (value && value.length > 0) ||
        "Please select at least one dashboard widget",
    });
  }, [register]);

  const [selected, setSelected] = useState<string[]>([]);

  // Load persisted data on mount
  useEffect(() => {
    const persistedWidgets = watch("widgets");

    if (persistedWidgets && Array.isArray(persistedWidgets)) {
      setSelected(persistedWidgets);
      // Trigger validation if persisted data exists
      if (persistedWidgets.length > 0) {
        setTimeout(() => {
          trigger("widgets");
        }, 100);
      }
    }
  }, []);

  const toggle = (key: string) => {
    setSelected((prev) => {
      const exists = prev.includes(key);

      const updated = exists
        ? prev.filter((item) => item !== key)
        : [...prev, key];

      setValue("widgets", updated);

      trigger("widgets");

      return updated;
    });
  };

  return (
    <div className="w-full border-t border-gray-100  mx-auto bg-white rounded-lg shadow-xl p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900">
          Dashboard Widgets
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Choose which Metrics and Insights to display
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {widgetsData.map((source) => (
          <DataSourceCard
            key={source.key}
            title={source.title}
            description={source.description}
            checked={selected.includes(source.key)}
            onChange={() => toggle(source.key)}
          />
        ))}
      </div>
    </div>
  );
}
