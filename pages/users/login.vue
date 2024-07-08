<template>
  <div class="form">
    <h3 class="mb-4">Sign in to your account</h3>
    <form>
      <!-- Email input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <label class="form-label" for="emailInput">Email</label>
        <input
          type="email"
          v-model="email"
          id="emailInput"
          class="form-control"
        />
        <p class="text-danger">{{ errors.email }}</p>
      </div>
      <!-- Password input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="passwordInput">Password</label>
        <input
          type="password"
          v-model="pass"
          id="passwordInput"
          class="form-control"
        />
        <p class="text-danger">{{ errors.pass }}</p>
      </div>
      <button
        @click.prevent="handleClick"
        class="btn btn-primary btn-block mb-4"
      >
        Login
      </button>

      <div class="text-center">
        <p class="create-account">
          Create Account? <NuxtLink to="/users/register">Register </NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { User } from "~/src/generated/graphql";
import { GET_PROFILE } from "~/graphql/queries";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
// Custom Layout
definePageMeta({
  layout: "custom",
});
// Validation
const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    pass: yup.string().min(8).required(),
  }),
});

const [email, emailAttrs] = defineField<string>("email");
const [pass, passAttrs] = defineField<string>("pass");
const store = useAuthStore();
// Register Mutation
const {
  mutate: CreateContactItem,
  onDone,
  onError,
} = useMutation(
  gql`
    mutation ($email: String!, $pass: String!) {
      login(email: $email, password: $pass) {
        access_token
        refresh_token
      }
    }
  `,
  () => ({
    variables: {
      email: values?.email,
      pass: values?.pass,
    },
  })
);
// Handle submit
const handleClick = handleSubmit(() => {
  const user = store.allUsers?.find((ele) => ele?.email === values?.email);
  console.log(user);

  if (!user) {
    toast.warning(`this user ${values?.email} is not exist. Please sign up`, {
      autoClose: 3000,
    });
    email.value = "";
    pass.value = "";
  } else {
    CreateContactItem();
    useCookie("userId").value = user?.id;
    email.value = "";
    pass.value = "";
  }
});
onDone(async (res) => {
  console.log("done graph");
  useCookie("token").value = res?.data?.login?.access_token;
  store.authenticated = true;
  toast.success("Login successfuly", { autoClose: 2000 });

  // store.allUsers.push(res?.data.addUser);
  setTimeout(() => {
    useRouter().push("/users");
  }, 2000);
});
onError((res) => {
  console.log("error graph");
  console.log(res.message);
  toast.error("The Username or Password is Incorrect. Try again.", {
    autoClose: 2000,
  });
});
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  background-color: white;
  height:100vh;
  h3 {
    font-size: 2.5rem;
    font-weight: bold;
    color:blue;
  }

  form {
    width: 80%;
    padding: 20px;
    border-radius: 10px;
  }
  input,
  label {
    font-size: 1.6rem;
    color: gray;
  }

  button {
    width: 100%;
    padding: 10px 0;
    font-size: 1.6rem;
  }

  .create-account {
    font-size: 1.3rem;
  }
}
</style>
