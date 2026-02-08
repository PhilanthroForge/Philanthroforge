import type { ComponentConfig } from "@measured/puck";
import { RichText } from "./components/RichText";
import { ImageGrid } from "./components/ImageGrid";
import { CodeEmbed } from "./components/CodeEmbed";
import { ActionBtn } from "./components/ActionBtn";
import { DonationBlock } from "./components/DonationBlock";

// Define the Hero component configuration
export type HeroProps = {
    title: string;
    subtitle: string;
    backgroundImage: string;
};

export const Hero: ComponentConfig<HeroProps> = {
    fields: {
        title: {
            type: "text",
            label: "Title",
        },
        subtitle: {
            type: "textarea",
            label: "Subtitle",
        },
        backgroundImage: {
            type: "text",
            label: "Background Image URL",
        },
    },
    defaultProps: {
        title: "Welcome to PhilanthroForge",
        subtitle: "Build beautiful websites for non-profits",
        backgroundImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&h=600&fit=crop",
    },
    render: ({ title, subtitle, backgroundImage }) => {
        return (
            <div
                className="relative min-h-[500px] flex items-center justify-center text-white"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
                    <p className="text-xl md:text-2xl opacity-90">{subtitle}</p>
                </div>
            </div>
        );
    },
};

// Export the Puck configuration
export const config = {
    components: {
        Hero,
        RichText,
        ImageGrid,
        CodeEmbed,
        ActionBtn,
        DonationBlock,
    },
};

export default config;
