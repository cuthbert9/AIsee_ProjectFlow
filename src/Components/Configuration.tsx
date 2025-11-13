import React, { useState } from 'react';
import DataSourceCard from './DataSourceCard';
import BottomNav from "./BottomNav.tsx";


export default function Configuration() {

    const widgetsData = [
        {
            key: 'mentionsVolume',
            title: 'Mentions Volume',
            description: 'Time-series chart of mentions over time',
            checked: true,
        },
        {
            key: 'sentimentOverview',
            title: 'Sentiment Overview',
            description: 'Sentiment gauge and distribution',
            checked: true,
        },
        {
            key: 'sourceBreakdown',
            title: 'Source Breakdown',
            description: 'Pie chart of mention sources',
            checked: false,
        },
        {
            key: 'topEntities',
            title: 'Top Entities',
            description: 'Most mentioned people, brands, topics',
            checked: true,
        },
        {
            key: 'keywordTrends',
            title: 'Keyword Trends',
            description: 'Trending keywords and hashtags',
            checked: false,
        },
        {
            key: 'aiInsights',
            title: 'AI Insights',
            description: 'AI-powered recommendations',
            checked: true,
        },
        {
            key: 'radioTrends',
            title: 'Radio Trends',
            description: 'Radio broadcast analytics',
            checked: true,
        },
        {
            key: 'alertsSnapshot',
            title: 'Alerts Snapshot',
            description: 'Recent alert triggers',
            checked: true,
        },
    ];
    // Initialize state from data
    const initialState = Object.fromEntries(
        widgetsData.map((source) => [source.key, source.checked])
    );

    const [selected, setSelected] = useState<Record<string, boolean>>(initialState);

    const toggle = (key: string) => {
        setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="w-full border-t border-gray-100  mx-auto bg-white rounded-lg shadow-xl p-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Dashboard Widgets</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Choose which Metrics and Insights to display
                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {widgetsData.map((source) => (
                    <DataSourceCard
                        key={source.key}
                        title={source.title}
                        description={source.description}
                        checked={selected[source.key]}
                        onChange={() => toggle(source.key)}
                    />
                ))}
            </div>
            <BottomNav/>

        </div>
    );
}