import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Activity, GraduationCap, Heart, Users, Video, BookOpen, CheckCircle2 } from 'lucide-react';

type Lang = 'es' | 'cat';
type PriceView = 'mensual' | 'trimestral' | 'ver-todo';

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
      subtitle: 'Readaptación · Entrenamiento · Formación',
      desc:
        'Tu movimiento, tu ritmo, tu evolución.',
      cta: 'Ver Servicios',
      whatsapp: 'WhatsApp',
    },
    tagline: 'Readaptación · Entrenamiento · Formación',
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
          quote: 'Servicio premium 1:1 para lesiones. Plan personalizado con seguimiento semanal.',
          featuresMonthly: [
            'Acompañamiento 1:1',
            'Plan totalmente personalizado y adaptado',
            'Protocolo completo por fases',
            'Ajustes de carga semanales',
            'Trabajo activo',
            'Videollamada quincenal',
            'Corrección técnica',
          ],
          featuresQuarterly: [
            'Todo lo del mensual',
            'Re-test mensual',
            'Informe de evolución',
          ],
        },
        {
          t: 'Entrenamiento',
          priceMonthly: '79€',
          priceQuarterly: '225€ (75€/mes)',
          quote: 'Entrenamiento híbrido, comunidad y recursos wellness.',
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
          priceMonthly: '45€',
          priceQuarterly: '120€ (40€/mes)',
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
            'Tu recuperación se trabaja de manera 100% activa, personalizada y basada en la ciencia. Trabajamos con un entrenamiento adaptado a cada fase de la readaptación, con un enfoque integral para que tu cuerpo vuelva a responder, recuperes la confianza y avances con seguridad.',
        },
        {
          t: 'El ciclo de feedback',
          d:
            'No sigues un plan cerrado: evolucionamos juntos. Realizo un seguimiento constante y una planificación semanal adaptada a tu momento actual. Cada sesión se ajusta según tu progreso real, con feedback continuo para que siempre sepas cómo estás y hacia dónde vamos.',
        },
        {
          t: 'Tecnología y datos',
          d:
            'La tecnología nos ayuda a tomar mejores decisiones. Utilizo apps digitales para analizar, guardar y comparar resultados, aportando datos objetivos que nos permiten saber exactamente en qué punto te encuentras y cómo seguir avanzando.',
        },
        {
          t: 'Educación y autonomía',
          d:
            'El objetivo es claro: que llegues a tu meta y no dependas de nadie. Por eso, te ayudo a comprender cada paso del proceso, fomentando tu implicación activa y tu independencia a largo plazo.',
        },
        {
          t: 'Especialización',
          d:
            'Trabajo con ejercicios progresivos adaptados a cada fase del proceso y a tu tolerancia al dolor, con el objetivo de revertir lesiones y construir un cuerpo fuerte y resiliente. Cada sesión se ajusta a tu estado físico y funcional actual. A nivel cognitivo y motor, reaprendes a activar y ejecutar movimientos que antes no podías realizar, mejorando el control, la confianza y la eficiencia del movimiento. Te enseño a gestionar correctamente la carga y a moverte con una activación completa, ajustando el entrenamiento según la respuesta de tu cuerpo: adaptándolo cuando es necesario o aumentando progresivamente la carga cuando estás preparado.',
        },
      ],
    },
    quien: {
      title: 'Quién soy',
      paragraph1: 'Llevo más de 7 años trabajando en entrenamiento y readaptación. Estoy especializado en recuperación de lesiones y entrenamiento de fuerza.',
      paragraph2: 'Mi forma de trabajar nace tanto de la formación como de la experiencia personal. Haber pasado por lesiones graves me enseñó algo que ningún máster explica: los protocolos estándar no siempre funcionan.',
      destacado1: 'La recuperación real necesita un plan personalizado que vaya más allá de lo físico.',
      paragraph3: 'No se trata solo de recuperar fuerza o movilidad.',
      destacado2: 'Se trata de volver a confiar en el cuerpo y perder el miedo a moverse.',
      paragraph4: 'En RE:MOVE3 acompaño procesos de readaptación de forma clara y progresiva, adaptándome a cada persona desde una perspectiva física, funcional y mental.',
      cierre1: 'Readaptación real.',
      cierre2: 'Resultados reales.',
      cierre3: 'Acompañamiento humano.',
      cta: 'Cuéntame tu caso',
    },
    testimonios: {
      title: 'Testimonios',
      items: [
        {
          t: 'Anabel Pérez',
          d:
            'Empecé a trabajar con Adri aproximadamente 4 meses después de mi operación de LCA, apenas tenía fuerza en la pierna operada y tenía dificultades en acciones cotidianas. Gracias a su acompañamiento en los entrenamientos y en el proceso de recuperación he conseguido recuperar fuerza, movilidad y volver a hacer una vida y unos entrenamientos normales. Muchas gracias por todo!',
        },
        {
          t: 'Joaquim Martínez',
          d:
            'Un buen profesional, siempre atento a las necesidades del cliente, con capacidad de adaptación a sus circunstancias cada día y que diseña un plan de trabajo progresivo hacia el objetivo. Gracias por la labor y el acompañamiento.',
        },
        {
          t: 'Jordi Arto',
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
    tagline: 'Readaptació · Entrenament · Formació',
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
          quote: 'Servei premium 1:1 per a lesions. Pla personalitzat amb seguiment setmanal.',
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
            'Re-test mensual',
            'Informe d\'evolució',
          ],
        },
        {
          t: 'Entrenament',
          priceMonthly: '79€',
          priceQuarterly: '225€ (75€/mes)',
          quote: 'Entrenament híbrid, comunitat i recursos wellness.',
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
          priceMonthly: '45€',
          priceQuarterly: '120€ (40€/mes)',
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
            "La teva recuperació es treballa de manera 100% activa, personalitzada i basada en la ciència. Treballem amb un entrenament adaptat a cada fase de la readaptació, amb un enfocament integral perquè el teu cos torni a respondre, recuperis la confiança i avancis amb seguretat.",
        },
        {
          t: 'El cicle de feedback',
          d:
            "No segueixes un pla tancat: evolucionem junts. Faig un seguiment constant i una planificació setmanal adaptada al teu moment actual. Cada sessió s\'ajusta segons el teu progrés real, amb feedback continu perquè sempre sàpigues com estàs i cap on anem.",
        },
        {
          t: 'Tecnologia i dades',
          d:
            'La tecnologia ens ajuda a prendre millors decisions. Utilitzo apps digitals per analitzar, guardar i comparar resultats, aportant dades objectives que ens permeten saber exactament en quin punt et trobes i com continuar avançant.',
        },
        {
          t: 'Educació i autonomia',
          d:
            "L\'objectiu és clar: que arribis a la teva meta i no depenguis de ningú. T\'explico el “per què” de cada exercici i de cada sensació perquè entenguis el procés, participis activament en la teva recuperació i guanyis autonomia a llarg termini.",
        },
        {
          t: 'Especialització',
          d:
            "Treballo amb exercicis progressius adaptats a cada fase del procés i a la teva tolerància al dolor, amb l\'objectiu de revertir lesions i construir un cos fort i resilient. Cada sessió s\'ajusta al teu estat físic i funcional actual. A nivell cognitiu i motor, reaprens a activar i executar els moviments que abans no podies realitzar, millorant el control, la confiança i l\'eficiència del moviment. T\'ensenyo a gestionar correctament la càrrega i a moure\'t amb una activació completa, ajustant l\'entrenament segons la resposta del teu cos: adaptant-lo quan cal o augmentant progressivament la càrrega quan estàs preparat.",
        },
      ],
    },
    quien: {
      title: 'Qui sóc',
      paragraph1: "Més de 7 anys dedicat a l'entrenament i la readaptació. Especialitzat en recuperació de lesions i entrenament de força.",
      paragraph2: 'Les meves pròpies lesions greus em van ensenyar el que cap màster explica: els protocols estàndard no funcionen.',
      destacado1: 'La recuperació real necessita un pla personalitzat que vagi més enllà del físic.',
      paragraph3: "Perquè tornar d'una lesió no és només recuperar força o mobilitat.",
      destacado2: 'És recuperar la confiança. Perdre la por. Sentir que el teu cos torna a ser teu.',
      paragraph4: "A RE:MOV3 ofereixo el que jo hauria volgut tenir en els meus pitjors moments: un pla clar, progressiu i adaptat a tu. Físic, funcional i mental.",
      cierre1: 'Readaptació real.',
      cierre2: 'Resultats reals.',
      cierre3: 'Acompañament humà.',
      cta: 'Explica\'m el teu cas',
    },
    testimonios: {
      title: 'Testimonis',
      items: [
        {
          t: 'Anabel Pérez',
          d: `Vaig començar a treballar amb l\'Adri aproximadament 4 mesos després de la meva operació de LCA, amb prou feines tenia força a la cama operada i tenia dificultats en accions quotidianes. Gràcies al teu acompanyament en els entrenaments i en el procés de recuperació he aconseguit recuperar força, mobilitat i tornar a fer una vida i uns entrenaments normals. Moltes gràcies per tot!`,
        },
        {
          t: 'Joaquim Martínez',
          d: `Un bon professional, sempre atent a les necessitats del client, amb capacitat d'adaptació a les circumstàncies cada dia i que dissenya un pla de treball progressiu cap a l'objectiu. Gràcies per la feina i l'acompanyament.`,
        },
        {
          t: 'Jordi Arto',
          d: `Després d'un any treballant amb l'Adrià, només puc tenir bones paraules. És puntual, educat i s'adapta sempre a allò que necessites. Els seus plans d'entrenament són molt bons i és al teu costat per assegurar que facis cada exercici correctament i evitar lesions. Ho recomanaria sense dubtar. Ha estat un plaer entrenar amb ell.`,
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

// Tamaño de iconos (reducido 10% para que sean puntos introductorios)
const ICON_SIZE = 16;

// Función para obtener el icono SVG correspondiente a cada feature de cualquier plan
const getFeatureIcon = (featureText: string, iconColor: string = 'text-zinc-700') => {
  const text = featureText.toLowerCase();
  
  // Iconos SVG en blanco y negro elegantes
  // Plan Readaptación 1:1
  if (text.includes('acompañamiento') || text.includes('acompanyament')) {
    // Icono de mensaje/chat
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  if (text.includes('plan') || text.includes('pla')) {
    // Icono de lápiz/editar
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    );
  }
  if (text.includes('protocolo') || text.includes('protocol')) {
    // Icono de menú (tres líneas horizontales)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    );
  }
  if (text.includes('ajustes') || text.includes('ajustos') || text.includes('carga')) {
    // Icono de mancuerna (dumbbell)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <rect x="3" y="8" width="4" height="8" rx="1" />
        <rect x="17" y="8" width="4" height="8" rx="1" />
        <line x1="7" y1="12" x2="17" y2="12" />
      </svg>
    );
  }
  if (text.includes('trabajo activo') || text.includes('treball actiu')) {
    // Icono de rayo (flash)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  if (text.includes('videollamada') || text.includes('videotrucada')) {
    // Icono de videocámara
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    );
  }
  if (text.includes('corrección') || text.includes('correcció')) {
    // Icono de checkmark en círculo
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  
  // Plan Membresía
  if (text.includes('entreno') || text.includes('entrenamiento') || text.includes('entrenament')) {
    // Icono de flechas cruzadas (shuffle)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    );
  }
  if (text.includes('movilidad') || text.includes('movilitat')) {
    // Icono de corredor
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <circle cx="12" cy="4" r="2" />
        <path d="M12 6v4" />
        <path d="M8 10l2 2 4-2 2 2" />
        <path d="M6 18l2-2 2 2" />
        <path d="M18 18l-2-2 2 2" />
        <path d="M10 12l-2 4" />
        <path d="M14 12l2 4" />
      </svg>
    );
  }
  if (text.includes('wellness') || text.includes('recursos')) {
    // Icono de corazón/salud
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  }
  if (text.includes('comunidad') || text.includes('comunitat')) {
    // Icono de usuarios/grupo
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  
  // Plan Trimestral - features adicionales
  if (text.includes('todo lo del') || text.includes('tot el del')) {
    // Icono de lista/checklist
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    );
  }
  if (text.includes('re-test') || text.includes('test')) {
    // Icono de gráfico/medición
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }
  if (text.includes('informe') || text.includes('evolución') || text.includes('evolució')) {
    // Icono de documento
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    );
  }
  if (text.includes('precio') || text.includes('preu')) {
    // Icono de etiqueta/precio
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    );
  }
  if (text.includes('compromiso') || text.includes('compromís')) {
    // Icono de estrella/objetivo (compromiso)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="12 6 14.5 10.5 19.5 11.5 16 15 17 20 12 17 7 20 8 15 4.5 11.5 9.5 10.5 12 6" />
      </svg>
    );
  }
  if (text.includes('acceso') || text.includes('accés')) {
    // Icono de llave/acceso
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    );
  }
  if (text.includes('soporte') || text.includes('suport')) {
    // Icono de soporte/ayuda
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  
  // Plan Formación
  if (text.includes('webinar')) {
    // Icono de pantalla/video
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  }
  if (text.includes('workshop') || text.includes('presencial')) {
    // Icono de usuarios/grupo
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  if (text.includes('cápsula') || text.includes('càpsula') || text.includes('on-demand')) {
    // Icono de play/video
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    );
  }
  if (text.includes('mentoría') || text.includes('mentoria')) {
    // Icono de persona con birrete
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M6 3h12M6 3v2M18 3v2" />
        <path d="M6 5h12M6 5l-2 4h16l-2-4" />
        <line x1="12" y1="5" x2="12" y2="3" />
      </svg>
    );
  }
  
  // Icono por defecto (checkmark simple)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconColor} flex-shrink-0`}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
};

