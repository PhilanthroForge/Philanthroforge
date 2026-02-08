import { useState } from "react";
import type { Data } from "@measured/puck";
import { ConsultationModal } from "./ConsultationModal";
import ecoGreen from "../templates/eco_green.json";
import urbanAid from "../templates/urban_aid.json";
import cleanWater from "../templates/clean_water.json";
import kidsCare from "../templates/kids_care.json";
import crisisRelief from "../templates/crisis_relief.json";

type TemplateSelectorProps = {
    onSelect: (data: Data) => void;
    onSave: () => void;
    onPublish: () => void;
};

const templates = [
    { name: "Eco Green", data: ecoGreen },
    { name: "Urban Aid", data: urbanAid },
    { name: "Clean Water", data: cleanWater },
    { name: "Kids Care", data: kidsCare },
    { name: "Crisis Relief", data: crisisRelief },
];

export function TemplateSelector({ onSelect, onSave, onPublish }: TemplateSelectorProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = templates.find((t) => t.name === e.target.value);
        if (selected) {
            if (confirm(`Load "${selected.name}" template? This will overwrite current changes.`)) {
                onSelect(selected.data as Data);
            } else {
                e.target.value = ""; // Reset
            }
        }
    };

    return (
        <>
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-40">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">PhilanthroForge</h1>
                    <div className="h-6 w-px bg-gray-300 mx-2"></div>

                    <div className="relative group">
                        <select
                            onChange={handleTemplateChange}
                            defaultValue=""
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-48 p-2.5 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <option value="" disabled>Change Theme...</option>
                            {templates.map((t) => (
                                <option key={t.name} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm px-3 py-2 transition-colors flex items-center gap-1"
                    >
                        <span>Need Custom Design?</span>
                    </button>

                    <div className="h-6 w-px bg-gray-300 mx-2"></div>

                    <button
                        onClick={onSave}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={onPublish}
                        className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                    >
                        Publish Site
                    </button>
                </div>
            </div>

            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
