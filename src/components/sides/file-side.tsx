import * as React from "react"
import {ChevronDown, ChevronRight, File, Folder} from "lucide-react"
import { useTabs } from '../../context/tabs-context';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "@/components/ui/sidebar"
import {getFileInfo, getFolderInfo} from "@/lib/types";
import {
    ContextMenu, ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

// This is sample data.
const data = {
    // changes: [
    //     {
    //         file: "README.md",
    //         state: "M",
    //     },
    //     {
    //         file: "api/hello/route.ts",
    //         state: "U",
    //     },
    //     {
    //         file: "app/layout.tsx",
    //         state: "M",
    //     },
    // ],
    tree: [
        [
            "app",
            [
                "api",
                ["hello", ["route.ts"]],
                "page.tsx",
                "layout.tsx",
                ["blog", ["page.tsx"]],
            ],
        ],
        [
            "components",
            ["ui", "button.tsx", "card.tsx"],
            "header.tsx",
            "footer.tsx",
        ],
        ["lib", ["util.ts"]],
        ["public", "favicon.ico", "vercel.svg"],
        ".eslintrc.json",
        ".gitignore",
        "next.config.js",
        "tailwind.config.js",
        "package.json",
        "README.md",
    ],
}

export function FileSide({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <SidebarContent>
            {/* <Collapsible className="group/collapsible">
                <SidebarGroup>
                    <SidebarGroupLabel asChild>
                        <CollapsibleTrigger>
                            CHANGES
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {data.changes.map((item, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton>
                                            <File />
                                            {item.file}
                                        </SidebarMenuButton>
                                        <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                </SidebarGroup>
            </Collapsible> */}
            <SidebarGroup>
                <SidebarGroupLabel>FILES</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {data.tree.map((item, index) => (
                            <Tree key={index} item={item} />
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}

function Tree({ item }: { item: string | any[] }) {
    const [name, ...items] = Array.isArray(item) ? item : [item]
    const { addTab, findTabByPath } = useTabs();

    if (!items.length) {
        return (
            <ContextMenu>
                <ContextMenuTrigger>
                    <SidebarMenuButton
                        isActive={name === "button.tsx"}
                        className="data-[active=true]:bg-transparent"
                        // className={`w-full text-left px-2 py-1 rounded flex justify-between items-center ${
                        //     isAlreadyOpen
                        //         ? 'bg-blue-500 text-white'
                        //         : 'hover:bg-gray-700'
                        // }`}
                        onClick={() => {
                            addTab({path: name, file: name, name})
                        }}
                    >
                        {getFileInfo(name).icon}
                        {name}
                    </SidebarMenuButton>
                </ContextMenuTrigger>

                <ContextMenuContent className="w-52">
                    <ContextMenuItem inset>
                        Cut
                        <ContextMenuShortcut>^X</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset>
                        Copy
                        <ContextMenuShortcut>^C</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset disabled>
                        Paste
                        <ContextMenuShortcut>^V</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset>
                        Rename
                        <ContextMenuShortcut>F2</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset>
                        Push to command
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem inset variant="destructive">Delete</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        )
    }

    return (
        <SidebarMenuItem>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                // defaultOpen={name === "components" || name === "ui"}
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ChevronRight className="transition-transform" />
                        {/*<Folder />*/}
                        {getFolderInfo(name).icon}
                        {name}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.map((subItem, index) => (
                            <Tree key={index} item={subItem} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )
}
