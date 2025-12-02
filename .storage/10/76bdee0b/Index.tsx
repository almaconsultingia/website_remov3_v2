import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type Lang = 'es' | 'cat';

const WHATSAPP_NUMBER_DISPLAY = '+34 664 89 20 20';
const WHATSAPP_NUMBER_WA = '34664892020';
const EMAIL = 're:mov3@gmail.com';
const RESERVAR_URL = 'https://calendly.com/demo-remov3';

const texts = {
  es: {
    menu: {
      servicios: 'Servicios',
      como: 'Cómo funciona',
      quien: 'Quién soy',
      testimonios: 'Testimonios',
      contacto: 'Contacto',
      reservar: 'Reservar',
    },
    hero: {
      title: 'REMOV:3',
      subtitle: 'Readaptación y rendimiento',
      desc:
        'Fisioterapia especializada en readaptación. Fuerza y formación para volver mejor y más fuerte.',
      cta: 'Reservar',
      whatsapp: 'WhatsApp',
    },
    tagline: 'Readaptación · Entrenamiento de fuerza · Formación',
    servicios: {
      title: 'Servicios',
      items: [
        { t: 'Readaptación de lesiones', d: 'Procesos guiados y progresivos para volver con seguridad.' },
        { t: 'Entrenamiento de fuerza', d: 'Planificación personalizada y control de cargas.' },
        { t: 'Formación', d: 'Sesiones y workshops sobre readaptación y fuerza.' },
      ],
    },
    como: {
      title: 'Cómo funciona',
      steps: [
        { t: 'Evaluación', d: 'Historia clínica, pruebas funcionales y objetivos.' },
        { t: 'Plan personalizado', d: 'Fases claras y métricas objetivas.' },
        { t: 'Seguimiento', d: 'Ajustes según respuesta y disponibilidad.' },
      ],
    },
    quien: {
      title: 'Quién soy',
      lead:
        'Fisioterapeuta especializado en readaptación con enfoque en fuerza, control y transferencia al gesto.',
    },
    testimonios: {
      title: 'Testimonios',
      items: [
        { t: 'Volví mejor que antes', d: 'Programa claro y medible. Sin miedo al volver a entrenar.' },
        { t: 'Calidad y criterio', d: 'Se nota la experiencia en readaptación y el enfoque en fuerza.' },
      ],
    },
    contacto: {
      title: 'Contacto',
      whatsapp: 'WhatsApp',
      email: 'Email',
      reservar: 'Reservar',
      note: `Número: ${WHATSAPP_NUMBER_DISPLAY} · Email: ${EMAIL}`,
    },
  },
  cat: {
    menu: {
      servicios: 'Serveis',
      como: 'Com funciona',
      quien: 'Qui sóc',
      testimonios: 'Testimonis',
      contacto: 'Contacte',
      reservar: 'Reservar',
    },
    hero: {
      title: 'REMOV:3',
      subtitle: 'Readaptació i rendiment',
      desc:
        'Fisioteràpia especialitzada en readaptació. Força i formació per tornar millor i més fort.',
      cta: 'Reservar',
      whatsapp: 'WhatsApp',
    },
    tagline: 'Readaptació · Entrenament de força · Formació',
    servicios: {
      title: 'Serveis',
      items: [
        { t: 'Readaptació de lesions', d: 'Processos guiats i progressius per tornar amb seguretat.' },
        { t: 'Entrenament de força', d: 'Planificació personalitzada i control de càrregues.' },
        { t: 'Formació', d: 'Sessions i tallers sobre readaptació i força.' },
      ],
    },
    como: {
      title: 'Com funciona',
      steps: [
        { t: 'Avaluació', d: 'Història clínica, proves funcionals i objectius.' },
        { t: 'Pla personalitzat', d: 'Fases clares i mètriques objectives.' },
        { t: 'Seguiment', d: 'Ajustos segons resposta i disponibilitat.' },
      ],
    },
    quien: {
      title: 'Qui sóc',
      lead:
        "Fisioterapeuta especialitzat en readaptació amb enfoc en força, control i transferència al gest.",
    },
    testimonios: {
      title: 'Testimonis',
      items: [
        { t: 'Vaig tornar millor que abans', d: 'Programa clar i mesurable. Sense por al tornar a entrenar.' },
        { t: 'Qualitat i criteri', d: "Es nota l'experiència en readaptació i l'enfoc en força." },
      ],
    },
    contacto: {
      title: 'Contacte',
      whatsapp: 'WhatsApp',
      email: 'Email',
      reservar: 'Reservar',
      note: `Número: ${WHATSAPP_NUMBER_DISPLAY} · Email: ${EMAIL}`,
    },
  },
} as const;

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Landing() {
  const [lang, setLang] = useState<Lang>('es');
  const t = useMemo(() => texts[lang], [lang]);

  const [form, setForm] = useState({
    nom: '',
    email: '',
    telefon: '',
    missatge: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.missatge) {
      alert('Si us plau, completa els camps requerits (*)');
      return;
    }
    alert('Missatge enviat. Et contactarem aviat.');
    setForm({ nom: '', email: '', telefon: '', missatge: '' });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-zinc-200">
        <div className="container-max flex items-center gap-4 py-3">
          {/* Logo + tagline */}
          <div className="flex flex-col">
            <div className="font-bold tracking-tight text-lg md:text-xl">RE:MOV3</div>
            <div className="logo-tagline">{t.tagline}</div>
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-4 ml-6">
            <button className="nav-link" onClick={() => scrollToId('servicios')}>
              {t.menu.servicios}
            </button>
            <button className="nav-link" onClick={() => scrollToId('como')}>
              {t.menu.como}
            </button>
            <button className="nav-link" onClick={() => scrollToId('quien')}>
              {t.menu.quien}
            </button>
            <button className="nav-link" onClick={() => scrollToId('testimonios')}>
              {t.menu.testimonios}
            </button>
            <button className="nav-link" onClick={() => scrollToId('contacto')}>
              {t.menu.contacto}
            </button>
          </div>

          <div className="flex-1" />

          {/* Language selector */}
          <div className="flex items-center gap-3">
            <Select value={lang} onValueChange={(val) => setLang(val as Lang)}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="cat">CAT</SelectItem>
              </SelectContent>
            </Select>

            {/* Reservar */}
            <a
              href={RESERVAR_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex"
            >
              <Button className="btn-primary">{t.menu.reservar}</Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative min-h-[80vh] md:min-h-[85vh] overflow-hidden">
        <video
          className="hero-video"
          src="/assets/hero.mp4"
          poster="/assets/ref-2.png"
          muted
          autoPlay
          loop
          playsInline
        />
        <div className="hero-overlay" />
        <div className="relative container-max flex min-h-[80vh] md:min-h-[85vh] items-center">
          <div className="max-w-2xl py-16">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">REMOV:3</h1>
            <p className="mt-3 text-xl md:text-2xl text-zinc-700">{t.hero.subtitle}</p>
            <p className="mt-4 text-base md:text-lg text-zinc-600">
              {t.hero.desc}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={RESERVAR_URL} target="_blank" rel="noreferrer">
                <Button className="btn-primary">{t.hero.cta}</Button>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER_WA}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="btn-outline">
                  {t.hero.whatsapp}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="container-max py-14 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold">{t.servicios.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.servicios.items.map((s) => (
            <Card key={s.t} className="border border-zinc-200">
              <CardHeader>
                <CardTitle className="text-xl">{s.t}</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">{s.d}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="container-max" />

      {/* Cómo funciona */}
      <section id="como" className="container-max py-14 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold">{t.como.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.como.steps.map((s) => (
            <Card key={s.t} className="border border-zinc-200">
              <CardHeader>
                <CardTitle className="text-xl">{s.t}</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">{s.d}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="container-max" />

      {/* Quién soy */}
      <section id="quien" className="container-max py-14 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold">{t.quien.title}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="border border-zinc-200">
            <CardContent className="pt-6 text-zinc-600">
              {t.quien.lead}
            </CardContent>
          </Card>
          <Card className="border border-zinc-200 overflow-hidden">
            <CardContent className="p-0">
              <img
                src="/assets/ref-1.png"
                alt="Referente visual REMOV:3"
                className="w-full h-64 md:h-full object-cover"
                loading="lazy"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="container-max" />

      {/* Testimonios */}
      <section id="testimonios" className="container-max py-14 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold">{t.testimonios.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {t.testimonios.items.map((s, idx) => (
            <Card key={s.t} className="border border-zinc-200">
              <CardHeader>
                <CardTitle className="text-xl">{s.t}</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600 flex items-start gap-4">
                <img
                  src={`/assets/ref-${idx + 2}.png`}
                  alt="Referencia"
                  className="w-16 h-16 object-cover rounded"
                  loading="lazy"
                />
                <span>{s.d}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="container-max" />

      {/* Contacto - nuevo diseño en dos columnas */}
      <section id="contacto" className="container-max py-14 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold">{t.contacto.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Columna izquierda: Información */}
          <Card className="border border-zinc-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Informació</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-zinc-600">
                Omple el formulari o contacta amb nosaltres directament per començar el teu camí cap a la recuperació.
              </p>

              {/* Dirección */}
              <div className="flex items-start gap-3 text-zinc-700">
                {/* Icono ubicación */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 text-zinc-800"
                >
                  <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 1 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <div className="font-medium">Carrer de la Pau, 123, 08000 Barcelona</div>
                </div>
              </div>

              <Separator />

              {/* Otras vías */}
              <div>
                <div className="text-sm font-medium text-zinc-700">Altres vies</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER_WA}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="bg-green-600 text-white hover:bg-green-700">
                      Escriu per WhatsApp
                    </Button>
                  </a>
                  <a href={`mailto:${EMAIL}`} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="btn-outline bg-white">
                      Enviar correu
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Columna derecha: Formulario */}
          <Card className="border border-zinc-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Formulari de contacte</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom*</Label>
                  <Input
                    id="nom"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    placeholder="El teu nom"
                    className="bg-zinc-100 border border-zinc-300 rounded-md"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="tu@correu.com"
                    className="bg-zinc-100 border border-zinc-300 rounded-md"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefon">Telèfon</Label>
                  <Input
                    id="telefon"
                    type="tel"
                    value={form.telefon}
                    onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                    placeholder="+34 6XX XX XX XX"
                    className="bg-zinc-100 border border-zinc-300 rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="missatge">Missatge*</Label>
                  <Textarea
                    id="missatge"
                    value={form.missatge}
                    onChange={(e) => setForm({ ...form, missatge: e.target.value })}
                    placeholder="Explica'ns el teu cas"
                    className="bg-zinc-100 border border-zinc-300 rounded-md min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="btn-primary">
                  <span className="mr-2">Enviar missatge</span>
                  {/* Icono enviar */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200">
        <div className="container-max py-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} REMOV:3 · {t.tagline}
        </div>
      </footer>
    </div>
  );
}