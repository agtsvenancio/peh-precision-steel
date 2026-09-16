import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import logoAsset from "@/assets/logo-peh.png.asset.json";
import { Button } from "@/components/ui/button";

const links = [
  ["Home", "#home"],
  ["Sobre nós", "#sobre"],
  ["Serviços", "#servicos"],
  ["Segurança", "#seguranca"],
  ["Contato", "#contato"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || open ? "border-metallic/25 bg-background/95 shadow-lg backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:h-24 lg:px-8">
        <a href="#home" aria-label="PEH Serralheria — início" className="inline-flex w-fit items-center">
          <img src={logoAsset.url} alt="PEH Serralheria" className="h-14 w-auto brightness-0 invert lg:h-16" />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="story-link text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {label}
            </a>
          ))}
          <Button asChild size="sm"><a href="#contato">Solicitar orçamento</a></Button>
        </nav>

        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      {open && (
        <nav aria-label="Navegação móvel" className="border-t border-metallic/20 bg-background px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-metallic/15 py-4 text-base font-semibold text-foreground">
                {label}
              </a>
            ))}
            <Button asChild className="mt-5"><a href="#contato" onClick={() => setOpen(false)}>Solicitar orçamento</a></Button>
          </div>
        </nav>
      )}
    </header>
  );
}