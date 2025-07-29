import styles from "@/styles/menu.module.css";
import * as React from "react";
import Link from "next/link";
import {useEffect, useState} from "react";

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
            <span>{customPath}</span>
            <Link href="/editor">
                TO EDITOR
            </Link>
            <Link href="/test-components/projects">
                TESTS (PROJECTS)
            </Link>
        </div>
      </body>
  );
}
