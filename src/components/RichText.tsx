import type { ComponentConfig } from "@measured/puck";
import "react-quill/dist/quill.snow.css";

export type RichTextProps = {
    content: string;
};

export const RichText: ComponentConfig<RichTextProps> = {
    fields: {
        content: {
            type: "textarea", // We use a textarea for the input because Puck doesn't have a native WYSIWYG *field* type yet. 
            // However, the `render` function is what displays the content.
            // To make it truly editable, we would need a custom field implementation, 
            // but for Phase 02, let's rely on the props panel textarea for input 
            // and render the HTML output properly.
            label: "Content (HTML)",
        },
    },
    defaultProps: {
        content: "<h2>Rich Text Block</h2><p>Edit this content via the sidebar.</p>",
    },
    render: ({ content }) => {
        return (
            <div className="p-4 ql-snow">
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    },
};
