<script setup lang="ts">
    import { defineProps } from 'vue';

    const { text, clickCallback } = defineProps<{
        text: string;
        clickCallback: () => void;
    }>();

</script>

<template>
    <div class="add-component" @click="clickCallback">
        <div class="add-button">
            <span class="add-icon"><i class="pi pi-plus"></i></span>
            <span class="add-text">{{ text }}</span>
        </div>
    </div>
</template>

<style scoped>
.add-component {
    --hover-transition-time: 0.15s;

    padding: 1rem;
    display: flex;
    justify-content: center;
    width: 100%;

    background-color: var(--primary-bg-color);
    border: 1px dashed var(--primary-color);
    border-radius: 0.5rem;

    cursor: pointer;

    transition: transform var(--hover-transition-time) ease-in-out, box-shadow var(--hover-transition-time) ease-in-out,
        background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    .add-button {
        background-color: var(--primary-color);
        color: white;
        border-radius: 0.5rem;
        height: 2rem;
        max-width: 2rem;
        display: inline-flex;
        align-items: center;
        transition: max-width var(--hover-transition-time) ease-in-out;

        .add-icon {
            padding: 0 0.5rem;
            display: flex;
            align-items: center;
        }

        .add-text {
            overflow: hidden;
            white-space: nowrap;
            padding: 0;
            transition: padding var(--hover-transition-time) ease-in-out;
        }
    }
}

.add-component:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: var(--surface-color);
    transform: translateY(-2px);

    .add-button {
        background-color: var(--primary-color-hover);
        max-width: 10rem;
    }

    .add-text {
        padding: 0 0.5rem;
    }
}

</style>