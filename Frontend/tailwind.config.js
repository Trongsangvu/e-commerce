export default {
    mode: 'jit',
    content: [
      './src/**/*.{js, jsx, ts, tsx}'
    ],
    theme: {
      extend: {
        fontFamily: {
          'gucci': ['GucciSansPro', 'sans-serif'],
          'poppins': ['Poppins', 'sans-serif'],
          'montserrat': ['Monserrat', 'sans-serif'],
          'poppins-bold': ['Poppins-bold', 'sans-serif']
        },
        colors: {
          'custom-blue': 'rgba(103, 117, 214, 0.8)'
        }
      },
    },
  };
  