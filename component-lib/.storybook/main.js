const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    'storybook-dark-mode',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(scss|sass)$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
