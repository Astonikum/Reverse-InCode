import {TabsContent} from "@/components/ui/tabs";
import {Card} from "@/components/ui/card";
import Editor, {DiffEditor, useMonaco, loader} from '@monaco-editor/react';

export function UnknownTab({file}) {
    return (
        <TabsContent value={file}>
            <Card className="w-full h-full items-center justify-center rounded-none" style={{minHeight: "100vh"}}>
                <span className="text-9xl font-bold text-lime-400 dark:text-white">:(</span>
                <span className="text-2xl font-bold text-white dark:text-white">This file type is not supported.</span>
                <span className="text-sm font-light text-gray-400 dark:text-white">{file}</span>
            </Card>
        </TabsContent>
    )
}