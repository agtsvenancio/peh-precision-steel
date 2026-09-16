import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileCheck2, HardHat, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import coberturaAsset from "@/assets/cobertura.jpg.asset.json";
import escadaAsset from "@/assets/escada-metalica.png.asset.json";
import escadaMarinheiroAsset from "@/assets/escada-marinheiro.jpg.asset.json";
import estruturaAsset from "@/assets/estrutura-metalica.jpg.asset.json";
import gradeProtecaoAsset from "@/assets/grade-protecao.jpg.asset.json";
import gradesAsset from "@/assets/grades.jpg.asset.json";
import guardaCorpoAsset from "@/assets/guarda-corpo-inox.png.asset.json";
import heroAsset from "@/assets/peh-soldador.png.asset.json";
import mezaninoAsset from "@/assets/mezanino.png.asset.json";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

const pageTitle = "PEH Serralheria | Estruturas e Soluções Metálicas";
const pageDescription = "PEH Serralheria: soluções em estruturas metálicas, mezaninos, escadas, coberturas, guarda-corpos, grelhas, ferro e aço inox.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const services = [
  { name: "Estruturas metálicas", description: "Soluções estruturais planejadas para as necessidades de cada projeto.", image: estruturaAsset.url },
  { name: "Mezaninos", description: "Estruturas para ampliação e melhor aproveitamento dos espaços.", image: mezaninoAsset.url },
  { name: "Escadas metálicas", description: "Execução precisa para ambientes residenciais, comerciais e industriais.", image: escadaAsset.url },
  { name: "Escadas marinheiro", description: "Acesso técnico resistente, produzido com atenção à segurança.", image: escadaMarinheiroAsset.url },
  { name: "Coberturas metálicas", description: "Proteção e resistência com estrutura adequada a cada obra.", image: coberturaAsset.url },
  { name: "Guarda-corpos", description: "Segurança, acabamento e durabilidade em ferro ou aço inox.", image: guardaCorpoAsset.url },
  { name: "Grelhas", description: "Peças funcionais fabricadas sob medida e com acabamento preciso.", image: gradesAsset.url },
  { name: "Ferro e aço inox", description: "Outras soluções metálicas desenvolvidas conforme cada necessidade.", image: gradeProtecaoAsset.url },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <div className="reveal max-w-3xl"><p className="mb-4 text-xs font-bold uppercase text-primary">{eyebrow}</p><h2 className="font-display steel-sheen text-5xl font-extrabold uppercase leading-none sm:text-6xl lg:text-8xl">{title}</h2>{intro && <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">{intro}</p>}</div>;
}

