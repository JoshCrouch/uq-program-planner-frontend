<script setup lang="ts">
// UQ ProgramView Planner Frontend
import Header from "./components/shared/Header.vue";
import Toast from "primevue/toast";
</script>

<template>
  <div id="app">
    <!-- Toast for displaying messages -->
    <Toast />
    <Header />
    <div id="content">
      <router-view />
      <!--            <BuilderPage/>-->
    </div>
  </div>
</template>

<style scoped>
#content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.5rem;
}
</style>
