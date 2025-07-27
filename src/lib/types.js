import {FileIcon} from "lucide-react";
import { Icon } from "@iconify/react";

const FILE_TYPES = [
    {
        name: "Plain Text",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-text"} />,
        attr: "plaintext",
        extensions: [".txt",]
    },
    {
        name: "Batch",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-powershell-format"} />,
        attr: "bat",
        extensions: [".bat", ".cmd"]
    },
    {
        name: "Clojure",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-clojure"} />,
        attr: "clojure",
        extensions: [".clj", ".cljs", ".cljr", ".cljc", ".cljd", ".edn", ]
    },
    {
        name: "C",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-c2"} />,
        attr: "c",
        extensions: [".c", ".h"]  // Добавлен .h
    },
    {
        name: "C++",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-cpp2"} />,
        attr: "cpp",
        extensions: [".cpp", ".cc", ".cxx", ".hpp", ".hh"]  // Добавлены заголовки
    },
    {
        name: "C#",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-csharp"} />,
        attr: "csharp",
        extensions: [".cs",]
    },
    {
        name: "Stylesheet",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-css"} />,
        attr: "css",
        extensions: [".css",]
    },
    {
        name: "Dart",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-dartlang"} />,
        attr: "dart",
        extensions: [".dart",]
    },
    {
        name: "Go",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-go"} />,
        attr: "go",
        extensions: [".go",]
    },
    {
        name: "HTML",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-html"} />,
        attr: "html",
        extensions: [".html", ".htm"]
    },
    {
        name: "Java",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-java"} />,
        attr: "java",
        extensions: [".java",]
    },
    {
        name: "JavaScript",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-js-official"} />,
        attr: "javascript",
        extensions: [".js", ".mjs"]  // Объединено
    },
    {
        name: "JSX",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-reactjs"} />,
        attr: "javascriptreact",  // Исправлено!
        extensions: [".jsx"]
    },
    {
        name: "Kotlin",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-kotlin"} />,
        attr: "kotlin",
        extensions: [".kt", ".kts"]  // Убраны .kexe/.klib
    },
    {
        name: "Lua",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-lua"} />,
        attr: "lua",
        extensions: [".lua",]
    },
    {
        name: "Markdown",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-markdown"} />,
        attr: "markdown",
        extensions: [".markdown", ".md"]
    },
    {
        name: "Pascal",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:default-file"}/>,
        attr: "pascal",
        extensions: [".pas",]
    },
    {
        name: "PHP",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-php3"} />,
        attr: "php",
        extensions: [".php", ".phar", ".phtml", ".pht", ".phps", ]
    },
    {
        name: "PowerShell",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-powershell"} />,
        attr: "powershell",
        extensions: [".ps1",]
    },
    {
        name: "Python",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-python"} />,
        attr: "python",
        extensions: [".py"]
    },
    {
        name: "R",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-r"} />,
        attr: "r",
        extensions: [".r", ".R"]
    },
    {
        name: "Rust",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-rust"} />,
        attr: "rust",
        extensions: [".rs",]
    },
    {
        name: "Scala",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-scala"} />,
        attr: "scala",
        extensions: [".scala", ".sc"]
    },
    {
        name: "Stylesheet (SCSS)",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-scss"} />,
        attr: "scss",
        extensions: [".scss", ".sass"]
    },
    {
        name: "Shell",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-shell"} />,
        attr: "shell",
        extensions: [".sh",]
    },
    {
        name: "SQL",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-sql"} />,
        attr: "sql",
        extensions: [".sql", ".mysql"] // Объединено
    },
    {
        name: "Swift",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-swift"} />,
        attr: "swift",
        extensions: [".swift",]
    },
    {
        name: "TypeScript",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-typescript-official"} />,
        attr: "typescript",
        extensions: [".ts"]
    },
    {
        name: "TSX",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-reactts"} />,
        attr: "typescriptreact",  // Исправлено!
        extensions: [".tsx"]
    },
    {
        name: "XML",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-xml"} />,
        attr: "xml",
        extensions: [".xml",]
    },
    {
        name: "YAML",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-yaml-official"} />,
        attr: "yaml",
        extensions: [".yml", ".yaml"]
    },
    {
        name: "JSON",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-json"} />,
        attr: "json",
        extensions: [".json", ".jsonc"] // Добавлен jsonc
    },
    {
        name: "Environment",
        type: "unknown",
        icon: <Icon icon={"vscode-icons:file-type-dotenv"} />,
        attr: "",
        extensions: [".env"]
    },
    {
        name: "Arduino",
        type: "unknown",
        icon: <Icon icon={"vscode-icons:file-type-arduino"} />,
        attr: "",
        extensions: [".ino"]
    },
    {
        name: "Debian Package",
        type: "unknown",
        icon: <Icon icon={"vscode-icons:file-type-debian"} />,
        attr: "exec",
        extensions: [".deb"]
    },
    {
        name: "GitIgnore",
        type: "vscode",
        icon: <Icon icon={"vscode-icons:file-type-git"} />,
        attr: "gitignore",
        extensions: [".gitignore"]
    },
    {
        name: "OpenVPN Configuration",
        type: "unknown",
        icon: <Icon icon={"vscode-icons:file-type-ovpn"} />,
        attr: "",
        extensions: [".ovpn"]
    },
    {
        name: "Solution",
        type: "unknown",
        icon: <Icon icon={"vscode-icons:file-type-sln"} />,
        attr: "",
        extensions: [".sln"]
    },
];
const FOLDER_NAMES = [
    {
        name: "Fonts",
        icon: <Icon icon={"vscode-icons:folder-type-fonts-opened"} />,
        specnames: ["font","fonts"]
    },
    {
        name: "Assets",
        icon: <Icon icon={"vscode-icons:folder-type-images-opened"} />,
        specnames: ["asset","assets","public"]
    },
    {
        name: "Styles",
        icon: <Icon icon={"vscode-icons:folder-type-style-opened"} />,
        specnames: ["style","styles","stylesheet","stylesheets"]
    },
    {
        name: "CSS",
        icon: <Icon icon={"vscode-icons:folder-type-css-opened"} />,
        specnames: ["css"]
    },
    {
        name: "Next Folder",
        icon: <Icon icon={"vscode-icons:folder-type-next-opened"} />,
        specnames: [".next"]
    },
    {
        name: "VSCode",
        icon: <Icon icon={"vscode-icons:folder-type-vscode-opened"} />,
        specnames: [".vs"]
    },
]

export function getFileInfo(file) {
    const fileName = file.name || file;
    const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();

    const foundType = FILE_TYPES.find(type =>
        type.extensions.some(ext => ext.toLowerCase() === extension)
    );

    return foundType || {
        name: "Unknown",
        type: "unknown",
        icon: <Icon icon={"vscode-icons:default-file"}/>,
        attr: "",
        extensions: []
    };
}

export function getFolderInfo(file) {
    const fileName = file.name || file;
    const spec = fileName.toLowerCase();

    const foundType = FOLDER_NAMES.find(type =>
        type.specnames.some(ext => ext.toLowerCase() === spec)
    );

    return foundType || {
        name: "Default",
        icon: <Icon icon={"proicons:folder"}/>,
        specnames: []
    };
}