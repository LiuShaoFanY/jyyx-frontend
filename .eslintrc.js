module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    webpack: "readonly", // 允许 webpack 作为全局变量
    HtmlWebpackPlugin: "readonly", // 允许 HtmlWebpackPlugin 作为全局变量
    VueLoaderPlugin: "readonly", // 允许 VueLoaderPlugin 作为全局变量
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
