import type { ComponentConfig } from "@measured/puck";

export type ImageGridProps = {
    image1: string;
    image2: string;
    image3: string;
};

export const ImageGrid: ComponentConfig<ImageGridProps> = {
    fields: {
        image1: { type: "text", label: "Image 1 URL" },
        image2: { type: "text", label: "Image 2 URL" },
        image3: { type: "text", label: "Image 3 URL" },
    },
    defaultProps: {
        image1: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
        image2: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
        image3: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
    },
    render: ({ image1, image2, image3 }) => {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                        <img src={image1} alt="Grid 1" className="w-full h-full object-cover transition-transform hover:scale-105" />
                    </div>
                    <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                        <img src={image2} alt="Grid 2" className="w-full h-full object-cover transition-transform hover:scale-105" />
                    </div>
                    <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                        <img src={image3} alt="Grid 3" className="w-full h-full object-cover transition-transform hover:scale-105" />
                    </div>
                </div>
            </div>
        );
    },
};
