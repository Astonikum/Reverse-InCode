import { createContext, useState, useContext } from "react";

// Создаем тип для контекста
type ProjectContextType = {
    projectName: string;
    projectId: string;
    projectPath: string;
    buildOptions: string[]; // Уточните тип для опций сборки
    openProject: (path: string) => void;
    newProject: (path: string) => void;
};

// Инициализируем контекст с дефолтными значениями
const ProjectContext = createContext<ProjectContextType>({
    projectName: "",
    projectId: "",
    projectPath: "",
    buildOptions: [],
    openProject: () => console.warn("No project provider"),
    newProject: () => console.warn("No project provider"),
});

export const ProjectProvider = ({ children }) => {
    // Используем единый объект состояния
    const [project, setProject] = useState({
        projectName: "",
        projectId: "",
        projectPath: "",
        buildOptions: [],
    });

    // Функция для открытия проекта
    const openProject = (id: string) => {
        // Здесь должна быть логика инициализации проекта
        // Пример установки значений:
        setProject({
            projectName: "Новый проект",
            projectId: id,
            projectPath: path,
            buildOptions: [], // Замените на реальные опции
        });
    };

    const newProject = (path: string) => {
        // Здесь должна быть логика инициализации проекта
        // Пример установки значений:
        openProject(id);
    };

    // Собираем все значения для провайдера
    const value = {
        ...project,
        openProject,
        newProject,
    };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
};

// Хук для удобного использования контекста
export const useProject = () => useContext(ProjectContext);