module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            // navigation: './src/navigation',
            components: './src/components',
            // state: './src/state',
            models: './src/models',
            sagas: './src/sagas',
            screens: './src/screens'
          },
        },
      ],
    ],
  };
};
