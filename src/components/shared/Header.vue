<script setup lang="ts">
import { ref, watchEffect, onMounted, watch } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';

const isDarkTheme = ref(false);

// Apply the theme class on html element
watchEffect(() => {
  document.documentElement.classList.toggle('dark-theme', isDarkTheme.value);
  document.documentElement.classList.toggle('light-theme', !isDarkTheme.value);
});

// Initialize from localStorage or system preference
onMounted(() => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    isDarkTheme.value = true;
  } else if (saved === 'light') {
    isDarkTheme.value = false;
  } else if (window.matchMedia) {
    isDarkTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
});

// Persist to localStorage on change
watch(isDarkTheme, (val) => {
  localStorage.setItem('theme', val ? 'dark' : 'light');
});
</script>

<template>
    <header class="app-header">
        <h1>UQ Program Planner</h1>
        <ToggleSwitch v-model="isDarkTheme">
            <template #handle="{ checked }">
                <i class="p-toggle-switch-handle-icon" :class="{ 'pi pi-moon': checked, 'pi pi-sun': !checked }" />
            </template>
        </ToggleSwitch>
    </header>
</template>

<style scoped>
.app-header {
    background: linear-gradient(90deg, #51247a 0%, 87%, #962a8b 100%);
    color: white;
    padding: 0.25rem 4rem;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;

    /* Set mode swapping icons */
    --p-toggleswitch-handle-checked-color: var(--primary-text-color);
    --p-toggleswitch-handle-checked-hover-color: var(--opposite-primary-text-color);
    --p-toggleswitch-handle-checked-background: transparent;
    --p-toggleswitch-handle-checked-hover-background: transparent;
    --p-toggleswitch-checked-background: var(--surface-color);
    --p-toggleswitch-checked-hover-background: var(--opposite-surface-color);

    --p-toggleswitch-handle-color: var(--primary-text-color);
    --p-toggleswitch-handle-hover-color: var(--opposite-primary-text-color);
    --p-toggleswitch-handle-background: transparent;
    --p-toggleswitch-handle-hover-background: transparent;
    --p-toggleswitch-background: var(--surface-color);
    --p-toggleswitch-hover-background: var(--opposite-surface-color);

    --p-toggleswitch-transition-duration: 0.3s; /* Transition duration for toggleswitch */

}

.p-toggleswitch, .p-toggleswitch-input, .p-toggleswitch-slider, .p-toggleswitch-handle {
    transition: all 3s ease-in-out;
}

</style>