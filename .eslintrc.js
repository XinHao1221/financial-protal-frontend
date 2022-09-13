// module.exports = {
//   root: true,
//   env: {
//     node: true,
//   },
//   extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
//   parserOptions: {
//     parser: "babel-eslint",
//   },
//   rules: {
//     "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
//     "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
//   },
// };
// module.exports = {
//     root: true,
//     env: {
//         node: true
//     },
//     extends: [
//         'plugin:vue/essential',
//         'eslint:recommended',
//         'plugin:prettier/recommended'
//     ],
//     plugins: ['prettier'],
//     parserOptions: {
//         parser: 'babel-eslint'
//     },
//     rules: {
//         'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//         'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//         'prettier/prettier': 'error'
//     }
// }

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prettier/prettier": 0,
        indent: ["error", 2]
    },
};