<script setup lang="ts">
// UQ Program Planner Frontend
import Header from './components/shared/Header.vue';
import ProgramCreator from './pages/ProgramCreator.vue';

</script>

<template>
  <div id="app">
    <Header />
    <div id="content">
      <ProgramCreator />
    </div>
  </div>
</template>

<style scoped>

#app {
  background-color: var(--surface-color);
}

#content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--surface-color);
  color: var(--primary-text-color);
  border-radius: 0.5rem;
}
</style>
