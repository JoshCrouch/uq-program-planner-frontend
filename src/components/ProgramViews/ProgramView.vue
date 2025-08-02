<script setup lang="ts">
/* PrimeVue imports */
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Skeleton from "primevue/skeleton";
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';

/* View imports */
import EditDialog from "../ProgramBuiderVIews/EditDialog.vue";
import AddButton from "../ProgramBuiderVIews/AddButton.vue";
import AddProgramComponentDialog from "../ProgramBuiderVIews/AddDialogs/ProgramComponents/AddProgramComponentDialog.vue";

/* Logic imports */
import { ProgramController } from "../../consumables/ProgramController.ts";
import { useProgramViewLogic } from '../../consumables/ViewComponentLogic/ProgramViewLogic/ProgramViewLogic.ts';

/* ----- Props ----- */
const { controller } = defineProps<{
  controller: ProgramController;
}>();

const {
  /* State Variables */
  componentMap,
  editDialogVisible,
  programDialog,
  addProgramComponentDialogVisible,

  /* Methods */
  deleteComponent,
  openEditDialog,
  onEditDialogClose,
  onEditDialogSave,
  onAddButtonClick,
  closeAddProgramComponentDialog
} = useProgramViewLogic(controller);

</script>

<template>
  <!-- Toast for displaying messages -->
  <Toast />

  <!-- Dialog for editing program -->
  <EditDialog dialogHeader="Edit Program Details"
              :dialogVisible="editDialogVisible"
              :dialogCloseCallback="onEditDialogClose"
              :dialogSubmitCallback="onEditDialogSave"
  >
    <FloatLabel variant="in">
      <InputText id="dialog-program-title"
                 v-model="programDialog.title"/>
      <label for="dialog-program-title">Program Title</label>
    </FloatLabel>

    <FloatLabel variant="in">
      <InputText id="dialog-program-code"
                 v-model="programDialog.code"/>
      <label for="dialog-program-code">Program Code</label>
    </FloatLabel>

    <FloatLabel variant="in">
      <InputText id="dialog-program-year"
                 v-model="programDialog.year"/>
      <label for="dialog-program-year">Program Year</label>
    </FloatLabel>

    <FloatLabel variant="in">
      <InputText id="dialog-program-units"
                 v-model="programDialog.units"/>
      <label for="dialog-program-units">Program Units</label>
    </FloatLabel>
  </EditDialog>

  <!-- Dialog for adding program components -->
  <AddProgramComponentDialog  :dialogVisible="addProgramComponentDialogVisible"
                              :addCallback="(programComponent) => controller.getProgram().addComponent(programComponent)"
                              :closeCallback="closeAddProgramComponentDialog"
                              :hasProgramElective="() => controller.getProgram()?.hasProgramElectiveComponent() ?? false"
                              :hasGeneralElective="() => controller.getProgram()?.hasGeneralElectiveComponent() ?? false"/>

  <!-- Program Display -->
  <div class="program-section" v-if="controller.getProgram()">
        <div class="program-header">
            <div class="program-header-top">
                <h1 class="program-title"> {{ controller.getProgram().getName() }} </h1>
                <div class="edit-menu">
                    <Button type="button" icon="pi pi-pencil" class="edit-button" @click="openEditDialog"/>
                </div>
            </div>
            <div class="program-description">
                <p class="program-code"> {{ controller.getProgram().getCode() }}</p>
                <div class="program-units">
                    <span class="units-number">{{ controller.getProgram().getUnits() }}</span>
                    <span class="units-label">units</span>
                </div>
                <p class="program-year"> {{ controller.getProgram().getYear() }}</p>
            </div>
        </div>
        <div class="course-grid">
          <component
            v-for="comp in controller.getProgram().getComponents()"
            :key="comp.getId()"
            :is="componentMap[comp.getType()]"
            :model="comp"
            :deleteCallback="() => deleteComponent(comp.getId())"
          />
          <AddButton :clickCallback="onAddButtonClick" text="Add Component"></AddButton>
        </div>
    </div>

  <!-- Skeleton Loader -->
  <div class="skeleton-program" v-else>
    <div class="skeleton-header">
      <div class="skeleton-header-top">
        <Skeleton class="skeleton-title" height="4rem"/>
      </div>
      <div class="skeleton-description">
        <Skeleton class="skeleton-code" height="2rem"/>
        <Skeleton class="skeleton-year" height="2rem"/>
      </div>
    </div>
    <div class="skeleton-grid">
      <Skeleton class="skeleton-component" height="20rem"/>
      <Skeleton class="skeleton-component" height="20rem"/>
    </div>
  </div>
