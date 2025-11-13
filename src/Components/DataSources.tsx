import  { useState } from 'react';
import DataSourceCard from './DataSourceCard';
import BottomNav from "./BottomNav.tsx";

interface DataSource {
    key: string;
    title: string;
    description: string;
    checked: boolean;
}

export default function DataSources() {

    const dataSources: DataSource[] = [
        {
            key: 'socialMedia',
            title: 'Social Media',
            description: 'Twitter, Facebook, Instagram, TikTok',
            checked: true,
        },
        {
            key: 'newsSites',
            title: 'News Sites',
            description: '250M+ news sources globally',
            checked: true,
        },
        {
            key: 'radio',
            title: 'Radio Broadcasts',
            description: 'Live radio monitoring',
            checked: true,
        },
        {
            key: 'podcasts',
            title: 'Podcasts',
            description: 'Apple Podcasts, Spotify, RSS',
            checked: false,
        },
        {
            key: 'forums',
            title: 'Forums',
            description: 'Reddit, HackerNews, Stack Overflow',
            checked: true,
        },
        {
            key: 'blogs',
            title: 'Blogs',
            description: 'Medium, Substack, WordPress',
            checked: false,
        },
    ];

    // Initialize state from data
    const initialState = Object.fromEntries(
        dataSources.map((source) => [source.key, source.checked])
    );

    const [selected, setSelected] = useState<Record<string, boolean>>(initialState);

    const toggle = (key: string) => {
        setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="w-full border-t border-gray-100  mx-auto bg-white rounded-lg shadow-xl p-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Data Sources</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Select which platforms to monitor for mentions
                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataSources.map((source) => (
                    <DataSourceCard
                        key={source.key}
                        title={source.title}
                        description={source.description}
                        checked={selected[source.key]}
                        onChange={() => toggle(source.key)}
                    />
                ))}
            </div>
            <BottomNav next={''}/>

        </div>
    );
}