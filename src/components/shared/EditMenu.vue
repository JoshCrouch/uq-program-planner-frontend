<script setup lang="ts">
    import { ref } from 'vue';
    import Menu from 'primevue/menu';
    import Button from 'primevue/button';


    const { editCallback, deleteCallback } = defineProps<{
        editCallback: () => void;
        deleteCallback: () => void;
    }>();

    // Edit Menu Items
    var editMenuItems = [
        {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => {
                editCallback();
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                deleteCallback();
            }
        }
    ];

    // Popup menu ref
    const menu = ref<Menu | null>(null);
    // Open edit menu
    function toggleMenu(event: MouseEvent) {
        menu.value?.toggle(event);
    }
</script>

<template>
        <Button type="button" icon="menu-button pi pi-pencil" @click="toggleMenu"/>
        <Menu ref="menu" id="overlay-menu" :model="editMenuItems" popup :panelClass="'my-popup-menu'" />
</template>

<style scoped>
.p-button {
    color: var(--primary-text-color);
    background-color: transparent;
    border: none;

    width: 100%;
    height: 100%;

    border-radius: inherit;

    &:not(:disabled):hover {
        background-color: var(--surface-light-color-alt);
        border: none;
    }
}
</style>