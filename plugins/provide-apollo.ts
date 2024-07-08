import {useAuthStore} from "~/stores/authStore"

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()
  nuxtApp.hook("apollo:auth", ({ client, token }) => {
    token.value =
      `Bearer ${useCookie("token").value}`;
  });
});
