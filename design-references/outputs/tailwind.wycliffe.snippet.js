/* ==========================================================================
   Wycliffe Africa Design System — Tailwind theme map
   Merge this into your tailwind.config.js `theme.extend`.
   Values mirror wycliffe-africa.tokens.css so CSS vars and Tailwind stay in sync.
   Usage examples: bg-wa-cream  text-wa-ink  bg-wa-terra  rounded-wa-xl
                   shadow-wa-panel  font-serif  text-hero  bg-wa-sunrise
   ========================================================================== */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        wa: {
          cream:   '#FBF6EE',
          paper:   '#FFFFFF',
          sand:    '#FDF7EC',
          line:    '#EADFCF',
          amber:   '#E8912A',
          'amber-200': '#F6B94E',
          gold:    '#C9761A',
          terra:   '#B5471B',
          'terra-700': '#8C3313',
          leaf:    '#2F6E63',
          'leaf-700': '#234F47',
          ink:     '#2A2018',
          'ink-soft': '#5B4E42',
          highlight: '#FFD79A',
        },
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', 'Georgia', 'serif'],
        sans:  ['"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // fluid sizes matching the token file
        hero: ['clamp(2.3rem, 5.4vw, 4rem)', { lineHeight: '1.12' }],
        h2:   ['clamp(1.7rem, 3.4vw, 2.5rem)', { lineHeight: '1.15' }],
        h3:   ['1.28rem', { lineHeight: '1.3' }],
        lede: ['clamp(1.05rem, 2.2vw, 1.4rem)', { lineHeight: '1.5' }],
        lead: ['1.2rem', { lineHeight: '1.6' }],
        body: ['1.08rem', { lineHeight: '1.65' }],
        label:['13px', { letterSpacing: '0.2em' }],
      },
      letterSpacing: {
        eyebrow: '0.24em',
        kicker:  '0.20em',
      },
      borderRadius: {
        'wa-sm': '8px',
        'wa-md': '12px',
        'wa-lg': '16px',
        'wa-xl': '22px',
        'wa-2xl': '26px',
        'wa-pill': '40px',
      },
      boxShadow: {
        'wa-card':  '0 10px 30px -22px rgba(80,45,10,.5)',
        'wa-soft':  '0 12px 30px -12px rgba(0,0,0,.5)',
        'wa-panel': '0 18px 50px -24px rgba(60,35,10,.45)',
      },
      maxWidth: {
        'wa-container': '1120px',
      },
      backgroundImage: {
        'wa-sunrise':      'radial-gradient(120% 90% at 50% 118%, #FFE0A6 0%, #F6A93F 26%, #D9691E 55%, #A5381A 100%)',
        'wa-sunrise-deep': 'radial-gradient(120% 95% at 50% 118%, #FFE0A6 0%, #F0A544 24%, #C85E22 54%, #7C3417 100%)',
        'wa-leaf':         'linear-gradient(135deg, #2F6E63, #234F47)',
        'wa-terra':        'linear-gradient(135deg, #B5471B, #8C3313)',
        'wa-cta':          'radial-gradient(120% 120% at 50% 0%, #FBE7C4 0%, #F7D69B 100%)',
      },
    },
  },
};
