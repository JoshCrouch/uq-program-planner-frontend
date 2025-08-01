<script setup lang="ts">

/* PrimeVue imports */
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import FloatLabel from "primevue/floatlabel";

/* Logic imports */
import {
    useAddSectionDialogLogic
} from "../../../consumables/ViewComponentLogic/AddDialogLogic/AddSectionDialogLogic.ts";
import { Section } from "../../../consumables/ProgramClasses/ProgramComponents/Section.ts";
import InputText from "primevue/inputtext";

let { dialogVisible, addCallback, closeCallback } = defineProps<{
  dialogVisible: boolean,
  addCallback: (section: Section) => void;
  closeCallback: () => void;
}>();

const {
    /* State Variables */
    title,
    minUnits,
    maxUnits,

    /* Methods */
    onAdd
} = useAddSectionDialogLogic(addCallback, closeCallback);
</script>

<template>
  <Dialog
      :visible="dialogVisible"
      :modal="true"
      pt:root:class="edit-dialog">
    <template #container>
      <div class="dialog-header">
        <h1>Add Section</h1>
        <Button icon="pi pi-times" class="dialog-close-button" @click="closeCallback()" />
      </div>

      <div class="dialog-content">
          <FloatLabel variant="in">
              <InputText id="section-title" v-model="title"></InputText>
              <label for="section-title">Title</label>
          </FloatLabel>

          <FloatLabel variant="in">
              <InputText id="section-minUnits" v-model="minUnits"></InputText>
              <label for="section-minUnits">Minimum Units</label>
          </FloatLabel>

          <FloatLabel variant="in">
              <InputText id="section-maxUnits" v-model="maxUnits"></InputText>
              <label for="section-maxUnits">Maximum Units</label>
          </FloatLabel>
      </div>

      <Button label="Add"
              class="p-button-primary"
              @click="onAdd()"/>
    </template>

  </Dialog>
</template>

<style>
.edit-dialog {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 80%;
  max-width: 40rem;

  border-radius: 1rem;
  border: 1px solid var(--primary-color);

  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);

  --p-dialog-background: var(--primary-bg-color);
  --p-dialog-color: var(--primary-text-color);
  --p-dialog-border-color: var(--primary-color);

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;


    .dialog-close-button {
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      background-color: var(--primary-bg-color);
      color: var(--text-color);
      border: none;

      &:not(:disabled):hover {
        background-color: var(--surface-light-color-alt);
        color: var(--secondary-text-color);
        border: none;
      }
    }
  }

  .dialog-content {
    flex: 1;
    overflow-y: auto;

    /* Add some spacing between elements */
    * {
      margin: 0.25rem 0;
    }
  }

  .p-inputtext {
    width: 100%;
    height: 3rem;
    border-radius: 0.5rem;
    padding: 0.5rem;

    background-color: var(--surface-color);
    color: var(--text-color);

    border: 1px solid var(--surface-color);

    --p-inputtext-hover-border-color: var(--surface-light-color-alt);
    --p-inputtext-focus-border-color: var(--primary-color);
  }

  .p-select {
    --p-select-background: var(--surface-color);
    --p-select-color: var(--primary-text-color);

    --p-select-border-color: var(--surface-color);
    --p-select-hover-border-color: var(--surface-light-color-alt);
    --p-select-focus-border-color: var(--primary-color);

    width: 100%;

  }

  .input-invalid {
    border-color: var(--error-color) !important;
    box-shadow: 0 0 0.25rem rgba(255, 0, 0, 0.25) !important;
  }

  .p-floatlabel {
    color: var(--text-color);

    --p-floatlabel-focus-color: var(--primary-color);
    --p-floatlabel-color: var(--secondary-text-color);
  }

  .p-button-primary {
    width: 10rem;
    height: 3rem;
    border-radius: 0.5rem;
    align-self: center;
    background-color: var(--primary-bg-color);
    border-color: var(--primary-color);
    color: var(--text-color);

    &:not(:disabled):hover {
      background-color: var(--surface-light-color-alt);
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    &:not(:disabled):active {
      background-color: var(--surface-light-color-alt);
      border-color: var(--primary-color);
      color: var(--secondary-text-color);
    }
  }
}
</style>