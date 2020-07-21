module.exports = {
  plugins: ['@ant-design-vue/babel-plugin-jsx'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    ['@babel/preset-typescript'],
  ],
}
