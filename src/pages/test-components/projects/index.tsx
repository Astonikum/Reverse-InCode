import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import dynamic from "next/dynamic";

const ProjectOpenDialog = dynamic(
    () => import('../../../components/project-open'),
    { ssr: false, loading: () => <p>Загрузка компонента...</p> }
)

export default function Page() {
    return (
        <Dialog>
            <DialogTrigger>
                TEST
            </DialogTrigger>
            <ProjectOpenDialog />
        </Dialog>
    )
}