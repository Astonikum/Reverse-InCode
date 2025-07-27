// components/editor-tabs.tsx
import { useTabs } from '@/context/tabs-context';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HomeIcon, X } from "lucide-react";
import { CodeTab } from "@/components/tabs/code-tab";
import {getFileInfo} from "@/lib/types";
import {UnknownTab} from "@/components/tabs/unknown-tab";

const EditorTabs = () => {
    const { tabs, removeTab, activeTab, setActiveTab } = useTabs();

    return <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full"
    >
        <TabsList className="overflow-x-auto">
            <TabsTrigger value="home">
                <HomeIcon size={16} />
            </TabsTrigger>

            {tabs.map(tab => <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 group"
                >
                    {tab.name}
                    <X
                        size={14}
                        className="opacity-50 group-hover:opacity-100 group-hover:text-red-500 transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeTab(tab.id);
                        }}
                    />
                </TabsTrigger>)}
        </TabsList>

        <TabsContent value="home" className="p-4">
            <div className="text-center py-10">
                <h2 className="text-xl font-bold">Welcome to the Editor</h2>
                <p className="text-muted-foreground">Select a file to start editing</p>
            </div>
        </TabsContent>

        {tabs.map(tab => {
            const fileInfo = getFileInfo(tab.file);
            return (
                <TabsContent key={tab.id} value={tab.id} className="h-full">
                    {fileInfo.type === "vscode" &&
                        <CodeTab file={tab.path} language={fileInfo.attr} />
                    }
                    {fileInfo.type === "unknown" &&
                        <UnknownTab file={tab.path}/>
                    }
                </TabsContent>
            );
        })}

    </Tabs>;
};

export default EditorTabs;