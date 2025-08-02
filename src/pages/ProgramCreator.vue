<script setup lang="ts">
    import { onMounted } from "vue";
    import { useProgramCreatorLogic } from "../consumables/ViewComponentLogic/PageLogic/useProgramCreatorLogic.ts";
    import ProgramView from "../components/ProgramViews/ProgramView.vue";
    import Button from "primevue/button";
    import LoadProgramDialog from "../components/ProgramBuiderVIews/LoadProgramDialog.vue";

    const {
        /* State Variables */
        controller,

        /* Methods */
        loadProgram,
        saveProgram,
        downloadProgram
    } = useProgramCreatorLogic();

    onMounted(() => {
        loadProgram();
    })
</script>

<template>
    <div class="program-options">

        <Button type="button"
                icon="pi pi-upload"
                label="Load Program"
                @click="loadProgram"/>

        <Button type="button"
                icon="pi pi-save"
                label="Save Program"
                @click="saveProgram"/>

        <Button type="button"
                icon="pi pi-download"
                label="Download Program"
                @click="downloadProgram"/>

    </div>

    <LoadProgramDialog />

    <ProgramView
    :controller="controller"/>
</template>

<style scoped>

</style>