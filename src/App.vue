<script setup lang="ts">
import TheHeader from "./layout/TheHeader.vue";

</script>


<template>
  <the-header></the-header>
  <section>
    <section>
      <router-view />
    </section>
  </section>
</template>

<style scoped></style>
