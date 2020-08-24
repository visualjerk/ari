module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#0057FF',
          500: '#004DE2',
        },
        pink: {
          500: '#F23E74',
        },
        ui: {
          background: 'var(--color-ui-background)',
          sidebar: 'var(--color-ui-sidebar)',
          typo: 'var(--color-ui-typo)',
          primary: 'var(--color-ui-primary)',
          highlight: 'var(--color-ui-highlight)',
          border: 'var(--color-ui-border)',
        },
      },
      spacing: {
        sm: '24rem',
      },
      screens: {
        xxl: '1400px',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  variants: {},
  plugins: [],
}
