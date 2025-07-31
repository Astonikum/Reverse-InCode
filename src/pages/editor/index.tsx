import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut } from "@/components/ui/menubar";
import { TabsProvider, useTabs } from "@/context/tabs-context";
import { BoxIcon, BugPlayIcon, CommandIcon, ContainerIcon, FolderIcon, PlayIcon, SearchIcon, SettingsIcon, SquareIcon, ChevronsUpDownIcon } from 'lucide-react';
import { ProjectProvider, useProject } from "@/context/project-context";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const sidebarIcons = [
    { key: 'files', icon: <FolderIcon/>, label: 'Files', content: <></> },
    { key: 'find', icon: <SearchIcon/>, label: 'Find', content: <></> },
    { key: 'run', icon: <PlayIcon/>, label: 'Run', content: <></> },
    { key: 'exec', icon: <CommandIcon/>, label: 'Execute', content: <></> },
    { key: 'ext', icon: <BoxIcon/>, label: 'Extensions', content: <></> },
];

const MIN_WIDTH = 300;
const MAX_WIDTH = 1000;

const EditorPage = () => {
    const [activeSidebar, setActiveSidebar] = useState('files');
    const [sidebarWidth, setSidebarWidth] = useState(450);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const isResizing = useRef(false);
    const { name } = useProject();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isResizing.current) {
                let newWidth = e.clientX - (sidebarRef.current?.getBoundingClientRect().left ?? 0);
                newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
                setSidebarWidth(newWidth);
            }
        };
        const handleMouseUp = () => { isResizing.current = false; };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Code Editor</title>
                <style jsx global>{`
                    body {
                        margin: 0;
                        padding: 0;
                        min-height: 100vh;
                        background-color: #000;
                        color: #fff;
                        font-size: 18px;
                        overflow-x: hidden;
                    }
                `}</style>
            </Head>
            <TabsProvider>
                <div className="flex flex-col h-screen w-full">
                    {/* Верхний бар */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-950" style={{ minHeight: 64 }}>
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center">
                                <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                            </Link>
                            <span className="font-bold text-2xl ml-2">{name}</span>
                            <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger>Project</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>New <MenubarShortcut>Ctrl N</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Open from folder <MenubarShortcut>Ctrl O</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Recent...</MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem>Save all <MenubarShortcut>Ctrl S</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Clone project...</MenubarItem>
                                    <MenubarItem>Move project</MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem>Exit</MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem>Project settings <MenubarShortcut>Ctrl Shift ,</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Preferences <MenubarShortcut>Ctrl ,</MenubarShortcut></MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Edit</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>Undo<MenubarShortcut>Ctrl Z</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Redo <MenubarShortcut>Ctrl Y</MenubarShortcut></MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem>Cut <MenubarShortcut>Ctrl X</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Copy <MenubarShortcut>Ctrl C</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Paste <MenubarShortcut>Ctrl V</MenubarShortcut></MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem>Find <MenubarShortcut>Ctrl F</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Replace <MenubarShortcut>Ctrl H</MenubarShortcut></MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem>Execute <MenubarShortcut>Ctrl K</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Execute shortcuts...</MenubarItem>
                                    <MenubarItem>Find in files <MenubarShortcut>Ctrl Shift F</MenubarShortcut></MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>View</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>Appearance...</MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem>Terminal <MenubarShortcut>Ctrl `</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Output <MenubarShortcut>Ctrl Shift `</MenubarShortcut></MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Terminal</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>Open <MenubarShortcut>Ctrl `</MenubarShortcut></MenubarItem>
                                    <MenubarItem>New tab</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Run</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>Run <MenubarShortcut>F5</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Debug <MenubarShortcut>Shift F5</MenubarShortcut></MenubarItem>
                                    <MenubarItem disabled>Stop <MenubarShortcut>F5</MenubarShortcut></MenubarItem>
                                    <MenubarItem>Configuration: ...</MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem>Open configurations</MenubarItem>
                                    <MenubarItem>Add Configuration <MenubarShortcut>Ctrl Alt F5</MenubarShortcut></MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                        </div>
                        <div className="flex items-center gap-1">
                            {/* <Button variant="outline" className='text-lime-400 border-lime-400'><span><PlayIcon/></span></Button>
                            <Button variant="outline" className='text-white border-white'><span>RUN-CONFIG</span></Button>
                            <Button variant="outline" className='text-lime-400 border-lime-400'><span><BugPlayIcon/></span></Button>
                            <Button variant="outline" className='text-red-400 border-red-400'><span><SquareIcon/></span></Button> */}

                            <Button variant="outline" className='text-white border-lime-300 bg-lime-700  disabled:bg-neutral-800 disabled:border-neutral-300'><span><PlayIcon/></span></Button>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline"
                                    role="combobox"
                                    className="w-[200px] justify-between">
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                    <CommandInput placeholder="Search..." />
                                    <CommandList>
                                        <CommandEmpty>No build configurations</CommandEmpty>
                                        <CommandGroup>
                                        
                                        </CommandGroup>
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                                </Popover>
                            <Button variant="outline" className='text-white border-lime-300 bg-lime-700  disabled:bg-neutral-800 disabled:border-neutral-300'><span><BugPlayIcon/></span></Button>
                            <Button variant="outline" className='text-white border-red-300 bg-red-700 disabled:bg-neutral-800 disabled:border-neutral-300' disabled><span><SquareIcon/></span></Button>
                        </div>
                    </div>
                    <div className="flex flex-1 overflow-hidden">
                        {/* Первый (левый) sidebar с иконками */}
                        <div className="flex flex-col items-center w-16 border-r border-neutral-800 bg-neutral-950 py-4 gap-4">
                            {sidebarIcons.map(icon => (
                                <button
                                    key={icon.key}
                                    className={`p-3 rounded-lg text-xl ${activeSidebar === icon.key ? 'bg-neutral-800' : ''}`}
                                    onClick={() => setActiveSidebar(icon.key)}
                                    title={icon.label}
                                >
                                    <span className="text-sm">{icon.icon}</span>
                                </button>
                            ))}
                        </div>
                        {/* Второй sidebar, изменяемый по ширине */}
                        <div
                            ref={sidebarRef}
                            className="hidden md:flex flex-col border-r border-neutral-800 bg-neutral-950 p-4 relative"
                            style={{ width: sidebarWidth, minWidth: MIN_WIDTH, maxWidth: MAX_WIDTH }}
                        >
                            {sidebarIcons.map(icon => (
                                activeSidebar === icon.key && (
                                    <div key={icon.key}>
                                        <span className="w-full text-center text-2xl">{icon.label}</span>
                                        <hr/>
                                        {icon.content}
                                    </div>
                                )
                            ))}
                            <div
                                className="absolute top-0 right-0 h-full w-2 cursor-ew-resize z-10"
                                onMouseDown={() => { isResizing.current = true; }}
                            />
                        </div>
                        {/* Центральная область с вкладками и редактором */}
                        <MainTabs />
                    </div>
                </div>
            </TabsProvider>
        </>
    );
};

const MainTabs = () => {
    const { tabs, activeTab, setActiveTab, closeTab, createTab } = useTabs();

    // Пример создания новой вкладки:
    // createTab({ id: "newfile.ts", label: "newfile.ts", content: <div>Новый файл</div> });

    return (
        <div className="flex-1 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="flex gap-2 border-b border-neutral-800 bg-neutral-950 px-4 py-2 h-12">
                    {tabs.map(tab => (
                        <div key={tab.id} className="flex items-center">
                            <TabsTrigger value={tab.id} className="text-lg ">{tab.label}</TabsTrigger>
                            {tab.id !== 'editor' && (
                                <button
                                    className="ml-1 text-neutral-400 hover:text-red-400"
                                    onClick={() => closeTab(tab.id)}
                                    title="Close tab">
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                </TabsList>
                {tabs.map(tab => (
                    <TabsContent key={tab.id} value={tab.id} className="flex-1 flex flex-col">
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default EditorPage;