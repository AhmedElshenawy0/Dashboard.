<template>
  <div class="navw" :style="{ width: openSideBare ? '180px' : '' }">
    <div class="d-felx flex-column">
      <div
        class="mb-2 d-flex flex-column align-items-center justify-content-center w-100"
      >
        <Icon
          name="material-symbols-light:menu-rounded"
          size="30"
          class="my-icon"
          @click="openSideBare = !openSideBare"
        />
        <h3 :style="{ display: openSideBare ? 'block' : '' }">Dashboard</h3>
      </div>
      <hr />
      <div class="d-flex flex-column gap-3 m-1 mx-sm-3 mt-3 mb-4 mb-sm-1">
        <div>
          <NuxtLink
            @click="openSideBare ? (openSideBare = false) : ''"
            to="/users"
          >
            <Icon class="icons" name="gridicons:multiple-users" size="25" />
            <p :style="{ display: openSideBare ? 'block' : '' }">
              Users
            </p></NuxtLink
          >
        </div>
        <div>
          <NuxtLink
            to="/users/create"
            @click="openSideBare ? (openSideBare = false) : ''"
            ><Icon
              class="icons"
              name="material-symbols:person-add-rounded"
              size="25"
            />
            <p :style="{ display: openSideBare ? 'block' : '' }">
              Create User
            </p></NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const openSideBare = ref<boolean>(false);
</script>

<style scoped lang="scss">
@import "@/assets/style/main.scss";
.navw {
  height: 100%;
  width: 180px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: $main-color;
  // overflow-x: hidden;
  color: #000000;
  padding: 0;
  margin: 0;
  transition: 0.3s;

  h3 {
    font-size: 2.8rem;
    font-weight: 700;
    color: #0d6efd;
    text-align: center;
    width: 100%;
    margin-top: 10px;
    transition: 1s;
  }
  a {
    display: flex;
    align-items: center;
    font-size: 1.7rem;
    color: #000000;
    font-weight: 500;
    border: 1px solid rgb(72, 72, 235);
    padding: 5px;
    margin: 0 auto;
    border-radius: 5px;
    width: 100%;
    gap: 7px;
    p {
      height: 100%;
      margin: 0;
    }
  }

  .my-icon {
    display: none;
    color: #0d6efd;
  }


  @media (max-width: 767px) {
    width: 50px;

    h3 {
      display: none;
    }

    .icons {
    }

    .my-icon {
      display: block;
    }
    a {
      width: fit-content;
      p {
        display: none;
      }
    }
  }
}

.dark-mode .navw {
  background-color: #091a28;
  color: #ebf4f1;
  border: 1px solid white;
  border-radius:10px;
}
.dark-mode a {
    color: #ffffff;
    border: 1px solid rgb(175, 173, 173);
  }
  .dark-mode .my-icon {
    color: #ffffff;
  }
  .dark-mode h3 {
    color: #ffffff;
  }
  
</style>
