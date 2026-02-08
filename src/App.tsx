import { useState } from "react";
import { Puck } from "@measured/puck";
import type { Data } from "@measured/puck";
import config from "./puck.config";
import { TemplateSelector } from "./components/TemplateSelector";
import "./index.css";

import { saveSite, publishSite } from "./firebase";

// Initial data with a Hero component
const initialData = {
  content: [
    {
      type: "Hero",
      props: {
        id: "Hero-1",
        title: "Welcome to PhilanthroForge",
        subtitle: "Build beautiful websites for non-profits with drag-and-drop simplicity",
        backgroundImage: "https://images.unsplash.com/photo-1469571406257-022069fca5ed?w=1200&h=600&fit=crop",
      },
    },
  ],
  root: {},
};

function App() {
  const [data, setData] = useState<Data>(initialData);
  const userId = "demo-user-123"; // Placeholder User ID for Phase 05

  // Force re-render of Puck when template changes by using a key, 
  // or rely on Puck's internal handling if we pass data prop updates.
  // Puck usually requires a unique key to fully reset if the structure changes completely.
  const [key, setKey] = useState(0);

  const loadTemplate = (newData: Data) => {
    setData(newData);
    setKey(prev => prev + 1);
  };

  const handleSave = async () => {
    await saveSite(userId, data);
    alert("Site saved (check console)");
  };

  const handlePublish = async () => {
    await saveSite(userId, data); // Save before publish
    await publishSite(userId);
    alert("Site published (check console)");
  };

  return (
    <div className="h-screen flex flex-col">
      <TemplateSelector
        onSelect={loadTemplate}
        onSave={handleSave}
        onPublish={handlePublish}
      />
      <div className="flex-1">
        <Puck
          key={key}
          config={config}
          data={data}
          onChange={(newData) => setData(newData)}
          onPublish={async (data) => {
            console.log("Published Data:", data);
            await saveSite(userId, data);
          }}
        />
      </div>
    </div>
  );
}

export default App;
