import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type Lang = 'es' | 'cat';

const WHATSAPP_NUMBER_DISPLAY = '+34 602 44 86 35';
const WHATSAPP_NUMBER_WA = '34602448635';
const EMAIL = 'almaxremov3@gmail.com';
// Botón único de reserva para cualquier servicio (cal.com)
const RESERVA_CAL_URL = 'https://cal.com/axrremov/reunion-45-minutos';

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
      subtitle: 'Readaptación · Entrenamento · Formación',
      desc:
        'Tu movimiento, tu ritmo, tu evolución.',
      cta: 'Ver Servicios',
      whatsapp: 'WhatsApp',
    },
    tagline: 'Readaptación · Entrenamiento de fuerza · Formación',
    servicios: {
      title: 'Servicios online',
      planMonthly: 'PLAN MENSUAL',
      planPuntual: 'PLAN PUNTUAL',
      planQuarterly: 'PLAN TRIMESTRAL',
      formacionTitle: 'FORMACIÓN',
      monthToMonth: 'Mes a mes',
      moreInfo: 'Más información',
      moreInfoFormacion: 'Quiero más información sobre las formaciones',
      comingSoon: 'Próximamente',
      plans: [
        {
          t: 'Readaptación 1:1',
          priceMonthly: '150€',
          priceQuarterly: '390€ (130€/mes)',
          quote: 'Servicio premium 1:1 para lesiones de rodilla (LCA y menisco). Plan personalizado con seguimiento semanal.',
          featuresMonthly: [
            'Acompañamiento 1:1 100% online',
            'Plan totalmente personalizado y adaptado',
            'Protocolo completo por fases',
            'Ajustes de carga semanales',
            'Trabajo activo',
            'Videollamada quincenal',
            'Corrección técnica',
          ],
          featuresQuarterly: [
            'Todo lo del mensual',
            '+ Re-test mensual',
            '+ Informe de evolución',
          ],
        },
        {
          t: 'Membresía Women',
          priceMonthly: '79€',
          priceQuarterly: '225€ (75€/mes)',
          quote: 'Entrenamiento híbrido, comunidad y recursos wellness para mujeres.',
          featuresMonthly: [
            'Entreno híbrido',
            'Movilidad',
            'Recursos wellness',
            'Comunidad',
          ],
          featuresQuarterly: [
            'Precio trimestral reducido',
            'Mayor compromiso',
            'Acceso completo',
            'Soporte comunidad',
          ],
        },
        {
          t: 'Formación',
          pricePuntual: '0€',
          priceQuarterly: '0€ (0€/mes)',
          quote: 'Formación para profesionales.',
          featuresPuntual: ['Webinars en vivo', 'Workshops presenciales', 'Cápsulas On-Demand', 'Mentoría Pro'],
          featuresQuarterly: [],
        },
      ],
      cta: 'Reservar cita',
    },
    como: {
      title: 'Metodología',
      sections: [
        {
          t: '100% ACTIVO, 0% PASIVO',
          d:
            'Olvida la camilla. La recuperación real se gana en la sala de entrenamiento. Trabajamos con fuerza, progresiones y movimiento, no con tratamientos que sólo alivian temporalmente.',
        },
        {
          t: 'El ciclo de feedback',
          d:
            'Metodología viva: tú recibes la planificación, la ejecutas y yo reviso tu evolución semanalmente. Ajustamos cargas y tareas constantemente según tu progreso real.',
        },
        {
          t: 'Tecnología y datos',
          d:
            'No adivinamos, medimos. Usamos apps digitales para corregir técnica, almacenar resultados y comparar métricas. Objetividad para saber, sin dudas, si estamos mejorando.',
        },
        {
          t: 'Educación y autonomía',
          d:
            'El objetivo final es que no me necesites. Te explico el “por qué” de cada ejercicio y sensación para que entiendas el proceso y ganes independencia a largo plazo.',
        },
        {
          t: 'Especialización',
          d:
            'Adaptando cada sesión según tu feedback y molestias. Uso tecnología digital (apps de medición) para trackear tu progreso objetivo en tiempo real y ajustar tu plan constantemente. Traduzco la ciencia en explicaciones simples para que entiendas qué te pasa y cómo gestionarlo de forma sostenible.',
        },
      ],
    },
    quien: {
      title: 'Quién soy',
      content: [
        'Llevo más de 7 años trabajando en entrenamiento y readaptación. Estoy especializado en recuperación de lesiones y entrenamiento de fuerza para mujeres.',
        'Mi forma de trabajar nace tanto de la formación como de la experiencia personal. Haber pasado por lesiones graves me enseñó algo que ningún máster explica: los protocolos estándar no siempre funcionan.',
        'La recuperación real necesita un plan personalizado que vaya más allá de lo físico. No se trata solo de recuperar fuerza o movilidad, sino de volver a confiar en el cuerpo y perder el miedo a moverse.',
        'En RE:MOVE3 acompaño procesos de readaptación de forma clara y progresiva, adaptándome a cada persona desde una perspectiva física, funcional y mental.',
        'Readaptación real. Resultados reales. Acompañamiento humano.',
      ],
    },
    testimonios: {
      title: 'Testimonios',
      items: [
        {
          t: 'Anabel',
          d:
            'Empecé a trabajar con Adri aproximadamente 4 meses después de mi operación de LCA, apenas tenía fuerza en la pierna operada y tenía dificultades en acciones cotidianas. Gracias a su acompañamiento en los entrenamientos y en el proceso de recuperación he conseguido recuperar fuerza, movilidad y volver a hacer una vida y unos entrenamientos normales. Muchas gracias por todo!',
        },
        {
          t: 'Joaquim',
          d:
            'Un buen profesional, siempre atento a las necesidades del cliente, con capacidad de adaptación a sus circunstancias cada día y que diseña un plan de trabajo progresivo hacia el objetivo. Gracias por la labor y el acompañamiento.',
        },
        {
          t: 'Jordi',
          d:
            'Después de un año trabajando con Adrià, sólo puedo tener palabras buenas. Es puntual, educado y se adapta siempre a lo que necesitas. Sus planes de entrenamiento son muy buenos y está a tu lado para asegurar que hagas cada ejercicio correctamente y evitar lesiones. Lo recomendaría sin dudar. Ha sido un placer entrenar con él.',
        },
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
      note: {
        number: `Número: ${WHATSAPP_NUMBER_DISPLAY}`,
        email: `Email: ${EMAIL}`,
      }
    },
    footer: {
      left_tagline: 'Readaptación · Entrenamiento mujeres · Formación',
      contacto: 'Contacto',
      rrss: 'RRSS',
      instagram: 'Instagram',
      copyright: `© ${new Date().getFullYear()} RE:MOV3 · Adrià Vidal Noguera`,
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
      subtitle: 'Readaptació · Entrenament · Formació',
      desc:
        'El teu moviment, el teu ritme, la teva evolució.',
      cta: 'Veure Serveis',
      whatsapp: 'WhatsApp',
    },
    tagline: 'Readaptació · Entrenament de força · Formació',
    servicios: {
      title: 'Serveis online',
      planMonthly: 'PLA MENSUAL',
      planPuntual: 'PLA PUNTUAL',
      planQuarterly: 'PLA TRIMESTRAL',
      formacionTitle: 'FORMACIÓ',
      monthToMonth: 'Mes a mes',
      moreInfo: 'Vull informació',
      moreInfoFormacion: 'Vull més informació sobre les formacions',
      comingSoon: 'Pròximament',
      plans: [
        {
          t: 'Readaptació 1:1',
          priceMonthly: '150€',
          priceQuarterly: '390€ (130€/mes)',
          quote: 'Servei premium 1:1 per a lesions de genoll (LCA i menisc). Pla personalitzat amb seguiment setmanal.',
          featuresMonthly: [
            'Acompanyament 1:1',
            'Pla totalment personalitzat i adaptado',
            'Protocol complert per fases',
            'Ajustos de carga setmanals',
            'Treball actiu',
            'Videotrucada quinzenal',
            'Correcció tècnica',
          ],
          featuresQuarterly: [
            'Tot el del mensual',
            '+ Re-test mensual',
            '+ Informe d\'evolució',
          ],
        },
        {
          t: 'Membresía Women',
          priceMonthly: '79€',
          priceQuarterly: '225€ (75€/mes)',
          quote: 'Entrenament híbrid, comunitat i recursos wellness per a dones.',
          featuresMonthly: [
            'Entreno híbrid',
            'Movilitat',
            'Recursos wellness',
            'Comunitat',
          ],
          featuresQuarterly: [
            'Preu trimestral reduït',
            'Més compromís',
            'Accés complet',
            'Suport comunitat',
          ],
        },
        {
          t: 'Formació',
          pricePuntual: '0€',
          priceQuarterly: '0€ (0€/mes)',
          quote: 'Formació per a professionals.',
          featuresPuntual: ['Webinars en viu', 'Workshops presencials', 'Càpsules On-Demand', 'Mentoria Pro'],
          featuresQuarterly: [],
        },
      ],
      cta: 'Reservar cita',
    },
    como: {
      title: 'Metodologia',
      sections: [
        {
          t: '100% ACTIU, 0% PASSIU',
          d:
            "Oblida la llitera. La recuperació real es guanya a la sala d'entrenament. Treballem amb força, progressions i moviment, no amb tractaments que només alleugen temporalment.",
        },
        {
          t: 'El cicle de feedback',
          d:
            "Una metodologia viva: tu reps la planificació, l'executes i jo reviso la teva evolució setmanalment. Ajustem les càrregues i els deures constantment segons el teu progrés real.",
        },
        {
          t: 'Tecnologia i dades',
          d:
            'No endevinem, mesurem. Utilitzem apps digitals per corregir la tècnica, emmagatzemar resultats i comparar mètriques. Objectivitat per saber, sense dubtes, si estem millorant.',
        },
        {
          t: 'Educació i autonomia',
          d:
            "L'objectiu final és que no em necessitis. T'explico el 'per què' de cada exercici i sensació perquè entenguis el procés i guanyis independència a llarg termini.",
        },
        {
          t: 'Especialització',
          d:
            "Aquí no hi ha massatges que només amaguen el problema. Treballo amb exercici progressiu i força real: l'únic camí que reverteix lesions i construeix cossos resilients. Cada sessió s'adapta al teu estat actual. Si avui tens molèsties, ajustem. Si progresses, pugem el nivell.",
        },
      ],
    },
    quien: {
      title: 'Qui sóc',
      content: [
        "Més de 7 anys dedicat a l'entrenament i la readaptació. Especialitzat en recuperació de lesions i entrenament de força per a dones.",
        'Les meves pròpies lesions greus em van ensenyar el que cap màster explica: els protocols estàndard no funcionen. La recuperació real necessita un pla personalitzat que vagi més enllà del físic.',
        "Perquè tornar d'una lesió no és només recuperar força o mobilitat.",
        'És recuperar la confiança. Perdre la por. Sentir que el teu cos torna a ser teu.',
        "A RE:MOV3 ofereixo el que jo hauria volgut tenir en els meus pitjors moments: un pla clar, progressiu i adaptat a tu. Físic, funcional i mental.",
        'Readaptació real. Resultats reals. Acompañament humà.',
      ],
    },
    testimonios: {
      title: 'Testimonis',
      items: [
        {
          t: 'Anabel',
          d: `Vaig començar a treballar amb Adri aproximadament 4 mesos després de la meva operació de LCA, amb prou feines tenia força a la cama operada i tenia dificultats en accions quotidianes. Gràcies al vostre acompanyament en els entrenaments i en el procés de recuperació he aconseguit recuperar força, mobilitat i tornar a fer una vida i uns entrenaments normals. Moltes gràcies per tot!`,
        },
        {
          t: 'Joaquim',
          d: `Un bon professional, sempre atent a les necessitats del client, amb capacitat d'adaptació a les vostres circumstàncies cada dia i que dissenya un pla de treball progressiu cap a l'objectiu. Gràcies per la feina i l'acompanyament`,
        },
        {
          t: 'Jordi',
          d: `Després d'un any treballant amb l'Adrià, només puc tenir bones paraules. És puntual, educat i s'adapta sempre a allò que necessites. Els seus plans d'entrenament són molt bons i és al teu costat per assegurar que facis cada exercici correctament i evitar lesions. Ho recomanaria sense dubtar. Ha estat un plaer entrenar-s'hi.`,
        },
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
      note: {
        number: `Número: ${WHATSAPP_NUMBER_DISPLAY}`,
        email: `Email: ${EMAIL}`,
      }
    },
    footer: {
      left_tagline: 'Readaptació ·  Entrenament dones · Formació',
      contacto: 'Contacte',
      rrss: 'Xarxes',
      instagram: 'Instagram',
      copyright: `© ${new Date().getFullYear()} RE:MOV3 · Adrià Vidal Noguera`,
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
    // Open mail client with prefilled subject and body
    const subject = encodeURIComponent(lang === 'es' ? 'Nuevo mensaje · RE:MOV3' : 'Nou missatge · RE:MOV3');
    const body = encodeURIComponent(
      `${lang === 'es' ? 'Nombre' : 'Nom'}: ${form.nom}\n${lang === 'es' ? 'Email' : 'Email'}: ${form.email}\n${lang === 'es' ? 'Teléfono' : 'Telèfon'}: ${form.telefon}\n\n${form.missatge}`
    );
    // Use mailto to open user's email client
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    alert(lang === 'es' ? 'Mensaje listo para enviar en tu correo.' : "Missatge llest per enviar al teu correu.");
    setForm({ nom: '', email: '', telefon: '', missatge: '' });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Navbar - versión clara */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-zinc-200">
        <div className="container-max flex items-center gap-4 py-3">
          {/* Logo + tagline */}
          <div className="flex flex-col ">
            <div className="font-bold tracking-tight text-lg md:text-xl text-zinc-900">RE:MOV3</div>
            <div className="hidden md:block text-xs  text-zinc-500">{t.tagline}</div>
          </div>

          {/* Desktop menu: orden solicitado */}
          <div className="hidden md:flex items-center gap-3 ml-6 flex-nowrap whitespace-nowrap">
            <button
              className="text-sm lg:text-base font-semibold text-zinc-900 hover:text-zinc-700"
              onClick={() => scrollToId('quien')}
            >
              {t.menu.quien}
            </button>
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

            <Button
              onClick={() => scrollToId('servicios')}
              className="hidden md:inline-flex rounded-full bg-zinc-900 text-white hover:bg-zinc-800"
            >
              {t.hero.cta}
            </Button>

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

        {/* Menú móvil desplegable: orden solicitado */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            role="menu"
            aria-label="Menú principal"
            className="md:hidden fixed inset-x-0 top-[64px] z-50 border-t border-zinc-200 bg-white"
          >
            <div className="container-max py-4">
              <ul className="flex flex-col gap-1">
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
              </ul>

              <div className="mt-4 grid gap-3">
                {/* Language segmented control */}
                <div className="flex w-full rounded-full border border-zinc-200 overflow-hidden">
                  <button
                    aria-pressed={lang === 'es'}
                    onClick={() => { setLang('es'); setMobileOpen(false); }}
                    className={`w-1/2 py-3 text-sm font-medium transition-colors ${lang === 'es' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700'}`}
                  >
                    ES
                  </button>
                  <button
                    aria-pressed={lang === 'cat'}
                    onClick={() => { setLang('cat'); setMobileOpen(false); }}
                    className={`w-1/2 py-3 text-sm font-medium transition-colors ${lang === 'cat' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-700'}`}
                  >
                    CAT
                  </button>
                </div>

                <div className="grid gap-3">
                  <a href={RESERVA_CAL_URL} target="_blank" rel="noreferrer">
                    <Button className="w-full rounded-full bg-zinc-900 text-white hover:bg-zinc-800">{t.menu.reservar}</Button>
                  </a>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER_WA}`} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full rounded-full border-zinc-300 text-zinc-900 hover:bg-zinc-100">
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero - versión clara con overlay, video actualizado */}
      <section id="hero" className="relative min-h-[80vh] md:min-h-[85vh] overflow-hidden bg-white">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/50" />
        <div className="relative container-max flex min-h-[80vh] md:min-h-[85vh] items-center justify-center">
          <div className="max-w-2xl py-16 text-center mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900">RE:MOV3</h1>
            <p className="mt-3 text-xl md:text-2xl text-zinc-700">{t.hero.subtitle}</p>
            <p className="mt-4 text-base md:text-lg text-zinc-600">
              {t.hero.desc}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={() => scrollToId('servicios')} className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
                {t.hero.cta}
              </Button>
              <a href={`https://wa.me/${WHATSAPP_NUMBER_WA}`} target="_blank" rel="noreferrer">
                <Button className="rounded-full bg-white border-2 border-zinc-300 text-zinc-900 hover:bg-zinc-100">
                  {t.hero.whatsapp}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Orden: Quién soy → Servicios → Metodología → Testimonios → Contacto */}

      {/* Quién soy - sin reborde blanco, imagen unificada al estilo */}
      <section id="quien" className="bg-zinc-50 text-zinc-900">
        <div className="container-max py-14 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.quien.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* Izquierda: descripción basada en idioma */}
            <div className="h-[420px] md:h-[520px] flex flex-col justify-around">
              {t.quien.content.map((para, idx) => (
                <p
                  key={idx}
                  className="text-zinc-600 text-sm md:text-base leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Derecha: imagen unificada al estilo, sin borde blanco */}
            <div className="rounded-xl overflow-hidden shadow-sm">
              <img
                src="/images/quien-soc-2.jpeg"
                alt={lang === 'es' ? 'Fisioterapeuta en sesión - imagen' : 'Fisioterapeuta en sessió - imatge'}
                className="w-full h-[420px] md:h-[520px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Separator className="container-max bg-zinc-200" />

      {/* Servicios - 3 planes con layout unificado en columnas */}
      <section id="servicios" className="bg-white">
        <div className="container-max py-14 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">{t.servicios.title}</h2>
          {(() => {
            // Calculate global maxFeatures across ALL services to ensure alignment
            const globalMaxFeatures = Math.max(
              ...t.servicios.plans.map((p) => {
                const planKey = (p as any).t.toLowerCase();
                const isFormacion = planKey.includes('formació') || planKey.includes('formación');
                const firstPlanFeatures = isFormacion ? (p as any).featuresPuntual : (p as any).featuresMonthly;
                return (firstPlanFeatures || []).length;
              })
            );
            
            const quarterlyGlobalMaxFeatures = Math.max(
              ...t.servicios.plans.map((p) => {
                return ((p as any).featuresQuarterly || []).length;
              })
            );

            return (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {t.servicios.plans.map((p) => {
                  const planKey = (p as any).t.toLowerCase();
                  const isFormacion = planKey.includes('formació') || planKey.includes('formación');
                  const isReadapt = planKey.includes('readapt');
                  const isMembresia = planKey.includes('membres') || planKey.includes('women');
                  
                  // Determine which plan type to use (puntual for Formación, monthly for others)
                  const firstPlanPrice = isFormacion ? (p as any).pricePuntual : (p as any).priceMonthly;
                  const firstPlanFeatures = isFormacion ? (p as any).featuresPuntual : (p as any).featuresMonthly;
                  const firstPlanLabel = isFormacion ? t.servicios.planPuntual : t.servicios.planMonthly;
                  const firstPlanSubtext = isFormacion ? '' : t.servicios.monthToMonth;
                  
                  const priceQuarterlyText = (p as any).priceQuarterly ?? '';
                  const priceQuarterlyMain = priceQuarterlyText.split('(')[0].trim();
                  const priceQuarterlySub = priceQuarterlyText.includes('(') ? '(' + priceQuarterlyText.split('(')[1] : '';

              return (
                <div key={p.t} className="flex flex-col h-full">
                  {/* Header section with fixed heights to ensure cards align */}
                  <div className="mb-4">
                    {/* Title - fixed height for all plans, aligned at top (guaranteed same starting position) */}
                    <div className="h-[4rem] mb-3 flex items-start justify-center">
                      <h3 className="text-2xl md:text-3xl font-bold uppercase text-center tracking-widest">{p.t}</h3>
                    </div>
                    
                    {/* Quote/Description - fixed height for all plans, centered horizontally and vertically */}
                    <div className="h-[4.5rem] flex items-center justify-center">
                      {p.quote ? (
                        <p className="text-base text-zinc-600 text-center">
                          {(p as any).quote}
                        </p>
                      ) : (
                        <div className="opacity-0 text-base text-zinc-600 text-center">Placeholder</div>
                      )}
                    </div>
                  </div>

                  {/* Two cards: first plan (puntual/monthly) and quarterly */}
                  <div className="flex flex-col gap-3 flex-1 min-h-0">
                    {/* First Plan Card (Puntual for Formación, Monthly for others) */}
                    <Card className="flex flex-col border border-zinc-200 rounded-xl shadow-sm bg-white">
                      <CardHeader className="text-center min-h-[4rem] flex flex-col justify-end bg-zinc-100 rounded-t-xl">
                        <div className="text-[11px] font-semibold text-zinc-700 tracking-widest">{firstPlanLabel}</div>
                      </CardHeader>
                      <CardContent className="flex flex-col p-6 pt-0">
                        <div className="min-h-[4.5rem] flex flex-col justify-center">
                          {isFormacion ? (
                            <div className="flex justify-center">
                              <span className="inline-block px-4 py-2 bg-zinc-100 border-2 border-zinc-600 text-sm font-semibold text-zinc-700 uppercase tracking-wider">
                                {t.servicios.comingSoon}
                              </span>
                            </div>
                          ) : (
                            <>
                              <div className="text-3xl font-bold text-center text-zinc-900 mb-1">{firstPlanPrice}</div>
                              {firstPlanSubtext && (
                                <div className="text-xs text-zinc-500 text-center">{firstPlanSubtext}</div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="border-t border-zinc-200 my-4" />
                        <div className="flex flex-col gap-3 text-zinc-700">
                          {Array.from({ length: globalMaxFeatures }).map((_, idx: number) => {
                            const feature = (firstPlanFeatures || [])[idx];
                            return (
                              <div key={idx} className="min-h-[1.75rem] flex items-center gap-2">
                                {feature ? (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700 flex-shrink-0"><path d="M20 6L9 17l-5-5" /></svg>
                                    <span className="text-sm">{feature}</span>
                                  </>
                                ) : (
                                  <div className="opacity-0 h-[1.75rem]">Placeholder</div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quarterly Plan Card - visually distinct */}
                    <Card className="flex flex-col border-2 border-zinc-900 rounded-xl shadow-sm bg-zinc-50">
                      <CardHeader className="text-center min-h-[4rem] flex flex-col justify-end bg-zinc-900 rounded-t-xl">
                        <div className="text-[11px] font-semibold text-white tracking-widest">{t.servicios.planQuarterly}</div>
                      </CardHeader>
                      <CardContent className="flex flex-col p-6 pt-0">
                        <div className="min-h-[4.5rem] flex flex-col justify-center">
                          {isFormacion ? (
                            <div className="flex justify-center">
                              <span className="inline-block px-4 py-2 bg-zinc-100 border-2 border-zinc-600 text-sm font-semibold text-zinc-700 uppercase tracking-wider">
                                {t.servicios.comingSoon}
                              </span>
                            </div>
                          ) : (
                            <>
                              <div className="text-3xl font-bold text-center text-zinc-900 mb-1">{priceQuarterlyMain}</div>
                              {priceQuarterlySub ? (
                                <div className="text-xs text-center text-zinc-500">{priceQuarterlySub}</div>
                              ) : (
                                <div className="text-xs text-center text-zinc-500 opacity-0">{t.servicios.monthToMonth}</div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="border-t border-zinc-200 my-4" />
                        <div className="flex flex-col gap-3 text-zinc-700">
                        {Array.from({ length: quarterlyGlobalMaxFeatures }).map((_, idx: number) => {
                            const feature = ((p as any).featuresQuarterly || [])[idx];
                            return (
                              <div key={idx} className="min-h-[1.75rem] flex items-center gap-2">
                                {isFormacion && feature ? (
                                  <span className="inline-block px-3 py-1 bg-zinc-100 border-2 border-zinc-600 rounded-full text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                                    {t.servicios.comingSoon}
                                  </span>
                                ) : feature ? (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700 flex-shrink-0"><path d="M20 6L9 17l-5-5" /></svg>
                                    <span className="text-sm">{feature}</span>
                                  </>
                                ) : (
                                  <div className="opacity-0 h-[1.75rem]">Placeholder</div>
                                )}
                              </div>
                            );
                          })}

                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Button - same position for all */}
                  <div className="mt-6 flex justify-center">       
                    {isFormacion ? (
                      <Button
                        onClick={() => {
                          scrollToId('contacto');
                          setForm({ ...form, missatge: t.servicios.moreInfoFormacion });
                        }}
                        className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800"
                      >
                        {t.servicios.moreInfo}
                      </Button>
                    ) : (
                      <a href={RESERVA_CAL_URL} target="_blank" rel="noreferrer">
                        <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
                          {t.menu.reservar}
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
              </div>
            );
          })()}
        </div>
      </section>

      <Separator className="container-max bg-zinc-200" />

      {/* Metodología - secciones según documento; "Especialización" alargada como fin de sección; sin cita final */}
      <section id="como" className="bg-zinc-50">
        <div className="container-max py-14 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">{t.como.title}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {t.como.sections.map((s) => {
              const isEspecial =
                s.t.toLowerCase().includes('especialización') ||
                s.t.toLowerCase().includes('especialització');
              return (
                <div key={s.t} className={isEspecial ? 'md:col-span-2' : ''}>
                  <Card className="bg-white border border-zinc-200 rounded-xl shadow-sm">
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-xl font-semibold text-zinc-900">{s.t}</CardTitle>
                    </CardHeader>
                    <CardContent className={`text-zinc-700 ${isEspecial ? 'leading-relaxed' : ''}`}>
                      {s.d}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
          {/* Cita final eliminada según solicitud */}
        </div>
      </section>

      <Separator className="container-max bg-zinc-200" />

      {/* Testimonios - fondo blanco */}
      <section id="testimonios" className="bg-white text-zinc-900">
        <div className="container-max py-14 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.testimonios.title}</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {t.testimonios.items.map((item) => (
              <Card key={item.t} className="bg-white border border-zinc-200 rounded-xl shadow-sm">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-500">
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
                        className="mt-0.5 text-zinc-700"
                      >
                        <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 1 1 18 0z" />
                      </svg>
                    </div>
                    <p className="text-zinc-700 mt-2">{item.d}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="container-max bg-zinc-200" />

      {/* Contacto */}
      <section id="contacto" className="bg-zinc-50">
        <div className="container-max py-14 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">{t.contacto.title}</h2>
          <p className="text-zinc-600 mb-8">{t.contacto.lead}</p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Información y otras vías */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-4">{t.contacto.info_title}</h3>
                <p className="text-sm text-zinc-600 mb-4">{t.contacto.note.number}</p>
                <p className="text-sm text-zinc-600 mb-4">{t.contacto.note.email}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-4">{t.contacto.other_title}</h3>
                <div className="flex flex-col gap-3">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER_WA}`} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full rounded-full border-zinc-300 text-zinc-900 hover:bg-zinc-100">
                      {t.contacto.whatsapp_btn}
                    </Button>
                  </a>
                  <a href={`mailto:${EMAIL}`}>
                    <Button variant="outline" className="w-full rounded-full border-zinc-300 text-zinc-900 hover:bg-zinc-100">
                      {t.contacto.email_btn}
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario */}
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
        </div>
      </section>

      {/* Footer claro */}
      <footer className="bg-white text-zinc-800 mt-0">
        <div className="container-max py-10 grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-xl font-bold">RE:MOV3</div>
            <p className="mt-2 text-sm text-zinc-500">
              {lang === 'es' ? texts.es.footer.left_tagline : texts.cat.footer.left_tagline}
            </p>
          </div>
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
            </ul>
          </div>
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