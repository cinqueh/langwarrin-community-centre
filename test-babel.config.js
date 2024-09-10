// this is the config for babel that should only be used during testing

module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic' // Enables JSX transforms
      }
    ],
    '@babel/preset-env',
    '@babel/preset-typescript'
  ]
};