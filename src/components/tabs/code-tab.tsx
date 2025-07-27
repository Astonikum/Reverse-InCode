import {TabsContent} from "@/components/ui/tabs";
import {Card} from "@/components/ui/card";
import Editor, {DiffEditor, useMonaco, loader} from '@monaco-editor/react';

interface CodeTabProps {
    language?: unknown
}

export function CodeTab({file, language}) {
    // const electron = require('electron')
    // const remote = electron.remote
    // const y = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds().height;

    return (
        <TabsContent value={file}>
            <Card className="w-full h-full rounded-none ">
                <span className="text-sm/0 font-light text-center text-gray-400 dark:text-white ">{file}</span>
                {/*<Editor className="w-full h-full" height={`calc(${y} - var(--header-height) - calc(var(--spacing) * 8))`} defaultLanguage={language} defaultValue="" theme="vs-dark" options={{*/}
                <Editor className="w-full h-full" height={"100vh"} defaultLanguage={language} defaultValue="" theme="vs-dark" options={{
                    "inlineSuggest": true,
                        "fontSize": "16px",
                        "formatOnType": true,
                        "autoClosingBrackets": true,
                        "minimap": { "scale": 5 }
                    }}
                />
            </Card>
        </TabsContent>
    )
}