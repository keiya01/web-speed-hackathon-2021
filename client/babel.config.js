module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        targets: {
          chrome: '90',
        },
        useBuiltIns: 'usage',
      },
    ],
    ['@babel/preset-react'],
  ],
};
