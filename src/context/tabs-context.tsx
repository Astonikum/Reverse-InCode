import React, { createContext, useContext, useState } from "react";

export type Tab = { id: string; label: string; content: React.ReactNode };

type TabsContextType = {
    tabs: Tab[];
    activeTab: string;
    createTab: (tab: Tab) => void;
    closeTab: (id: string) => void;
    setActiveTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
    const [tabs, setTabs] = useState<Tab[]>([
        { id: "editor", label: "main.ts", content: <div className="flex-1">{/* <MonacoEditor ... /> */}</div> },
        { id: "preview", label: "Preview", content: <div className="p-4 text-neutral-400">Preview output...</div> }
    ]);
    const [activeTab, setActiveTab] = useState("editor");

    const createTab = (tab: Tab) => {
        setTabs(prev => [...prev, tab]);
        setActiveTab(tab.id);
    };
    const closeTab = (id: string) => {
        setTabs(prev => prev.filter(t => t.id !== id));
        if (activeTab === id && tabs.length > 1) {
            setActiveTab(tabs[0].id);
        }
    };

    return (
        <TabsContext.Provider value={{ tabs, activeTab, createTab, closeTab, setActiveTab }}>
            {children}
        </TabsContext.Provider>
    );
};

export const useTabs = () => {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error("useTabs must be used within TabsProvider");
    return ctx;
};