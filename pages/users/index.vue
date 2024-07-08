<template>
  <div class="users-container">
    <div class="users mt-3 p-3">
      <table class="table align-middle mb-0 bg-white p-2">
        <thead class="bg-light">
          <tr>
            <th class="users-head">Users</th>
            <th class="headings">NAME</th>
            <th class="headings">ROLE</th>
            <th class="headings">SIGN IN</th>
            <th class="headings">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in store.allUsers.slice(startIndex, finishIndex)"
            :key="user.id"
            class="user"
          >
            <td>
              <div
                class="name d-flex justify-content-sm-start align-items-sm-start align-items-center justify-content-center flex-column flex-sm-row"
              >
                <NuxtImg
                  :src="user.avatar"
                  width="45"
                  height="45"
                  class="image"
                />
                <div class="m-sm-3">
                  <p class="fw-bold mb-1">{{ user?.name }}</p>
                  <p class="mb-0">{{ user?.email }}</p>
                </div>
              </div>
            </td>
            <td>
              <p class="fw-medium mb-1">{{ user?.role }}</p>
            </td>
            <td>
              <p class="fw-normal mb-1">
                {{ new Date(user?.creationAt).toDateString() }}
              </p>
            </td>
            <td class="">
              <NuxtLink :to="`/users/${user?.id}`">
                <button class="btn btn-primary mb-1 d-block">View</button>
              </NuxtLink>
              <button class="btn btn-danger" @click="deleteUser(user?.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination-container">
        <ul class="d-flex">
          <!-- <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li> -->
          <li
            :class="currentPage == num ? 'active' : 'page-num'"
            v-for="num in pages"
            :key="num"
            @click="handleClick(num)"
          >
            <a>{{ num }}</a>
          </li>
          <!-- <li class="page-item">
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click="currentPage > total && handleClick(currentPage + 1)"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ALL_QUERY } from "@/graphql/queries";
import type { User } from "~/src/generated/graphql";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const store = useAuthStore();

const { data } = await useAsyncQuery(ALL_QUERY, {
  fetchPolicy: "cache-and-network",
  nextFetchPolicy: "cache-first",
});
const users = computed((): User[] => data?.value?.users ?? []);

store.allUsers = users.value;

// =====> Pagination <===== //

const currentPage = ref(1);
const limit = ref(10);
const total = computed(() => {
  if (Array.isArray(store.allUsers)) {
    return store.allUsers.length;
  } else {
    return 0;
  }
});

const pages = computed(() => Math.ceil(total.value / limit.value));
const startIndex = ref((currentPage.value - 1) * limit.value);
const finishIndex = ref(currentPage.value * limit.value);

// const numPages = ref();

const handleClick = (num: any) => {
  currentPage.value = num;
  finishIndex.value = currentPage.value * limit.value;
  startIndex.value = (currentPage.value - 1) * limit.value;

  window.scrollTo({ top: 0, behavior: "smooth" });
  console.log(finishIndex.value);
};

// Delete user
const deleteUser = (id) => {
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
        id: id,
      },
      refetchQueries: [
        {
          query: ALL_QUERY,
        },
      ],
    })
  );

  Delete();

  onDone(() => {
    console.log("deleted");
    store.allUsers = store.allUsers.filter((ele) => ele.id != id);
    toast.success(`User has been deleted successfuly`, {
      autoClose: 3000,
    });
  });
  onError(() => {
    console.log("not deleted");
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/style/main.scss";
.users-container {
  width: 100%;
  border-radius: 10px;
  scroll-behavior: smooth;
  .users {
    background-color: $main-color;
    border-radius: 1rem;

    .user {
      @media (max-width: 767px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: center;
        border: 1px solid blue;
        border-radius: 20px;
        margin: 10px 0;
      }
    }
    .image {
      border-radius: 50%;
    }
    button {
      width: 6rem;
    }
    tr {
      .users-head {
        display: none;
      }
      td {
        font-weight: 500;
      }
      @media (max-width: 767px) {
        .users-head {
          display: block;
          margin-bottom: 10px;
          font-size: 1.5rem;
        }
        .headings {
          display: none;
        }
        td {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          border: none !important;
          .name {
            text-align: center;
          }
        }
      }
    }
  }

  .pagination-container {
    margin-top: 15px;

    ul {
      list-style: none;
      gap: 5px;
      .page-num {
        border: 1px solid rgb(143, 141, 236);
        padding: 3px 5px;
        border-radius: 3px;
        cursor: pointer;
      }
      .active {
        background-color: blue;
        padding: 3px 7px;
        border-radius: 3px;
        cursor: pointer;
        color: white;
      }
    }
  }
}
.dark-mode .users {
  color: $main-color;
  background-color: $dark-color;
}
.dark-mode th {
  color: $main-color;
  background-color: $dark-color;
}
.dark-mode td {
  color: $main-color;
  background-color: $dark-color;
}
.dark-mode tbody {
  color: $main-color;
  background-color: $dark-color;
}
.dark-mode tr {
  background-color: $dark-color;
}
.dark-mode p {
  color: $main-color;
}
.dark-mode thead tr {
  background-color: $dark-color;
}
.dark-mode tbody tr {
  border-color: $main-color;
}
</style>
