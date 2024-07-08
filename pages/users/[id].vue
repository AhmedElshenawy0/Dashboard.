<template>
  <div class="user">
    <div class="info d-flex flex-column align-items-center mt-5">
      <NuxtImg :src="user?.avatar" width="160" class="image" height="160" />
      <h3>{{ user?.name }}</h3>
      <p class="email">{{ user?.email }}</p>
      <p class="role">{{ user?.role }}</p>
      <div class="mt-4 d-flex gap-2">
        <button class="btn btn-outline-success" @click="isUpdate = true">
          Edit
        </button>
        <button
          class="btn btn-outline-danger"
          @click="handleLogout"
          v-if="cookieId == userId"
        >
          Log out
        </button>
        <button
          class="btn btn-outline-danger"
          @click="deleteUser"
          v-if="cookieId == userId"
        >
          Delete Account
        </button>
      </div>
    </div>

    <div class="form" v-if="isUpdate">
      <h3 class="mb-4">Update User</h3>
      <form>
        <!-- Name input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="nameInput">Name</label>
          <input
            type="name"
            v-model="name"
            id="nameInput"
            class="form-control"
          />
          <p class="error">{{ errors.name }}</p>
        </div>
        <!-- Email input -->
        <div data-mdb-input-init class="form-outline mb-4">
          <label class="form-label" for="emailInput">Email</label>
          <input
            type="email"
            v-model="email"
            id="emailInput"
            class="form-control"
          />
          <p class="error">{{ errors.email }}</p>
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
          <p class="error">{{ errors.pass }}</p>
        </div>
        <button
          @click.prevent="handleUpdate"
          class="btn btn-primary btn-block mb-4"
        >
          Update
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SINGLE_USER_QUERY, ALL_QUERY } from "@/graphql/queries.ts";
import type { User } from "~/src/generated/graphql";

import { useRoute } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
// Custom Layout

// Validation
const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().min(3, "Name must be at least 3 characters"),
    email: yup.string().email("Email must be a valid email"),
    pass: yup.string().min(8, "Password must be at least 8 characters"),
  }),
});

const [name, nameAttrs] = defineField<string>("name");
const [email, emailAttrs] = defineField<string>("email");
const [pass, passAttrs] = defineField<string>("pass");
const store = useAuthStore();
const userId = ref(useRoute().params.id);
console.log(userId);
const cookieId = useCookie("userId");

// Get Single User
const { data } = await useAsyncQuery(SINGLE_USER_QUERY, {
  id: useRoute().params.id,
});
const user = ref<User>(data?.value?.user);
const isUpdate = ref<boolean>(false);

// Handle Updating Function
const handleUpdate = () => {
  // Update Mutation
  const {
    mutate: updateUser,
    onDone,
    onError,
    loading,
  } = useMutation(
    gql`
      mutation ($id: ID!, $data: UpdateUserDto!) {
        updateUser(id: $id, changes: $data) {
          id
          email
          password
          name
          role
          avatar
          creationAt
          updatedAt
        }
      }
    `,
    () => ({
      variables: {
        data: {
          name: values?.name,
          email: values?.email,
          password: values?.pass,
        },
        id: userId.value,
      },
      refetchQueries: [
        {
          query: ALL_QUERY,
        },
      ],
    })
  );

  onDone((res) => {
    console.log("done graph");
    console.log(res?.data?.updateUser);
    user.value = res?.data?.updateUser;
    console.log(loading.value);
    isUpdate.value = false;
    toast.success(`User has been updated successfuly`, {
      autoClose: 3000,
    });
    if (cookieId.value == userId.value) {
      useCookie("name").value = res?.data?.updateUser.name;
      useCookie("role").value = res?.data?.updateUser.role;
      store.name = res?.data?.updateUser.name;
      console.log('same');
      
    }

    // useRouter().push('/users')
  });
  onError((res) => {
    console.log("error graph");
    console.log(res.message);
  });
  updateUser();
};

// Handel Logout function
const handleLogout = () => {
  store.authenticated = false;
  useCookie("token").value = null;
  useRouter().push("/users/login");
};

// Delete user
const {
  mutate: Delete,
  onDone,
  onError,
} = useMutation(
  gql`
    mutation ($id: ID!) {
      deleteUser(id: $id)
    }
  `,
  () => ({
    variables: {
      id: userId.value,
    },
    refetchQueries: [
      {
        query: ALL_QUERY,
      },
    ],
  })
);
onDone(() => {
  console.log("deleted");
  store.allUsers = store.allUsers.filter(
    (ele: User) => ele.id != cookieId.value
  );
});
onError(() => {
  console.log("not deleted");
});
const deleteUser = () => {
  try {
    Delete();
    store.authenticated = false;
    useCookie("token").value = null;
    useCookie("name").value = null;
    useCookie("userId").value = null;
    useRouter().push("/users/register");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/style/main.scss";
.user {
  width: 100%;

  .info {
    background-color: $main-color;
    padding: 10px 0;
    h3 {
      font-size: 3rem;
      font-weight: bold;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }
    .image {
      border-radius: 50%;
      margin-bottom: 15px;
    }
  }

  .form {
    background-color: $main-color;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    height: 80%;
    margin: 20px auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .error {
        color: red;
      }
    }
    h3 {
      margin: 0 auto;
      width: fit-content;
      font-size: 1.9rem;
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
  }
}
.dark-mode .info {
  background-color: $dark-color;
  color: $main-color;
  border: 1px solid $main-color;
}
.dark-mode .form {
  background-color: $dark-color;
  color: $main-color;
  border: 1px solid $main-color;
}
</style>