function ContactForm() {
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || name.length > 100 || !phone || phone.length > 30 || !service || !message || message.length > 1200 || (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255))) {
      setError("Revise os campos obrigatórios e tente novamente.");
      return;
    }
    const text = `Olá, PEH Serralheria! Gostaria de solicitar um orçamento.\n\nNome: ${name}\nTelefone: ${phone}\nE-mail: ${email || "Não informado"}\nServiço: ${service}\nProjeto: ${message}`;
    window.open(`https://wa.me/5511967411274?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setError("");
    formRef.current?.reset();
  };
  const field = "min-h-12 w-full rounded-md border border-input bg-background/55 px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground";
  return <form ref={formRef} onSubmit={submit} className="metallic-border rounded-xl bg-surface/65 p-5 sm:p-8" noValidate>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-medium">Nome *<input name="name" maxLength={100} required className={`${field} mt-2`} autoComplete="name" /></label>
      <label className="text-sm font-medium">Telefone / WhatsApp *<input name="phone" maxLength={30} required className={`${field} mt-2`} inputMode="tel" autoComplete="tel" /></label>
      <label className="text-sm font-medium">E-mail<input name="email" type="email" maxLength={255} className={`${field} mt-2`} autoComplete="email" /></label>
      <label className="text-sm font-medium">Serviço de interesse *<select name="service" required defaultValue="" className={`${field} mt-2`}><option value="" disabled>Selecione um serviço</option>{services.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
    </div>
    <label className="mt-5 block text-sm font-medium">Mensagem / descrição do projeto *<textarea name="message" required maxLength={1200} rows={5} className={`${field} mt-2 py-3 resize-y`} /></label>
    {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
    <Button type="submit" className="mt-6 w-full sm:w-auto"><MessageCircle size={18} aria-hidden="true" />Solicitar orçamento</Button>
  </form>;
}

function Index() {
  useReveal();
  return <div className="min-h-screen overflow-x-clip bg-background text-foreground">
    <SiteHeader />
    <main>
      <section id="home" className="relative flex min-h-[92vh] scroll-mt-20 items-end overflow-hidden border-b border-metallic/20">
        <img src={heroAsset.url} alt="Profissional da PEH Serralheria executando soldagem em estrutura metálica" className="absolute inset-0 h-full w-full object-cover object-[58%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_88%,transparent)_42%,color-mix(in_oklab,var(--background)_25%,transparent)_100%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-36 lg:px-8 lg:pb-20">
          <div className="max-w-3xl animate-fade-in">
            <p className="mb-5 text-xs font-bold uppercase text-primary">Há 15 anos construindo confiança</p>
            <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.88] sm:text-7xl lg:text-9xl"><span className="steel-sheen">PEH</span><br />Serralheria</h1>
            <p className="mt-7 max-w-2xl text-xl font-semibold leading-snug sm:text-2xl">Soluções metálicas com experiência, segurança e precisão.</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">Há 15 anos, a PEH Serralheria desenvolve e executa soluções em estruturas metálicas para diferentes necessidades, reunindo experiência de obra, conhecimento técnico e compromisso com cada projeto.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><Button asChild><a href="#contato">Solicitar orçamento <ArrowRight size={18} /></a></Button><Button asChild variant="secondary"><a href="#servicos">Conheça nossos serviços</a></Button><Button asChild variant="ghost"><a href="https://wa.me/5511967411274" target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a></Button></div>
          </div>
        </div>
      </section>

      <section id="sobre" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionTitle eyebrow="Experiência que sustenta cada projeto" title="Sobre nós" />
          <div className="reveal text-base leading-8 text-muted-foreground"><p>A PEH Serralheria atua há 15 anos no mercado, desenvolvendo e executando soluções em estruturas metálicas para diferentes projetos.</p><p className="mt-5">À frente da empresa, são 31 anos de experiência no segmento, unindo conhecimento técnico, experiência de obra e atenção a cada etapa da execução.</p><p className="mt-5">Mais do que fabricar estruturas, buscamos entender o projeto, planejar sua execução e entregar um trabalho com qualidade, segurança e precisão.</p></div>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl gap-4 md:grid-cols-3">
          {[{value:"15+", label:"Anos de mercado"},{value:"31", label:"Anos de experiência no segmento"},{value:"3", label:"Pilares: qualidade, segurança e precisão"}].map((item) => <article key={item.label} className="reveal metallic-border rounded-xl bg-surface/45 p-7 sm:p-9"><strong className="font-display text-6xl text-primary sm:text-7xl">{item.value}</strong><p className="mt-3 max-w-xs text-sm font-semibold uppercase leading-6 text-foreground">{item.label}</p></article>)}
        </div>
      </section>

      <div className="section-rule mx-auto h-px max-w-7xl" />
      <section id="servicos" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Do projeto à execução" title="Serviços" intro="Soluções metálicas desenvolvidas para cada necessidade." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map((service) => <article key={service.name} className="reveal group overflow-hidden rounded-xl border border-metallic/25 bg-card"><div className="aspect-[4/3] overflow-hidden"><img src={service.image} alt={service.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /></div><div className="p-5"><h3 className="text-lg font-bold">{service.name}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{service.description}</p><a href="#contato" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase text-primary">Solicitar orçamento <ArrowRight size={15} /></a></div></article>)}</div>
          <p className="reveal mx-auto mt-12 max-w-3xl text-center text-base leading-8 text-muted-foreground">Cada projeto é avaliado de acordo com suas características e necessidades, buscando uma execução técnica, segura e de qualidade.</p>
        </div>
      </section>

      <section id="seguranca" className="scroll-mt-20 border-y border-metallic/20 bg-surface/35 px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start"><div><SectionTitle eyebrow="Responsabilidade em obra" title="Segurança" intro="Segurança faz parte de cada etapa do trabalho." /><div className="reveal mt-9 space-y-5 text-base leading-8 text-muted-foreground"><p>Na PEH, a execução dos serviços envolve não apenas qualidade e experiência, mas também cuidados e procedimentos voltados à segurança da equipe e da obra.</p><p>Contamos com documentação e certificações relacionadas à segurança do trabalho, além do uso adequado de EPIs e procedimentos necessários para a realização das atividades.</p><p>Nosso compromisso é executar cada projeto com responsabilidade, segurança e profissionalismo.</p></div></div>
          <div className="grid gap-4 sm:grid-cols-2">{[{icon:HardHat,title:"EPIs"},{icon:ShieldCheck,title:"Procedimentos de segurança"},{icon:FileCheck2,title:"Documentação"},{icon:Sparkles,title:"Certificações"},{icon:CheckCircle2,title:"Responsabilidade na execução"}].map(({icon:Icon,title}, index) => <article key={title} className={`reveal metallic-border rounded-xl bg-background/55 p-6 ${index === 4 ? "sm:col-span-2" : ""}`}><Icon className="text-primary" size={28} aria-hidden="true" /><h3 className="mt-5 font-semibold">{title}</h3></article>)}</div>
        </div>
      </section>

      <section id="contato" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><SectionTitle eyebrow="Vamos conversar" title="Contato" intro="Conte o que você precisa. A PEH avalia as características do projeto para preparar seu orçamento." /><div className="reveal mt-9 space-y-4"><a href="https://wa.me/5511967411274" target="_blank" rel="noreferrer" className="metallic-border flex items-center gap-4 rounded-lg p-5 transition hover:border-primary"><MessageCircle className="text-primary" /><span><small className="block text-muted-foreground">Celular / WhatsApp</small><strong>(11) 96741-1274</strong></span></a><a href="tel:+551125532623" className="metallic-border flex items-center gap-4 rounded-lg p-5 transition hover:border-primary"><Phone className="text-primary" /><span><small className="block text-muted-foreground">Telefone fixo</small><strong>(11) 2553-2623</strong></span></a></div></div><div className="reveal"><ContactForm /></div></div></section>
    </main>
    <SiteFooter />
    <a href="https://wa.me/5511967411274" target="_blank" rel="noreferrer" aria-label="Solicitar orçamento pelo WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition hover:-translate-y-1"><MessageCircle aria-hidden="true" /></a>
  </div>;
}