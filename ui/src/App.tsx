import { Footer } from "@/components/footer/Footer.tsx";
import { Sections } from "@/components/Sections.tsx";

const LOGO_LINES = ["╔╦╗ ╔═╗", " ║║ ║ ║", "═╩╝ ╚═╝"];

export function App() {
  return (
    <div className="container mx-auto flex h-screen w-full flex-col items-center gap-4 p-4 select-none">
      <section className="mt-8 flex justify-center">
        <pre className="text-primary text-sm leading-tight font-bold tracking-[0.3em]">
          {LOGO_LINES.join("\n")}
        </pre>
      </section>
      <Sections />
      <Footer />
    </div>
  );
}
