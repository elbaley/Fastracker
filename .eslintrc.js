module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/no-unstable-nested-components': 'off',
  },
  env: {
    jest: true,
  },
};
