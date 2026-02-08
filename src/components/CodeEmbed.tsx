import type { ComponentConfig } from "@measured/puck";

export type CodeEmbedProps = {
    html: string;
};

export const CodeEmbed: ComponentConfig<CodeEmbedProps> = {
    fields: {
        html: {
            type: "textarea",
            label: "Raw HTML Code"
        },
    },
    defaultProps: {
        html: "<div style='padding: 20px; background: #f0f0f0; border: 1px dashed #ccc;'>Raw HTML Content</div>",
    },
    render: ({ html }) => {
        return (
            <div className="max-w-4xl mx-auto my-8">
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        );
    },
};
