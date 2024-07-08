export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore();

  if (
    (to.path == "/" && store.authenticated === false) ||
    (to.path == "/users" && store.authenticated === false) ||
    (to.path == "/users/create" && store.authenticated === false) ||
    (to.params.id && store.authenticated === false)
  ) {
    return navigateTo("/users/register");
  }
});
