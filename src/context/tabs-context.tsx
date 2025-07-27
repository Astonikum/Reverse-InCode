import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface Tab {
    id: string;
    path: string;
    file: string;
    name: string;
}

interface TabsContextType {
    tabs: Tab[];
    addTab: (tab: Omit<Tab, 'id'>) => void;
    removeTab: (id: string) => void;
    activeTab: string;
    setActiveTab: (id: string) => void;
    findTabByPath: (path: string) => Tab | undefined;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const TabsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTab, setActiveTab] = useState<string>('home');

    // Поиск вкладки по пути
    const findTabByPath = useCallback((path: string) => {
        return tabs.find(tab => tab.path === path);
    }, [tabs]);

    const addTab = useCallback((tab: Omit<Tab, 'id'>) => {
        // Проверяем, существует ли уже вкладка с таким path
        const existingTab = tabs.find(t => t.path === tab.path);

        if (existingTab) {
            // Если вкладка уже открыта - просто активируем её
            setActiveTab(existingTab.id);
            return;
        }

        // Создаём новую вкладку
        const id = tab.path;
        setTabs(prev => [...prev, { ...tab, id }]);
        setActiveTab(id);
    }, [tabs]);

    const removeTab = useCallback((id: string) => {
        setTabs(prev => prev.filter(tab => tab.id !== id));
        if (activeTab === id) setActiveTab('home');
    }, [activeTab]);

    return (
        <TabsContext.Provider value={{
            tabs,
            addTab,
            removeTab,
            activeTab,
            setActiveTab,
            findTabByPath
        }}>
            {children}
        </TabsContext.Provider>
    );
};

export const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('useTabs must be used within a TabsProvider');
    return context;
};