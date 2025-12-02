MVP Plan for REMOV:3 Landing Page (shadcn-ui)

Files to create/modify (max 8):
1) index.html
   - Update page title and metadata for REMOV:3.

2) src/index.css
   - Global styles: smooth scroll, minimal custom scrollbar (accessible), utility styles.
   - Ensure responsive base and palette alignment (white/black/zinc).

3) src/pages/Index.tsx
   - Full one-page layout:
     - Sticky Navbar with logo "RE:MOV3", tagline under logo (desktop only), menu (Servicios, Cómo funciona, Quién soy, Testimonios, Contacto), ES/CAT selector, and "Reservar" button linking to Calendly demo.
     - Hero with soft background video, clear overlay, title "REMOV:3", subtitle, short description, two CTAs (Reservar + WhatsApp).
     - Sections with clean cards and subtle borders.
     - Contact section highlighting WhatsApp and Email buttons.
     - Smooth scroll to section IDs.
   - Language switch toggles visible texts between ES and CAT.

Assets
- Copy provided video to public/assets/hero.mp4
- Copy provided reference images to public/assets/ref-*.png
- Use ref-2.png as video poster fallback.

Relationships
- index.html renders /src/main.tsx which loads App.tsx → Index.tsx.
- Index.tsx uses shadcn-ui components (button, card, select, separator) and tailwind classes.
- index.css provides global smooth scroll + scrollbar.

Notes
- WhatsApp number: +34 664 89 20 20 → wa.me format: 34664892020
- Email: re:mov3@gmail.com
- Reservar: https://calendly.com/demo-remov3
- Palette: white, black, zinc gray; enforce strong contrast for buttons (Rule 22).