import React, { createContext, useContext, useState, ReactNode } from "react";

type ProjectContextType = {
    name: string;
    path: string;
    id: string;
    buildProfiles: string[];
    setName: (name: string) => void;
    setPath: (path: string) => void;
    setId: (id: string) => void;
    setBuildProfiles: (profiles: string[]) => void;
    resetProject: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [id, setId] = useState("");
    const [buildProfiles, setBuildProfiles] = useState<string[]>([]);

    const resetProject = () => {
        setName("");
        setPath("");
        setId("");
        setBuildProfiles([]);
    };

    return (
        <ProjectContext.Provider value={{
            name,
            path,
            id,
            buildProfiles,
            setName,
            setPath,
            setId,
            setBuildProfiles,
            resetProject,
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const ctx = useContext(ProjectContext);
    if (!ctx) throw new Error("useProject must be used within ProjectProvider");
    return ctx;
};