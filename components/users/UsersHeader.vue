<template>
  <div class="top-side d-flex align-items-center gap-4">
    <div
      class="search d-flex align-items-center justify-content-between flex-grow-1"
    >
      <h4>Welcome, {{ store.name }}! 👋</h4>
      <div :class="$colorMode.preference == 'light' ? 'dark' : 'light'">
        <Icon
          :name="`${
            $colorMode.preference == 'light'
              ? 'material-symbols:dark-mode'
              : 'material-symbols:light-mode-outline-rounded'
          }`"
          color="black"
          size="17"
          @click="
            setColorMode($colorMode.preference == 'light' ? 'dark' : 'light')
          "
        />
      </div>
    </div>
    <div class="profile d-flex align-items-center gap-3">
      <NuxtImg
        class="image"
        width="40"
        height="40"
        src="https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
      />
      <div class="info">
        <h4 class="name">
          {{ useCookie("name") }}
        </h4>
        <p>{{ userRole }}</p>
      </div>
      <div style="cursor: pointer" @click="open = !open">
        <Icon
          :name="`${
            open
              ? 'material-symbols:arrow-circle-up'
              : 'material-symbols:arrow-circle-down-rounded'
          }`"
          color="black"
          size="15"
        />
      </div>
      <div class="setting" v-if="open">
        <button class="btn btn-outline-success" @click="open = false">
          <NuxtLink :to="`/users/${userId}`">View profile </NuxtLink>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const store = useAuthStore();

const open = ref<boolean>(false);
const userId = ref(useCookie("userId"));
const routeId = ref(useRoute().params.id);
const userName = ref(store.name);
const userRole = ref(useCookie("role"));

// Toggle color Mode
const colorMode = useColorMode();

const setColorMode = (newTheme: string) => {
  useColorMode().preference = newTheme;
};
</script>

<style scoped lang="scss">
@import "@/assets/style/main.scss";

.top-side {
  background-color: $main-color;
  padding: 1rem;
  border-radius: 1rem;
  position: relative;

  .image {
    border-radius: 50%;
  }
  input {
    border: none;
    outline: none;
    padding: 10px;
    background-color: $bg-color;
  }
  .icon {
    border: 1px solid $secondary-color;
    width: 25px;
    height: 25px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .setting {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    top: 90%;
    right: 0;
    background-color: $main-color;
    width: 150px;
    border: 1px solid black;
  }
  .dark,
  .light {
    border: 1px solid blue;
    display: flex;
    padding: 4px;
    border-radius: 3px;
    cursor:pointer;
  }
  .light {
    box-shadow: 0 0 3px white;
  }
  .dark {
    box-shadow: 0 0 3px #000000;
  }
  a {
    width: 100%;
    display: block;
    &:hover {
      color: white;
    }
  }
}

.dark-mode .top-side {
  background-color: #091a28;
  color: #ebf4f1;
  border: 1px solid white;
}
</style>
