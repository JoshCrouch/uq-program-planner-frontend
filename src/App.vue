<script setup lang="ts">
// UQ ProgramView Planner Frontend
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

#content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.5rem;
}
</style>
