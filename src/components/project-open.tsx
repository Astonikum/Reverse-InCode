import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {FolderIcon, PlusCircleIcon} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useState} from "react";
import {ipcRenderer} from "electron";

declare global {
    interface Window {
        electronAPI?: {
            openFolderDialog: () => Promise<string | null>
        }
    }
}
function ProjectOpenDialog() {

    const [folderPath, setFolderPath] = useState('')

    const openFromFolder = async () => {
        console.log(window.electronAPI)
        if (!window.electronAPI) {
            console.error('Electron API is not available')
            return
        }
        try {
            const projectPath = await window.electronAPI.openFolderDialog()
            if (projectPath) {
                setFolderPath(projectPath)
                console.log('Selected folder:', projectPath)
            }
        } catch (error) {
            console.error('Error opening dialog:', error)
        }

        
    }

    // const openFromFolder = async () => {
    //     if (typeof window === 'undefined') return
    //     let projectPath: string = ""
    //
    //     try {
    //         const path = await ipcRenderer.invoke('open-folder-dialog')
    //         if (path) {
    //             projectPath = path
    //             console.log('Выбранная папка:', path)
    //         }
    //     } catch (error) {
    //         console.error('Ошибка:', error)
    //         return;
    //     }
    //
    //     alert(projectPath);
    // }

    return (
        <DialogContent >
            <DialogHeader>
                <DialogTitle className="text-center">Open project</DialogTitle>
            </DialogHeader>
            <div className="w-full h-fit mx-auto flex flex-col md:flex-row justify-center items-center gap-2">
                <div
                    className="items-center justify-center"><Button className="text-white bg-lime-700 hover:bg-lime-900" onClick={openFromFolder}><FolderIcon/>Open from folder</Button>
                </div>
                <div
                    className="items-center justify-center"><Button className="text-white  bg-lime-700 hover:bg-lime-900"><PlusCircleIcon/>New project</Button>
                </div>
            </div>
            <ScrollArea className="h-[500px] w-full rounded-md border p-4">

            </ScrollArea>
        </DialogContent>
    )
}

export default ProjectOpenDialog