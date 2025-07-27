"use client"

import * as React from "react"
import {Command, Cuboid, Folder, GitPullRequest, Play, Search} from "lucide-react"

import { Label } from "@/components/ui/label"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {FileSide} from "@/components/sides/file-side";

// This is sample data
const data = {
    navMain: [
        {
            title: "Files",
            content: <FileSide/>,
            icon: Folder,
            isActive: true,
        },
        {
            title: "Find",
            content: <SidebarContent />,
            icon: Search,
            isActive: false,
        },
        {
            title: "Run",
            content: <SidebarContent />,
            icon: Play,
            isActive: false,
        },
        {
            title: "Commands",
            content: <SidebarContent />,
            icon: Command,
            isActive: false,
        },
        {
            title: "Extensions",
            content: <SidebarContent />,
            icon: Cuboid,
            isActive: false,
        },
        {
            title: "Git",
            content: <SidebarContent />,
            icon: GitPullRequest,
            isActive: false,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // Note: I'm using state to show active item.
    // IRL you should use the url/router.
    const [activeItem, setActiveItem] = React.useState(data.navMain[0])
    const { setOpen } = useSidebar()

    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden *:data-[sidebar=sidebar]:flex-row top-(--header-height) h-[calc(100svh-var(--header-height))]!"
            {...props}
        >
            {/* This is the first sidebar */}
            {/* We disable collapsible and adjust width to icon. */}
            {/* This will make the sidebar appear as icons. */}
            <Sidebar
                collapsible="none"
                className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            {/*<SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">*/}
                            {/*    <a href="#">*/}
                            {/*        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">*/}
                            {/*            <Command className="size-4" />*/}
                            {/*        </div>*/}
                            {/*        <div className="grid flex-1 text-left text-sm leading-tight">*/}
                            {/*            <span className="truncate font-medium">Acme Inc</span>*/}
                            {/*            <span className="truncate text-xs">Enterprise</span>*/}
                            {/*        </div>*/}
                            {/*    </a>*/}
                            {/*</SidebarMenuButton>*/}
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu>
                                {data.navMain.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={{
                                                children: item.title,
                                                hidden: false,
                                            }}
                                            onClick={() => {
                                                setActiveItem(item)
                                                {/*Действия при тыке*/}
                                                setOpen(true)
                                            }}
                                            isActive={activeItem?.title === item.title}
                                            className="px-2.5 md:px-2"
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>

                </SidebarFooter>
            </Sidebar>

            {/* This is the second sidebar */}
            {/* We disable collapsible and let it fill remaining space */}
            <Sidebar collapsible="none" className="hidden flex-1 md:flex">
                <SidebarHeader className="gap-3.5 border-b p-4">
                    <div className="flex w-full items-center justify-between">
                        <div className="text-foreground text-base font-medium">
                            {activeItem?.title}
                        </div>
                    </div>
                </SidebarHeader>
                {activeItem?.content}
            </Sidebar>
        </Sidebar>
    )
}
