import RoleCard from "./RoleCard";

export default function YourRole() {
    const roles = [
        {
            title: "Chief Marketing Officer",
            description: "Strategic brand oversight",
        },
        {
            title: "PR Analyst",
            description: "Media relations and coverage tracking",
        },
        {
            title: "Social Media Lead",
            description: "Social platform monitoring",
        },
    ];

    return (
        <div className="w-full mx-auto mt-10 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
        Marketing
      </span>

            <h2 className="text-2xl font-semibold text-gray-900 mt-3">What's your role?</h2>
            <p className="text-sm text-gray-500 mt-1">
                Select your role to get personalized configuration
            </p>

            <div className="mt-6">
                {roles.map((role, index) => (
                    <RoleCard
                        key={index}
                        title={role.title}
                        description={role.description}
                        onClick={() => console.log(`${role.title} selected`)}
                    />
                ))}
            </div>
        </div>
    );
}