function IndexPage() {
  const [lang, setLang] = useState<Lang>('es');
  const t = useMemo(() => texts[lang], [lang]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [priceView, setPriceView] = useState<PriceView>('mensual');
  const [form, setForm] = useState({
    nom: '',
    email: '',
    telefon: '',
    missatge: '',
  });

  // Helper para renderizar el bloque de precio
  const renderPriceBlock = (
    priceView: PriceView,
    monthlyPrice: string | null,
    monthlyPeriod: string | null,
    quarterlyPrice: string | null,
    quarterlyPeriod: string | null,
    isDark: boolean
  ) => {
    const textColor = isDark ? 'text-white' : 'text-zinc-900';
    const textColorSecondary = isDark ? 'text-zinc-400' : 'text-zinc-500';
    const hasPrice = monthlyPrice !== null || quarterlyPrice !== null;

    return (
      <div className="min-h-[120px] w-full overflow-hidden flex items-center justify-center">
        {!hasPrice ? (
          // PRÓXIMAMENTE cuando no hay precio
          <div className="animate-fade-in w-full text-center px-2">
            <span className="inline-block bg-zinc-200 text-zinc-700 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider whitespace-nowrap">
              PRÓXIMAMENTE
            </span>
          </div>
        ) : priceView === 'mensual' && monthlyPrice ? (
          // Precio mensual
          <div className="animate-fade-in w-full text-center">
            <div className={`text-5xl font-bold mb-2 ${textColor}`}>{monthlyPrice}</div>
            {monthlyPeriod && (
              <div className={`text-sm ${textColorSecondary}`}>{monthlyPeriod}</div>
            )}
          </div>
        ) : priceView === 'trimestral' && quarterlyPrice ? (
          // Precio trimestral
          <div className="animate-fade-in w-full text-center">
            <div className={`text-5xl font-bold mb-2 ${textColor}`}>{quarterlyPrice}</div>
            {quarterlyPeriod && (
              <div className={`text-sm ${textColorSecondary}`}>{quarterlyPeriod}</div>
            )}
          </div>
        ) : priceView === 'ver-todo' ? (
          // Ambos precios
          <div className="space-y-4 animate-fade-in w-full">
            {monthlyPrice && (
              <div className={`pb-4 border-b ${isDark ? 'border-zinc-600' : 'border-zinc-200'}`}>
                <div className={`text-3xl font-bold mb-1 ${textColor}`}>{monthlyPrice}</div>
                {monthlyPeriod && (
                  <div className={`text-sm ${textColorSecondary}`}>Mensual</div>
                )}
              </div>
            )}
            {quarterlyPrice && (
              <div>
                <div className={`text-3xl font-bold mb-1 ${textColor}`}>{quarterlyPrice}</div>
                {quarterlyPeriod && (
                  <div className={`text-sm ${textColorSecondary}`}>Trimestral {quarterlyPeriod}</div>
                )}
              </div>
            )}
          </div>
        ) : (
          // Fallback: PRÓXIMAMENTE
          <div className="animate-fade-in w-full text-center px-2">
            <span className={`text-3xl font-bold uppercase tracking-wider ${textColor} whitespace-nowrap max-w-full inline-block`}>
              PRÓXIMAMENTE
            </span>
          </div>
        )}
      </div>
    );
  };

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
            <div className="font-bold tracking-tight text-lg md:text-xl text-zinc-900 logo-main">RE:MOV3</div>
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
          style={{ 
            filter: 'contrast(0.85) brightness(1.05) saturate(1.1)',
            imageRendering: 'crisp-edges'
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative container-max flex min-h-[80vh] md:min-h-[85vh] items-center justify-center">
          <div className="max-w-2xl py-16 text-center mx-auto">
            <h1 id="hero-title" className="text-5xl md:text-6xl font-extrabold tracking-tight text-black logo-main">RE:MOV3</h1>
            <p className="mt-3 text-xl md:text-2xl text-black">{t.hero.subtitle}</p>
            <p className="mt-4 text-base md:text-lg text-black">
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

      {/* Quién soy - nuevo diseño */}
      <section id="quien" className="bg-zinc-50" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Título */}
          <h2 className="quien-soy__title" style={{ fontSize: '42px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>
            {t.quien.title}
          </h2>
          {/* Línea decorativa */}
          <div style={{ width: '60px', height: '3px', backgroundColor: '#2A2A2A', marginBottom: '60px' }} />
          
          {/* Grid principal */}
          <div className="quien-soy__grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
            {/* Texto izquierda */}
            <div className="quien-soy__text" style={{ order: 1 }}>
              <p style={{ fontSize: '18px', lineHeight: 1.7, color: '#4A4A4A', marginBottom: '24px' }}>
                {t.quien.paragraph1}
              </p>
              <p style={{ fontSize: '18px', lineHeight: 1.7, color: '#4A4A4A', marginBottom: '24px' }}>
                {t.quien.paragraph2}
              </p>
              <p className="quien-soy__destacado" style={{ fontSize: '20px', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.6, margin: '28px 0', paddingLeft: '20px', borderLeft: '3px solid #2A2A2A' }}>
                {t.quien.destacado1}
              </p>
              <p style={{ fontSize: '18px', lineHeight: 1.7, color: '#4A4A4A', marginBottom: '24px' }}>
                {t.quien.paragraph3}
              </p>
              <p className="quien-soy__destacado" style={{ fontSize: '20px', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.6, margin: '28px 0', paddingLeft: '20px', borderLeft: '3px solid #2A2A2A' }}>
                {t.quien.destacado2}
              </p>
              <p style={{ fontSize: '18px', lineHeight: 1.7, color: '#4A4A4A', marginBottom: '24px' }}>
                {t.quien.paragraph4}
              </p>
            </div>
            
            {/* Imagen derecha */}
            <div className="quien-soy__image" style={{ borderRadius: '8px', overflow: 'hidden', minHeight: '500px', order: 2 }}>
              <img
                src="/images/quien-soc-2.jpeg"
                alt={lang === 'es' ? 'Oriol entrenando en RE:MOVE3' : 'Oriol entrenant a RE:MOVE3'}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '500px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease',
                }}
                className="hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        <style>{`
          @media (min-width: 768px) {
            .quien-soy__grid {
              grid-template-columns: 1fr 1fr !important;
            }
          }
          @media (max-width: 767px) {
            section#quien {
              padding: 40px 16px !important;
            }
            .quien-soy__title {
              font-size: 32px !important;
            }
            .quien-soy__destacado {
              font-size: 18px !important;
              padding-left: 16px !important;
            }
          }
        `}</style>
      </section>

      <Separator className="container-max bg-zinc-200" />

      {/* Servicios - Nuevo diseño premium */}
      <section id="servicios" className="bg-white" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>{t.servicios.title}</h2>
          {/* Línea decorativa */}
          <div style={{ width: '60px', height: '3px', backgroundColor: '#2A2A2A', marginBottom: '48px' }} />
          
          {/* Toggle de 3 estados */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full border border-zinc-300 bg-white p-1 shadow-sm">
              <button
                onClick={() => setPriceView('mensual')}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  priceView === 'mensual'
                    ? 'bg-zinc-900 text-white shadow-md'
                    : 'text-zinc-700 hover:text-zinc-900'
                }`}
              >
                MENSUAL
              </button>
              <button
                onClick={() => setPriceView('trimestral')}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  priceView === 'trimestral'
                    ? 'bg-zinc-900 text-white shadow-md'
                    : 'text-zinc-700 hover:text-zinc-900'
                }`}
              >
                TRIMESTRAL
              </button>
              <button
                onClick={() => setPriceView('ver-todo')}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  priceView === 'ver-todo'
                    ? 'bg-zinc-900 text-white shadow-md'
                    : 'text-zinc-700 hover:text-zinc-900'
                }`}
              >
                VER TODO
              </button>
            </div>
          </div>

          {/* Tarjetas de servicios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* READAPTACIÓN - Destacada */}
            <div className="bg-zinc-700 text-white rounded-2xl p-8 shadow-xl grid grid-rows-[auto_auto_auto_1fr_auto] gap-6">
              {/* Título */}
              <h3 className="text-3xl font-bold">READAPTACIÓN</h3>
              
              {/* Descripción - altura fija para alineación */}
              <p className="text-zinc-300 text-sm leading-relaxed min-h-[4.5rem]">
                {t.servicios.plans[0].quote}
              </p>

              {/* Precio según toggle - altura fija para alineación */}
              {renderPriceBlock(
                priceView,
                '150€',
                'al mes',
                '390€',
                '(130€/mes)',
                true
              )}

              {/* Features - 1fr absorbe espacio extra */}
              <div className="space-y-3">
                {priceView === 'mensual' && (
                  <>
                    {t.servicios.plans[0].featuresMonthly.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {getFeatureIcon(feature, 'text-zinc-200')}
                        <span className="text-zinc-200 text-sm">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
                {priceView === 'trimestral' && (
                  <>
                    {t.servicios.plans[0].featuresQuarterly.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {getFeatureIcon(feature, 'text-zinc-200')}
                        <span className="text-zinc-200 text-sm">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
                {priceView === 'ver-todo' && (
                  <>
                    {t.servicios.plans[0].featuresMonthly.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {getFeatureIcon(feature, 'text-zinc-200')}
                        <span className="text-zinc-200 text-sm">{feature}</span>
                      </div>
                    ))}
                    {t.servicios.plans[0].featuresQuarterly.length > 0 && (
                      <>
                        {t.servicios.plans[0].featuresQuarterly.map((feature, idx) => (
                          <div key={`quarterly-${idx}`} className="flex items-start gap-3">
                            {getFeatureIcon(feature, 'text-zinc-200')}
                            <span className="text-zinc-200 text-sm">{feature}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Botón - auto, alineado abajo */}
              <a href={RESERVA_CAL_URL} target="_blank" rel="noreferrer">
                <Button className="w-full rounded-full bg-white text-zinc-900 hover:bg-zinc-100 font-medium transition-all duration-300 hover:shadow-lg">
                  {t.menu.reservar}
                </Button>
              </a>
            </div>

            {/* ENTRENAMIENTO - Centro */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 shadow-sm grid grid-rows-[auto_auto_auto_1fr_auto] gap-6 hover:shadow-md transition-shadow duration-300">
              {/* Título */}
              <h3 className="text-3xl font-bold text-zinc-900">ENTRENAMIENTO</h3>
              
              {/* Descripción - altura fija para alineación */}
              <p className="text-zinc-600 text-sm leading-relaxed min-h-[4.5rem]">
                {t.servicios.plans[1].quote}
              </p>

              {/* Precio según toggle - altura fija para alineación */}
              {renderPriceBlock(
                priceView,
                '79€',
                'al mes',
                '225€',
                '(75€/mes)',
                false
              )}

              {/* Features - 1fr absorbe espacio extra */}
              <div className="space-y-3">
                {priceView === 'mensual' && (
                  <>
                    {t.servicios.plans[1].featuresMonthly.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {getFeatureIcon(feature)}
                        <span className="text-zinc-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
                {priceView === 'trimestral' && (
                  <>
                    {t.servicios.plans[1].featuresQuarterly.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {getFeatureIcon(feature)}
                        <span className="text-zinc-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
                {priceView === 'ver-todo' && (
                  <>
                    {t.servicios.plans[1].featuresMonthly.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {getFeatureIcon(feature)}
                        <span className="text-zinc-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    {t.servicios.plans[1].featuresQuarterly.length > 0 && (
                      <>
                        {t.servicios.plans[1].featuresQuarterly.map((feature, idx) => (
                          <div key={`quarterly-${idx}`} className="flex items-start gap-3">
                            {getFeatureIcon(feature)}
                            <span className="text-zinc-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Botón - auto, alineado abajo */}
              <a href={RESERVA_CAL_URL} target="_blank" rel="noreferrer">
                <Button className="w-full rounded-full bg-zinc-900 text-white hover:bg-zinc-800 font-medium transition-all duration-300 hover:shadow-lg">
                  {t.menu.reservar}
                </Button>
              </a>
            </div>

            {/* FORMACIÓN - Derecha */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 shadow-sm grid grid-rows-[auto_auto_auto_1fr_auto] gap-6 hover:shadow-md transition-shadow duration-300">
              {/* Título */}
              <h3 className="text-3xl font-bold text-zinc-900">FORMACIÓN</h3>
              
              {/* Descripción - altura fija para alineación */}
              <p className="text-zinc-600 text-sm leading-relaxed min-h-[4.5rem]">
                {t.servicios.plans[2].quote}
              </p>

              {/* Precio - PRÓXIMAMENTE (no hay precio disponible) */}
              {renderPriceBlock(
                priceView,
                null,
                null,
                null,
                null,
                false
              )}

              {/* Features - 1fr absorbe espacio extra */}
              <div className="space-y-3">
                {priceView === 'mensual' && (
                  <>
                    {t.servicios.plans[2].featuresPuntual.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {getFeatureIcon(feature)}
                        <span className="text-zinc-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
                {priceView === 'trimestral' && (
                  <>
                    {t.servicios.plans[2].featuresQuarterly && t.servicios.plans[2].featuresQuarterly.length > 0 && (
                      <>
                        {t.servicios.plans[2].featuresQuarterly.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            {getFeatureIcon(feature)}
                            <span className="text-zinc-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
                {priceView === 'ver-todo' && (
                  <>
                    {t.servicios.plans[2].featuresPuntual.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {getFeatureIcon(feature)}
                        <span className="text-zinc-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    {t.servicios.plans[2].featuresQuarterly && t.servicios.plans[2].featuresQuarterly.length > 0 && (
                      <>
                        {t.servicios.plans[2].featuresQuarterly.map((feature, idx) => (
                          <div key={`quarterly-${idx}`} className="flex items-start gap-3">
                            {getFeatureIcon(feature)}
                            <span className="text-zinc-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Botón - auto, alineado abajo */}
              <Button
                onClick={() => {
                  scrollToId('contacto');
                  setForm({ ...form, missatge: t.servicios.moreInfoFormacion });
                }}
                className="w-full rounded-full bg-zinc-900 text-white hover:bg-zinc-800 font-medium transition-all duration-300 hover:shadow-lg"
              >
                {t.servicios.moreInfo}
              </Button>
            </div>
          </div>
        </div>

        {/* Estilos para animación fade-in */}
        <style>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
          @media (max-width: 767px) {
            section#servicios {
              padding: 40px 16px !important;
            }
            section#servicios h2 {
              font-size: 32px !important;
            }
          }
        `}</style>
      </section>

      <Separator className="container-max bg-zinc-200" />

      {/* Metodología - secciones según documento; "Especialización" alargada como fin de sección; sin cita final */}
      <section id="como" className="bg-zinc-50" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>{t.como.title}</h2>
          {/* Línea decorativa */}
          <div style={{ width: '60px', height: '3px', backgroundColor: '#2A2A2A', marginBottom: '32px' }} />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {t.como.sections.map((s) => {
              const isEspecial =
                s.t.toLowerCase().includes('especialización') ||
                s.t.toLowerCase().includes('especialització');
              const isEducacion = 
                s.t.toLowerCase().includes('educación') ||
                s.t.toLowerCase().includes('educació') ||
                s.t.toLowerCase().includes('autonomía') ||
                s.t.toLowerCase().includes('autonomia');
              const isTecnologia =
                s.t.toLowerCase().includes('tecnología') ||
                s.t.toLowerCase().includes('tecnologia') ||
                s.t.toLowerCase().includes('datos') ||
                s.t.toLowerCase().includes('dades');
              return (
                <div key={s.t} className={isEspecial ? 'md:col-span-2' : ''}>
                  <Card className={`bg-white border border-zinc-200 rounded-xl shadow-sm ${!isEspecial ? 'h-full flex flex-col' : ''}`}>
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-xl font-semibold text-zinc-900">{s.t}</CardTitle>
                    </CardHeader>
                    <CardContent className={`text-zinc-700 flex-1 ${isEspecial ? 'leading-relaxed' : ''} ${(isEducacion || isTecnologia) ? 'min-h-[120px]' : ''}`}>
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
      <section id="testimonios" className="bg-white text-zinc-900" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>{t.testimonios.title}</h2>
          {/* Línea decorativa */}
          <div style={{ width: '60px', height: '3px', backgroundColor: '#2A2A2A', marginBottom: '32px' }} />
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
      <section id="contacto" className="bg-zinc-50" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>{t.contacto.title}</h2>
          {/* Línea decorativa */}
          <div style={{ width: '60px', height: '3px', backgroundColor: '#2A2A2A', marginBottom: '20px' }} />
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
                    <Button variant="outline" className="w-full rounded-full border-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 hover:shadow-lg">
                      {t.contacto.whatsapp_btn}
                    </Button>
                  </a>
                  <a href={`mailto:${EMAIL}`}>
                    <Button variant="outline" className="w-full rounded-full border-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 hover:shadow-lg">
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
      
      {/* Estilos globales para títulos de secciones */}
      <style>{`
        @media (max-width: 767px) {
          section#servicios,
          section#como,
          section#testimonios,
          section#contacto {
            padding: 40px 16px !important;
          }
          section#servicios h2,
          section#como h2,
          section#testimonios h2,
          section#contacto h2 {
            font-size: 32px !important;
          }
          /* Ajustes del video del hero en móvil */
          section#hero {
            min-height: 100vh !important;
            position: relative !important;
            overflow: hidden !important;
          }
          section#hero video {
            object-fit: cover !important;
            object-position: 60% center !important;
            width: 100% !important;
            height: 100% !important;
            min-width: 100% !important;
            min-height: 100% !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
          }
          section#hero .container-max {
            min-height: 100vh !important;
          }
          
          /* Ajuste para pantallas muy pequeñas - centrar en una persona */
          @media (max-width: 480px) {
            section#hero video {
              object-position: 65% center !important;
            }
          }
          
          /* Ajuste para tablets pequeñas */
          @media (min-width: 481px) and (max-width: 767px) {
            section#hero video {
              object-position: 55% center !important;
            }
          }
        }
      `}</style>
    </div>
  );
}

export default IndexPage;