module.exports = {
  presets: ['react-app'],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        fileName: false,
        ssr: false,
        pure: true,
      },
    ],
  ],
}
