// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    baseURL: "",
    buildAssetsDir: "assets",
  },
  modules: ["@nuxt/ui", "@nuxtjs/i18n"],
  ui: {
    global: true,
    icons: ["mdi", "simple-icons"],
  },
  i18n: {
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
      { code: "tr", iso: "tr-TR", name: "Türkçe", file: "tr.json" },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "lang/",
    strategy: "prefix_except_default",
    vueI18n: "./i18n.options.ts",
  },
});
