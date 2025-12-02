import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type Lang = 'es' | 'cat';

const WHATSAPP_NUMBER_DISPLAY = '+34 664 89 20 20';
const WHATSAPP_NUMBER_WA = '34664892020';
const EMAIL = 'remov3@gmail.com';
const RESERVAR_URL = 'https://calendly.com/demo-remov3';

const texts = {
  es: {
    menu: {
      servicios: 'Servicios',
      como: 'Metodología',
      quien: 'Quién soy',
      testimonios: 'Testimonios',
      contacto: 'Contacto',
      reservar: 'Reservar',
    },
    hero: {
      title: 'RE:MOV3',
      subtitle: 'Readaptación y rendimiento',
      desc:
        'Fisioterapia especializada en readaptación. Entrenos de Fuerza para mujeres y formación para profesionales.',
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
      cta: 'Reservar servicios',
    },
    como: {
      title: 'Metodología',
      steps: [
        { t: 'Evaluación', d: 'Historia clínica, pruebas funcionales y objetivos.' },
        { t: 'Plan personalizado', d: 'Fases claras y métricas objetivas.' },
        { t: 'Seguimiento', d: 'Ajustes según respuesta y disponibilidad.' },
      ],
    },
    quien: {
      title: 'Quién soy',
    },
    testimonios: {
      title: 'Testimonios',
      items: [
        { t: 'Volví mejor que antes', d: 'Programa claro y medible. Sin miedo al volver a entrenar.' },
        { t: 'Calidad y criterio', d: 'Se nota la experiencia en readaptación y el enfoque en fuerza.' },
        { t: 'Acompañamiento excelente', d: 'Seguimiento constante y decisiones con criterio.' },
      ],
    },
    contacto: {
      title: 'Contacto',
      info_title: 'Información',
      lead: 'Rellena el formulario o contáctanos directamente para empezar tu camino hacia la recuperación.',
      other_title: 'Otras vías',
      whatsapp_btn: 'Escribir por WhatsApp',
      email_btn: 'Enviar correo',
      form_title: 'Formulario de contacto',
      labels: { nombre: 'Nombre*', email: 'Email*', telefono: 'Teléfono', mensaje: 'Mensaje*' },
      submit_btn: 'Enviar mensaje',
      required_msg: 'Por favor, completa los campos requeridos (*)',
      note: `Número: ${WHATSAPP_NUMBER_DISPLAY} · Email: ${EMAIL}`,
    },
    footer: {
      left_tagline: 'readaptación · entrenamiento mujeres · formación',
      contacto: 'Contacto',
      rrss: 'RRSS',
      instagram: 'Instagram',
      copyright: '© 2025 RE:MOV3 · Adrià Vidal Noguera',
      address: 'Carrer de la Pau, 123, 08000 Barcelona',
    },
  },
  cat: {
    menu: {
      servicios: 'Serveis',
      como: 'Metodologia',
      quien: 'Qui sóc',
      testimonios: 'Testimonis',
      contacto: 'Contacte',
      reservar: 'Reservar',
    },
    hero: {
      title: 'RE:MOV3',
      subtitle: 'Readaptació i rendiment',
      desc:
        'Fisioteràpia especialitzada en readaptació. Entrenaments de força per a dones i formació per a professionals.',
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
      cta: 'Reservar serveis',
    },
    como: {
      title: 'Metodologia',
      steps: [
        { t: 'Avaluació', d: 'Història clínica, proves funcionals i objectius.' },
        { t: 'Pla personalitzat', d: 'Fases clares i mètriques objectives.' },
        { t: 'Seguiment', d: 'Ajustos segons resposta i disponibilitat.' },
      ],
    },
    quien: {
      title: 'Qui sóc',
    },
    testimonios: {
      title: 'Testimonis',
      items: [
        { t: 'Vaig tornar millor que abans', d: 'Programa clar i mesurable. Sense por al tornar a entrenar.' },
        { t: 'Qualitat i criteri', d: "Es nota l'experiència en readaptació i l'enfoc en força." },
        { t: 'Acompanyament excel·lent', d: 'Seguiment constant i decisions amb criteri.' },
      ],
    },
    contacto: {
      title: 'Contacte',
      info_title: 'Informació',
      lead: 'Omple el formulari o contacta amb nosaltres directament per començar el teu camí cap a la recuperació.',
      other_title: 'Altres vies',
      whatsapp_btn: 'Escriu per WhatsApp',
      email_btn: 'Enviar correu',
      form_title: 'Formulari de contacte',
      labels: { nombre: 'Nom*', email: 'Email*', telefono: 'Telèfon', mensaje: 'Missatge*' },
      submit_btn: 'Enviar missatge',
      required_msg: 'Si us plau, completa els camps requerits (*)',
      note: `Número: ${WHATSAPP_NUMBER_DISPLAY} · Email: ${EMAIL}`,
    },
    footer: {
      left_tagline: 'readaptació · entrenament dones · formació',
      contacto: 'Contacte',
      rrss: 'Xarxes',
      instagram: 'Instagram',
      copyright: '© 2025 RE:MOV3 · Adrià Vidal Noguera',
      address: 'Carrer de la Pau, 123, 08000 Barcelona',
    },
  },
} as const;

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function IndexPage() {
  const [lang, setLang] = useState<Lang>('es');
  const t = useMemo(() => texts[lang], [lang]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [form, setForm] = useState({
    nom: '',
    email: '',
    telefon: '',
    missatge: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.missatge) {
      alert(t.contacto.required_msg);
      return;
    }
    alert(lang === 'es' ? 'Mensaje enviado. Te contactaremos pronto.' : 'Missatge enviat. Et contactarem aviat.');
    setForm({ nom: '', email: '', telefon: '', missatge: '' });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Navbar - versión clara */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-zinc-200">
        <div className="container-max flex items-center gap-4 py-3">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div className="font-bold tracking-tight text-lg md:text-xl text-zinc-900">RE:MOV3</div>
            <div className="hidden md:block text-xs md:text-sm text-zinc-500">{t.tagline}</div>
          </div>

          {/* Desktop menu: sin cambios funcionales, solo estilos claros (≥ md) */}
          <div className="hidden md:flex items-center gap-3 ml-6 flex-nowrap whitespace-nowrap">
            <button
              className="text-sm lg:text-base font-semibold text-zinc-900 hover:text-zinc-700"
              onClick={() => scrollToId('servicios')}
            >
              {t.menu.servicios}
            </button>
            <button
              className="text-sm lg:text-base font-semibold text-zinc-900 hover:text-zinc-700"
              onClick={() => scrollToId('como')}
            >
              {t.menu.como}
            </button>
            <button
              className="text-sm lg:text-base font-semibold text-zinc-900 hover:text-zinc-700"
              onClick={() => scrollToId('quien')}
            >
              {t.menu.quien}
            </button>
            <button
              className="text-sm lg:text-base font-semibold text-zinc-900 hover:text-zinc-700"
              onClick={() => scrollToId('testimonios')}
            >
              {t.menu.testimonios}
            </button>
            <button
              className="text-sm lg:text-base font-semibold text-zinc-900 hover:text-zinc-700"
              onClick={() => scrollToId('contacto')}
            >
              {t.menu.contacto}
            </button>
          </div>

          <div className="flex-1" />

          {/* Language toggle + Reservar */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex rounded-full border border-zinc-300 bg-white overflow-hidden">
              <button
                aria-pressed={lang === 'es'}
                onClick={() => setLang('es')}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  lang === 'es' ? 'font-semibold text-zinc-900' : 'text-zinc-500'
                }`}
              >
                ES
              </button>
              <span className="w-px bg-zinc-300" aria-hidden="true" />
              <button
                aria-pressed={lang === 'cat'}
                onClick={() => setLang('cat')}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  lang === 'cat' ? 'font-semibold text-zinc-900' : 'text-zinc-500'
                }`}
              >
                CAT
              </button>
            </div>

            <a href={RESERVAR_URL} target="_blank" rel="noreferrer" className="hidden md:inline-flex">
              <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800">{t.menu.reservar}</Button>
            </a>

            {/* Botón hamburguesa: sólo móvil ≤ md */}
            <button
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-300 text-zinc-900 hover:bg-zinc-100"
            >
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
              >
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable (versión clara) */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            role="menu"
            aria-label="Menú principal"
            className="md:hidden border-t border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
          >
            <div className="container-max py-2">
              <ul className="flex flex-col gap-1">
                <li>
                  <button
                    role="menuitem"
                    className="w-full text-left px-3 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100 rounded-xl"
                    onClick={() => {
                      scrollToId('servicios');
                      setMobileOpen(false);
                    }}
                  >
                    {t.menu.servicios}
                  </button>
                </li>
                <li>
                  <button
                    role="menuitem"
                    className="w-full text-left px-3 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100 rounded-xl"
                    onClick={() => {
                      scrollToId('como');
                      setMobileOpen(false);
                    }}
                  >
                    {t.menu.como}
                  </button>
                </li>
                <li>
                  <button
                    role="menuitem"
                    className="w-full text-left px-3 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100 rounded-xl"
                    onClick={() => {
                      scrollToId('quien');
                      setMobileOpen(false);
                    }}
                  >
                    {t.menu.quien}
                  </button>
                </li>
                <li>
                  <button
                    role="menuitem"
                    className="w-full text-left px-3 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100 rounded-xl"
                    onClick={() => {
                      scrollToId('testimonios');
                      setMobileOpen(false);
                    }}
                  >
                    {t.menu.testimonios}
                  </button>
                </li>
                <li>
                  <button
                    role="menuitem"
                    className="w-full text-left px-3 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100 rounded-xl"
                    onClick={() => {
                      scrollToId('contacto');
                      setMobileOpen(false);
                    }}
                  >
                    {t.menu.contacto}
                  </button>
                </li>

                {/* Acciones útiles también en móvil */}
                <li className="mt-1 flex gap-2 px-3">
                  <a href={RESERVAR_URL} target="_blank" rel="noreferrer" className="flex-1">
                    <Button className="w-full rounded-full bg-zinc-900 text-white hover:bg-zinc-800">{t.menu.reservar}</Button>
                  </a>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER_WA}`} target="_blank" rel="noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full rounded-full border-zinc-300 text-zinc-900 hover:bg-zinc-100">
                      WhatsApp
                    </Button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Hero - versión clara */}
      <section id="hero" className="relative min-h-[80vh] md:min-h-[85vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/hero.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
        />
        {/* overlay clara para mejorar legibilidad */}
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative container-max flex min-h-[80vh] md:min-h-[85vh] items-center justify-center">
          <div className="max-w-2xl py-16 text-center mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900">RE:MOV3</h1>
            <p className="mt-3 text-xl md:text-2xl text-zinc-700">{t.hero.subtitle}</p>
            <p className="mt-4 text-base md:text-lg text-zinc-600">
              {t.hero.desc}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={RESERVAR_URL} target="_blank" rel="noreferrer">
                <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800">{t.hero.cta}</Button>
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER_WA}`} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-full border-zinc-300 text-zinc-900 hover:bg-zinc-100">
                  {t.hero.whatsapp}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios - versión clara */}
      <section id="servicios" className="container-max py-14 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">{t.servicios.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.servicios.items.map((s) => (
            <Card key={s.t} className="bg-white border border-zinc-200 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-zinc-900">{s.t}</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">{s.d}</CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a href={RESERVAR_URL} target="_blank" rel="noreferrer">
            <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800">{t.servicios.cta}</Button>
          </a>
        </div>
      </section>

      <Separator className="container-max bg-zinc-200" />

      {/* Metodología - versión clara */}
      <section id="como" className="container-max py-14 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">{t.como.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.como.steps.map((s, idx) => (
            <Card key={s.t} className="bg-white border border-zinc-200 rounded-xl shadow-sm">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 font-semibold">
                  {idx + 1}
                </div>
                <CardTitle className="text-xl font-semibold text-zinc-900">{s.t}</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-600">{s.d}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="container-max bg-zinc-200" />

      {/* Testimonios - nueva sección (versión clara, todo redondeado) */}
      <section id="testimonios" className="bg-zinc-50 text-zinc-900">
        <div className="container-max py-14 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.testimonios.title}</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {t.testimonios.items.map((item, i) => (
              <Card key={item.t} className="bg-white border border-zinc-200 rounded-xl shadow-sm">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-500">
                    {/* 5 estrellas visuales */}
                    {[...Array(5)].map((_, idx) => (
                      <svg
                        key={idx}
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="inline-block"
                      >
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                      </svg>
                    ))}
                  </div>
                  <CardTitle className="text-lg font-semibold text-zinc-900">{item.t}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-4 text-zinc-700">
                    <div className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-zinc-400"
                      >
                        <path d="M9 10h.01" />
                        <path d="M15 10h.01" />
                        <path d="M12 15c-2 0-3.5-1.5-3.5-3.5v-1.5h7v1.5c0 2-1.5 3.5-3.5 3.5z" />
                      </svg>
                      <p className="leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="container-max bg-zinc-200" />

      {/* Quién soy - texto izquierda, imagen derecha, versión clara */}
      <section id="quien" className="bg-zinc-50 text-zinc-900">
        <div className="container-max py-14 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.quien.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 items-center">
            {/* Izquierda: descripción */}
            <div>
              <p className="text-zinc-700 text-base md:text-lg leading-relaxed">
                Fisioterapeuta especializado en readaptación con un enfoque práctico y basado en la fuerza.
                Trabajo la progresión desde el control del movimiento hasta la transferencia al gesto deportivo,
                utilizando métricas objetivas para tomar decisiones y reducir la incertidumbre durante el proceso.
              </p>
              <p className="mt-4 text-zinc-600 text-sm md:text-base leading-relaxed">
                Acompaño a pacientes y deportistas en la vuelta segura a la actividad, integrando evaluación,
                planificación por fases y seguimiento constante. Mi objetivo es que recuperes tu rendimiento con
                criterio, confianza y sin dejar de lado lo que más te gusta hacer.
              </p>
            </div>

            {/* Derecha: imagen adjunta */}
            <div className="overflow-hidden rounded-xl ring-1 ring-zinc-200">
              <img
                src="/assets/fisio.jpg"
                alt="Fisioterapeuta en sesión - imagen adjunta"
                className="w-full h-[420px] md:h-[520px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Separator className="container-max bg-zinc-200" />

      {/* Contacto - versión clara */}
      <section id="contacto" className="container-max py-14 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">{t.contacto.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Columna izquierda: Información */}
          <Card className="bg-white border border-zinc-200 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-zinc-900">{t.contacto.info_title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <p className="text-zinc-700">
                {t.contacto.lead}
              </p>

              {/* Dirección */}
              <div className="flex items-start gap-3 text-zinc-800">
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
                  className="mt-0.5 text-zinc-700"
                >
                  <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 1 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <div className="font-medium">Carrer de la Pau, 123, 08000 Barcelona</div>
                </div>
              </div>

              <Separator className="bg-zinc-200" />

              {/* Otras vías / Altres vies */}
              <div>
                <div className="text-sm font-medium text-zinc-700">{t.contacto.other_title}</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER_WA}`} target="_blank" rel="noreferrer">
                    <Button className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
                      {t.contacto.whatsapp_btn}
                    </Button>
                  </a>
                  <a href={`mailto:${EMAIL}`} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="rounded-full border-zinc-300 text-zinc-900 hover:bg-zinc-100">
                      {t.contacto.email_btn}
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Columna derecha: Formulario */}
          <Card className="bg-white border border-zinc-200 rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-zinc-900">{t.contacto.form_title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-zinc-900">{t.contacto.labels.nombre}</Label>
                  <Input
                    id="nom"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    placeholder={lang === 'es' ? 'Tu nombre' : 'El teu nom'}
                    className="bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-500 rounded-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-900">{t.contacto.labels.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={lang === 'es' ? 'tu@correo.com' : 'tu@correu.com'}
                    className="bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-500 rounded-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefon" className="text-zinc-900">{t.contacto.labels.telefono}</Label>
                  <Input
                    id="telefon"
                    type="tel"
                    value={form.telefon}
                    onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                    placeholder="+34 6XX XX XX XX"
                    className="bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-500 rounded-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="missatge" className="text-zinc-900">{t.contacto.labels.mensaje}</Label>
                  <Textarea
                    id="missatge"
                    value={form.missatge}
                    onChange={(e) => setForm({ ...form, missatge: e.target.value })}
                    placeholder={lang === 'es' ? 'Cuéntanos tu caso' : "Explica'ns el teu cas"}
                    className="bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-500 rounded-xl min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
                  <span className="mr-2">{t.contacto.submit_btn}</span>
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
                    className="text-white"
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

      {/* Footer claro */}
      <footer className="bg-white text-zinc-800 mt-0">
        <div className="container-max py-10 grid gap-8 md:grid-cols-3">
          {/* Izquierda */}
          <div>
            <div className="text-xl font-bold">RE:MOV3</div>
            <p className="mt-2 text-sm text-zinc-500">
              {lang === 'es' ? texts.es.footer.left_tagline : texts.cat.footer.left_tagline}
            </p>
          </div>

          {/* Centro */}
          <div>
            <div className="text-xl font-semibold">
              {lang === 'es' ? texts.es.footer.contacto : texts.cat.footer.contacto}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>
                <a href="tel:+34664892020" className="hover:text-zinc-900">
                  {WHATSAPP_NUMBER_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-zinc-900">
                  {EMAIL}
                </a>
              </li>
              <li>{lang === 'es' ? texts.es.footer.address : texts.cat.footer.address}</li>
            </ul>
          </div>

          {/* Derecha */}
          <div>
            <div className="text-xl font-semibold">
              {lang === 'es' ? texts.es.footer.rrss : texts.cat.footer.rrss}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>
                <a
                  href="https://www.instagram.com/remov3training/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-900"
                >
                  {lang === 'es' ? texts.es.footer.instagram : texts.cat.footer.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-max border-t border-zinc-200 pt-6 pb-10 text-center text-xs text-zinc-500">
          {lang === 'es' ? texts.es.footer.copyright : texts.cat.footer.copyright}
        </div>
      </footer>
    </div>
  );
}

export default IndexPage;