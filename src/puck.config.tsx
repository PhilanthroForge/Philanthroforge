import React from "react";
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
        backgroundImage: "https://images.unsplash.com/photo-1469571406257-022069fca5ed?w=1200&h=600&fit=crop",
    },
    render: ({ title, subtitle, backgroundImage }) => {
        return (
            <div
                className="relative min-h-[500px] flex items-center justify-center text-white bg-gray-900"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{title}</h1>
                    <p className="text-xl md:text-2xl opacity-90 leading-relaxed">{subtitle}</p>
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
    root: {
        render: ({ children }: { children: React.ReactNode }) => {
            return (
                <div
                    className="min-h-screen bg-gray-50 py-12 px-8 flex justify-center"
                    style={{
                        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}
                >
                    <div className="w-full max-w-5xl bg-white shadow-xl min-h-[800px] border border-gray-100 rounded-lg overflow-hidden transition-shadow hover:shadow-2xl">
                        {children}
                    </div>
                </div>
            );
        },
    },
};

export default config;
