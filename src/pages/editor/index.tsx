import Head from 'next/head';
import { TabsProvider } from '../../context/tabs-context';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { MenubarHeader } from "@/components/menubar-header";
import EditorTabs from "@/components/editor-tabs";

const EditorPage = () => {
    return (
        <TabsProvider>
            <Head>
                <title>Code Editor</title>
                <style jsx global>{`
                    body {
                        margin: 0;
                        padding: 0;
                        min-height: 100vh;
                        background-color: #000;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                        overflow-x: hidden;
                    }
                `}</style>
            </Head>
            <div className="w-full">
                <div className="[--header-height:calc(--spacing(14))] w-full">
                    <SidebarProvider
                        style={{ "--sidebar-width": "350px" } as React.CSSProperties}
                        className="flex flex-col">

                        <MenubarHeader />
                        <div className="flex flex-1 w-full">
                            <AppSidebar />
                            <SidebarInset className="w-full">
                                <EditorTabs />
                            </SidebarInset>
                        </div>
                    </SidebarProvider>
                </div>
            </div>
        </TabsProvider>

    );
};

export default EditorPage;