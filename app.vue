<template>
  <div>
    <ClientOnly>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { ALL_QUERY } from "@/graphql/queries.ts";
const store = useAuthStore()
const { data } = await useAsyncQuery(ALL_QUERY);
const myData = computed(() => data?.value?.users ?? []);
store.allUsers = myData.value;


</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html {
  font-size: 62.5%;
}
.page-enter-active,
.page-leave-active{
  transition:0.2s all ease-in-out
}
.page-enter-from,
.page-leave-to{
  opacity:0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}
/* a {
  text-decoration: none;
}
ul {
  list-style: none;
} */
/* body{
  background-color: #eeeff1;
} */
</style>
