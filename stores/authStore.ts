import { ALL_QUERY } from "@/graphql/queries";
import type { User } from "~/src/generated/graphql";
export const useAuthStore = defineStore("auth", () => {
  // State
  const token = ref(useCookie("token").value);
  const allUsers = ref<any>([]);
  const authenticated = ref<boolean>(token.value ? true : false);
  const name = ref(useCookie("name"));
  const role = ref(useCookie("role").value);
  // Actions
  function getAllProducts(users: any) {
    allUsers.value = users.value;
  }
  function addUser(user: any) {
    allUsers.value = [...allUsers.value, user.value];
  }

  return {
    token,
    getAllProducts,
    allUsers,
    addUser,
    authenticated,
    name,
    role
  };
});
