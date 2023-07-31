// The following import is the path to where the component source code lives
const { ComponentsContentPath } = require("@yext/search-ui-react");

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{js,jsx}",
    // tailwind is applied to the components by adding the component path here
    ComponentsContentPath,
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: "576px",
      sm: "640px",
      md: "767px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      primaryRed: "#d21242",
      primaryBlue: "#004990",
      footerBorder: "#a8d6e2",
      topbarHoverBG: "#800b28",
      submenuBorder: "#80a3c6",
      resultCardHover: "#f4f5f7",
      'transparent': 'transparent',
      'white': '#ffffff',
      'black': '#000000',
      'Dark-red': '#02a6db',
      'gray': '#383838',
      'hover-btn': '#017195',
      'footer-bg': '#1e293e',
      'red': '#A3C62C',
      'red-eb': '#02a6db',
      'light-red': '#9fe0f5',
      'gray-dark': '#111111',
      'gray-light': '#ececec',
      'button-light': '#F5F5F7',
      'platinum': '#E5E4E2',
      'border-light': '#B2B3B5',
      'seachbutton-bg': '#E8E8ED',
      'nav-link': '#747474',
      'nav-li-border': '#d7d7d7',
      'right-menu-b': '#ebebeb',
      'search-text': '#9c9c9c',
      'location-bg': '#f7f7f7',
      'home-icon-bg': '#E5E5E1',
      'address-bg': '#FBFBFD',
      'hours-bg': '#eeeeee',
      'light-grey': '#F8F8F8',
      'faq-border': '#cfcfcf',
      'text-light': '#3D3935',
      'cookies-link': '#d61a0c',
      'box-border': '#cccccc',
      'dark-gray': '#333333',
      'hover-border': '#d8d8d8',
      'bg-primary': '#02a6db',
      'bg-blue': '#A3C62C',
      'bg-secondary': '#1e293e',
      'bg-gray1': '#2D3846',
      'light-blue1': '#10cef0',
      'light-gray1': '#f2f2f2',
      'bg-hover': '#71cae8',
      'green-1': '#a2c62c',
      'green-2': '#10cef0',
      'primaryOrange': '#f5821f',
      'lightBlack': '#212121',
      'textBlue': '#2c3e7e',
      'grayBG': 'rgba(0,0,0,.03)',
    },
    fontFamily: {
      'primary': ['"Source Sans Pro"'],
      'second-font': ['"EurostileBold"'],
    },
    extend: {
      backgroundImage: {
        // bodyBG: "url('images/epnb-background.png')",
        shapet: "url('images/shape-t.svg')",
        shapeb: "url('images/shape-b.svg')",
        dots: "url('images/dots.svg')",
        newslettter_bg: "url('images/newsletter-bg.png')",
        newslettter_bg_mob: "url('images/bg-mobile-newletter.avif')",
        plus_icon: "url('images/plus-sym.svg')",
        minus_icon: "url('images/minus-sym.svg')",
        job_icon: "url('images/job-portal.png')",
        plus_1: "url('images/plus-icon.svg')",
        minus_1: "url('images/minus-icon.svg')",
        minus_1: "url('images/minus-icon.svg')",
        select_arrow: "url('images/select.svg')",
        search_icon: "url('images/search-line.svg')",

      },
      borderRadius: {
        cta: "var(--cta-border-radius, 1rem)",
      },
      keyframes: {
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        dash: {
          "0%": { transform: "rotate(0deg)", "stroke-dashoffset": 204 },
          "50%": { transform: "rotate(45deg)", "stroke-dashoffset": 52 },
          "100%": { transform: "rotate(360deg)", "stroke-dashoffset": 204 },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
