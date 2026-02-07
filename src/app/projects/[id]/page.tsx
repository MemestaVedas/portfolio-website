import { projects } from "@/data/projects";
import ProjectDeepDive from "@/components/ProjectDeepDive";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";


export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="bg-blueprint-base min-h-screen">
            <Navigation />

            <div className="pt-32">
                <ProjectDeepDive project={project} />
            </div>


            <Footer />
        </main>
    );
}
