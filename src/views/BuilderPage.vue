<script setup lang="ts">
import { useProgramCreatorLogic } from "../consumables/ViewComponentLogic/PageLogic/useProgramCreatorLogic.ts";
import ProgramView from "../components/ProgramViews/ProgramView.vue";
import Button from "primevue/button";
import LoadProgramDialog from "../components/ProgramBuiderVIews/LoadProgramDialog.vue";

const {
  /* State Variables */
  controller,
  dialogVisible,

  /* Methods */
  saveProgram,
  downloadProgram,

  closeDialog,
  openDialog,
  onLoad,
} = useProgramCreatorLogic();
</script>

<template>
  <div class="program-options">
    <Button
      type="button"
      icon="pi pi-upload"
      label="Load Program"
      class="button"
      @click="openDialog"
    />

    <Button
      type="button"
      icon="pi pi-save"
      label="Save Program"
      class="button"
      @click="saveProgram"
    />

    <Button
      type="button"
      icon="pi pi-download"
      label="Download Program"
      class="button"
      @click="downloadProgram"
    />
  </div>

  <LoadProgramDialog
    :dialogVisible="dialogVisible"
    :closeCallback="closeDialog"
    :onLoad="onLoad"
  />

  <ProgramView :controller="controller" />
</template>

<style scoped>
.program-options {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

.button {
  transition:
    background-color 0.3s ease-in-out,
    color 0.3s ease-in-out,
    border-color 0.3s ease-in-out;
}
</style>
