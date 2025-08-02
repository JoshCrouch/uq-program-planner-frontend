<script setup lang="ts">
import { ref, watchEffect, onMounted, watch } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';
import Button from 'primevue/button';

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

const page = ref('builder');

</script>

<template>
    <header class="app-header">

        <div class="header-item">
            <Button icon="pi pi-bars"
                    class="p-button"
                    @click="console.log('Menu toggled')"
                    aria-label="Toggle Menu" />
        </div>

        <div class="header-item header-title">
            <h1>UQ Program Planner</h1>
        </div>

        <div class="header-item">
            <ToggleSwitch class="toggle-switch" v-model="isDarkTheme">
                <template #handle="{ checked }">
                    <i class="p-toggle-switch-handle-icon" :class="{ 'pi pi-moon': checked, 'pi pi-sun': !checked }" />
                </template>
            </ToggleSwitch>
        </div>

    </header>
    <div class="page-tabs">
        <div class="tab"
            :class="{ active: page === 'builder' }"
             @click="page = 'builder'">
            Builder
        </div>
        <div class="tab"
            :class="{ active: page === 'planner' }"
             @click="page = 'planner'">
            Planner
        </div>
    </div>
</template>

<style scoped>
.app-header {
    background: linear-gradient(90deg, #51247a 0%, 87%, #962a8b 100%);
    color: white;
    padding: 1rem 4rem;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .p-button {
        width: 4rem;
        height: 4rem;

        --p-button-primary-background: transparent;
        --p-button-primary-hover-background: var(--primary-color-hover);
        --p-button-primary-active-background: var(--primary-color-alt);

        --p-button-primary-border-color: none;
        --p-button-primary-hover-border-color: none;
        --p-button-primary-active-border-color: none;

        --p-button-primary-color: white;
        --p-button-primary-hover-color: white;
        --p-button-primary-active-color: white;

        --p-icon-size: var(--bigger-font-size);
    }

    .toggle-switch {
        --p-inputtext-focus-ring-width: 4rem;

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

        --p-toggleswitch-transition-duration: 0.3s; /* Transition duration for toggle switch */
    }

    .header-item {
        width: 4rem;
    }

    .header-title {
        flex: 1;
        text-align: center;
    }
}

.page-tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--surface-light-color-alt);
    padding: 0 0;

    .tab {
        width: 100%;
        height: 4rem;

        background-color: var(--surface-light-color);

        border-radius: 1rem 1rem 0 0;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: var(--bigger-font-size);
        font-weight: 600;

        cursor: pointer;
    }

    .active {
        background: var(--primary-bg-color);
    }
}

</style>