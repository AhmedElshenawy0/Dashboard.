// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/apollo",
    "@nuxt/image",
    "@nuxt/icon",
    "nuxt-graphql-request",
    "@pinia/nuxt",
    "nuxt-build-cache",
    "@nuxtjs/color-mode",
  ],
  css: ["~/assets/style/main.scss"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://api.escuelajs.co/graphql",
      },
    },
  },
  components: true,
  app: {
    pageTransition: { name: "page", mode: "in-out" },
  },
});
