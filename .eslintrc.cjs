module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  plugins: ['vue'],
  rules: {
    // Vue 相关
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'warn',
    'vue/attributes-order': ['warn', {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        ['UNIQUE', 'SLOT'],
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT'
      ],
      alphabetical: false
    }],
    'vue/component-tags-order': ['warn', {
      order: ['template', 'script', 'style']
    }],
    'vue/block-lang': ['error', {
      script: { lang: 'js' }
    }],
    'vue/component-api-style': ['warn', ['script-setup', 'composition']],

    // 通用规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'no-undef': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
    'eqeqeq': ['warn', 'always', { null: 'ignore' }],
    'curly': ['warn', 'multi-line'],
    'arrow-body-style': ['warn', 'as-needed'],
    'object-shorthand': 'warn',
    'array-callback-return': 'warn'
  },
  overrides: [
    // 共享包 .js 文件允许没有 vue 组件名
    {
      files: ['packages/**/*.js'],
      rules: {
        'vue/one-component-per-file': 'off'
      }
    },
    // vite 配置文件
    {
      files: ['**/vite.config.*', '**/vite-env.d.ts'],
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.vite/',
    '.__mf__temp/',
    '*.d.ts'
  ]
}
