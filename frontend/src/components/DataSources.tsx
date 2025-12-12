import { useState, useEffect } from "react";
import DataSourceCard from "./DataSourceCard.tsx";
import { useFormContext } from "react-hook-form";
import { useSContextStore } from "../Context/index.ts";
//@ts-ignore
import Modal from "react-modal";

interface DataSource {
  key: string;
  title: string;
  description: string;
}

export default function DataSources() {
  const { setValue, register, trigger, getValues } = useFormContext();

  useEffect(() => {
    register("dataSources", {
      required: "Please select at least one data source",
      validate: (value) =>
        (value && value.length > 0) || "Please select at least one data source",
    });

    const persistedDataSources = getValues("dataSources");
    const persistedSocialMedia = getValues("socialMediaPlatforms");

    if (persistedDataSources && Array.isArray(persistedDataSources)) {
      setSelected(persistedDataSources);
      if (persistedDataSources.length > 0) {
        setTimeout(() => {
          trigger("dataSources");
        }, 100);
      }
    }

    if (persistedSocialMedia && Array.isArray(persistedSocialMedia)) {
      setSocialMediaSelected(persistedSocialMedia);
    }
  }, [register]);

  const activeIndex = useSContextStore((state) => state.activeIndex);

  useEffect(() => {
    if (activeIndex === 3) {
      const currentDataSources = getValues("dataSources");
      if (
        currentDataSources &&
        Array.isArray(currentDataSources) &&
        currentDataSources.length > 0
      ) {
        setTimeout(() => {
          trigger("dataSources");
        }, 150);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const dataSources: DataSource[] = [
    {
      key: "socialMedia",
      title: "Social Media",
      description: "Twitter, Facebook, Instagram, TikTok",
    },
    {
      key: "newsSites",
      title: "News Sites",
      description: "250M+ news sources globally",
    },
    {
      key: "radio",
      title: "Radio Broadcasts",
      description: "Live radio monitoring",
    },
    {
      key: "podcasts",
      title: "Podcasts",
      description: "Apple Podcasts, Spotify, RSS",
    },
    {
      key: "forums",
      title: "Forums",
      description: "Reddit, HackerNews, Stack Overflow",
    },
    {
      key: "blogs",
      title: "Blogs",
      description: "Medium, Substack, WordPress",
    },
  ];

  const socialMediaOptions = ["Twitter", "Facebook", "Instagram", "TikTok"];

  const [selected, setSelected] = useState<string[]>([]);
  const [socialMediaSelected, setSocialMediaSelected] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggle = (key: string) => {
    let updated: string[];

    if (selected.includes(key)) {
      updated = selected.filter((item) => item !== key);
    } else {
      updated = [...selected, key];
    }

    setSelected(updated);
    setValue("dataSources", updated);

    trigger("dataSources");

    if (key === "socialMedia" && !selected.includes("socialMedia")) {
      setIsModalVisible(true);
    }
  };

  const toggleSocialMediaOption = (option: string) => {
    let updated: string[];
    if (socialMediaSelected.includes(option)) {
      updated = socialMediaSelected.filter((item) => item !== option);
    } else {
      updated = [...socialMediaSelected, option];
    }
    setSocialMediaSelected(updated);
    setValue("socialMediaPlatforms", updated);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-full border-t border-gray-100 mx-auto bg-white rounded-lg shadow-xl p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900">Data Sources</h1>
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
            checked={selected.includes(source.key)}
            onChange={() => toggle(source.key)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalVisible}
        onRequestClose={closeModal}
        contentLabel="Select Social Media"
        ariaHideApp={false}
        className="w-xs mx-auto mt-20 md:mt-70 bg-white p-6 rounded-lg shadow-2xl"
        style={{
          overlay: {
            zIndex: 100,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(2px)",
          },
          content: {},
        }}
      >
        <h2 className="text-lg font-semibold mb-4">
          Select Social Media Platforms
        </h2>
        <div className="flex flex-col gap-2">
          {socialMediaOptions.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={socialMediaSelected.includes(option)}
                onChange={() => toggleSocialMediaOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Done
        </button>
      </Modal>
    </div>
  );
}
