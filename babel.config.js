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
            // screens: './src/screens',
            // navigation: './src/navigation',
            components: './src/components',
            // state: './src/state',
            models: './src/models',
            sagas: './src/sagas'
          },
        },
      ],
    ],
  };
};
