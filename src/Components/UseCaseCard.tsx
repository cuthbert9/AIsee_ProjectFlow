import React from "react";

interface UseCaseItemProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const UseCaseItem: React.FC<UseCaseItemProps> = ({ title, description, icon }) => {
    return (
        <div
            className="flex items-start gap-4 p-5 border border-gray-200 rounded-xl
                 hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white"
        >
            <div className="text-3xl text-blue-600 ">{icon}</div>
            <div>
                <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>
                <p className="text-gray-500 text-sm">{description}</p>
            </div>
        </div>
    );
};

export default UseCaseItem;
