import type { ComponentConfig } from "@measured/puck";


export type ActionBtnProps = {
    label: string;
    url: string;
    variant: "primary" | "secondary" | "outline";
};

export const ActionBtn: ComponentConfig<ActionBtnProps> = {
    fields: {
        label: { type: "text" },
        url: { type: "text" },
        variant: {
            type: "select",
            options: [
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
                { label: "Outline", value: "outline" },
            ],
        },
    },
    defaultProps: {
        label: "Click Me",
        url: "#",
        variant: "primary",
    },
    render: ({ label, url, variant }) => {
        const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

        const variants = {
            primary: "border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
            secondary: "border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500",
            outline: "border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50 focus:ring-indigo-500",
        };

        return (
            <div className="py-4 text-center">
                <a
                    href={url}
                    className={`${baseStyles} ${variants[variant]}`}
                    onClick={(e) => e.preventDefault()} // Prevent navigation in editor
                >
                    {label}
                </a>
            </div>
        );
    },
};
