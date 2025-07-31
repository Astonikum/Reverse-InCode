import styles from "@/styles/menu.module.css";
import * as React from "react";
import Link from "next/link";
import {useEffect, useState} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { FolderIcon, PlusCircleIcon } from "lucide-react";

export default function Page() {
    const [customPath, setCustomPath] = useState('');
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const init = async () => {
            if (window.electronAPI) {
                const path = await window.electronAPI.getCustomAppDataPath();
                setCustomPath(path);
            }
        };
        init();
    }, []);

  return (
      <body className={styles.body}>
        <div className={styles.container}>
            <div className="h-screen w-full grid grid-cols-2">
                <div className={styles.container}>
                    <span>{customPath}</span>
                    <Link href="/editor">
                        TO EDITOR
                    </Link>
                    <Link href="/test-components/projects">
                        TESTS (PROJECTS)
                    </Link>

                    <Image src={"/text.svg"} alt={"inCode"} width={300} height={150}/>
                    <div className="grid grid-cols-2 py-5">
                        <Button variant="outline" className="w-[100px] h-[100px]">OPEN <br/>FROM <br/>FOLDER</Button>
                        <Button variant="outline" className="w-[100px] h-[100px]">NEW</Button>
                    </div>
                </div>
                <div className="">
                    <ScrollArea className="h-full w-full rounded-md border p-4 ">

                    </ScrollArea>
                </div>
            </div>
        </div>
      </body>
  );
}
