import logoAsset from "@/assets/logo-peh.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-metallic/20 bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <img src={logoAsset.url} alt="PEH Serralheria" className="h-24 w-auto brightness-0 invert" />
          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Soluções metálicas desenvolvidas com experiência, segurança, qualidade e precisão.</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase text-foreground">Navegação</h2>
          <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
            <a href="#sobre" className="hover:text-primary">Sobre nós</a><a href="#servicos" className="hover:text-primary">Serviços</a><a href="#seguranca" className="hover:text-primary">Segurança</a><a href="#contato" className="hover:text-primary">Contato</a>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase text-foreground">Contato</h2>
          <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
            <a href="tel:+551125532623" className="hover:text-primary">Telefone: (11) 2553-2623</a>
            <a href="https://wa.me/5511967411274" target="_blank" rel="noreferrer" className="hover:text-primary">WhatsApp: (11) 96741-1274</a>
          </div>
        </div>
      </div>
      <div className="border-t border-metallic/15 px-5 py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} PEH Serralheria. Todos os direitos reservados.</div>
    </footer>
  );
}