</template>

<style scoped lang="scss">

.program-section {
  .program-header {
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    margin-bottom: 1rem;

    background-color: var(--primary-bg-color);
    //border: 1px solid var(--primary-color);

    .program-header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .program-title {
      font-size: var(--biggest-font-size);
      text-align: center;
      font-weight: bold;
    }

    .edit-menu {
      width: 4rem;
      height: 4rem;
      border-radius: 0.75rem;

      --p-button-primary-background: var(--primary-bg-color);
      --p-button-primary-hover-background: var(--surface-light-color-alt);
      --p-button-primary-active-background: var(--surface-light-color-alt);

      --p-button-primary-border-color: var(--primary-bg-color);
      --p-button-primary-hover-border-color: var(--surface-light-color-alt);
      --p-button-primary-active-border-color: var(--surface-light-color-alt);

      --p-button-primary-color: var(--text-color);
      --p-button-primary-hover-color: var(--secondary-text-color);
      --p-button-primary-active-color: var(--secondary-text-color);

      --p-button-transition-duration: var(--colour-transition-time);

      .edit-button {
        width: 4rem;
        height: 4rem;

        transition: background-color var(--colour-transition-time) ease-in-out,
                color var(--colour-transition-time) ease-in-out,
                border var(--colour-transition-time) ease-in-out;
      }
    }
  }

    .program-description {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      width: 100%;
      padding: 0 1rem;

      .program-code {
        justify-self: start;
        font-size: var(--big-font-size);
        color: var(--text-color);
      }

      .program-units {
        justify-self: center;
        padding: 0.5rem 0.75rem;
        border-radius: 0.75rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 4rem;
        height: 4rem;
        background-color: var(--primary-color);
        color: white;

        cursor: default;

        &:hover {
          background-color: var(--primary-color-hover);
        }

        .units-number {
          font-size: var(--bigger-font-size);
          font-weight: bold;
          line-height: 1;
        }

        .units-label {
          font-size: var(--small-font-size);
          opacity: 0.9;
          margin-top: 0.1rem;
        }
      }

      .program-year {
        justify-self: end;
        font-size: var(--big-font-size);
        color: var(--text-color);
      }
    }
  }
}

.skeleton-program {
  --p-skeleton-background: var(--surface-light-color-alt);
  --p-skeleton-animation-background: color-mix(in srgb, var(--surface-light-color-alt), var(--surface-color) 80%);
  transition: background-color var(--colour-transition-time) ease-in-out,
  background var(--colour-transition-time) ease-in-out;

  .skeleton-header {
    padding: 1rem;
    display: flex;
    flex-direction: column;

    .skeleton-header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;

      .skeleton-title {
        font-size: var(--biggest-font-size);
        text-align: center;
        font-weight: bold;
      }
    }


    .skeleton-description {
      display: flex;
      flex-direction: row;
      padding: 0 1rem;

      font-size: var(--big-font-size);

      .skeleton-code {
        flex: 1;
      }
    }
  }

  .skeleton-grid {
    .skeleton-component {
      margin: 0.5rem 0;
      border-radius: 1rem;
    }
  }
}

</style>