export default function SetupOptions() {
    const options = [
        {
            title: "Quick Setup",
            subtitle: "Answer 2 questions and AI will configure everything",
            tag: "Recommended",
        },
        {
            title: "Advanced Setup",
            subtitle: "Full control over all configuration options",
        },
        {
            title: "Use Template",
            subtitle: "Start from a pre-configured template",
        },
    ];

    return (
        <>


            <h2 className="text-lg font-semibold text-gray-800 mt-6">
                How would you like to set up your project?
            </h2>
            <div className="grid grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">


                {options.map((opt, i) => (
                    <div
                        key={i}
                        className="h-[200px] items-center justify-center  rounded-lg p-6 shadow-lg bg-white hover:shadow-xl cursor-pointer transition"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{opt.title}</h3>
                            {opt.tag && (
                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {opt.tag}
              </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600">{opt.subtitle}</p>
                    </div>
                ))}
            </div>

        </>

    );
}
