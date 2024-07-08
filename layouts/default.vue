<template>
  <div class="layout d-flex" style="margin:2rem">
    <GlobalNav />
    <div class="content">
      <UsersHeader />
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content{
  margin-left: 200px;
  width: calc(100% - 200px);

  @media (max-width:767px) {
    margin-left: 40px;
  width: 100% ;
  }
}
</style>