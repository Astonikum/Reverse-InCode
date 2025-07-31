import '../app/global.css';
import { ProjectProvider } from "@/context/project-context";

function MyApp({ Component, pageProps }) {
    return (
        <ProjectProvider><Component {...pageProps} /></ProjectProvider>
    )
}

export default MyApp