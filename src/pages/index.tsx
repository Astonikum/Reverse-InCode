import styles from "@/styles/menu.module.css";
import * as React from "react";
import Link from "next/link";

export default function Page() {
  return (
      <body className={styles.body}>
        <div className={styles.container}>
            <Link href="/editor">
                TO EDITOR
            </Link>
        </div>
      </body>
  );
}
