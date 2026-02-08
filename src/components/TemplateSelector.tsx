import type { Data } from "@measured/puck";
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
    { name: "Eco Green", data: ecoGreen, color: "bg-green-600" },
    { name: "Urban Aid", data: urbanAid, color: "bg-orange-600" },
    { name: "Clean Water", data: cleanWater, color: "bg-blue-500" },
    { name: "Kids Care", data: kidsCare, color: "bg-yellow-400" },
    { name: "Crisis Relief", data: crisisRelief, color: "bg-red-700" },
];

export function TemplateSelector({ onSelect, onSave, onPublish }: TemplateSelectorProps) {
    return (
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 flex-1">
                <span className="text-sm font-bold text-gray-500 mr-2 uppercase tracking-wider">Templates:</span>
                {templates.map((t) => (
                    <button
                        key={t.name}
                        onClick={() => {
                            if (confirm(`Load "${t.name}" template? This will overwrite current changes.`)) {
                                onSelect(t.data as Data);
                            }
                        }}
                        className={`px-4 py-2 rounded text-sm font-medium text-white shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap ${t.color}`}
                    >
                        {t.name}
                    </button>
                ))}
            </div>
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
                <button
                    onClick={onSave}
                    className="px-4 py-2 rounded text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    Save
                </button>
                <button
                    onClick={onPublish}
                    className="px-4 py-2 rounded text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
                >
                    Publish
                </button>
            </div>
        </div>
    );
}
