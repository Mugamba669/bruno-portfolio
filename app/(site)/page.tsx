import SceneRoot from "@/components/SceneRoot";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { getPortfolio } from "@/lib/portfolio";

export default async function Home() {
  const { profile, skills, experience, projects, stats } = await getPortfolio();
  return (
    <main className="page-content">
      <SceneRoot />
      <Nav />
      <Hero profile={profile} stats={stats} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Experience experience={experience} />
      <Projects projects={projects} />
      <Contact profile={profile} />
    </main>
  );
}
