<script setup lang="ts">
/* PrimeVue imports */
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import {Skeleton} from "primevue";
import { useToast } from 'primevue/usetoast';

/* View imports */
import SectionView from './ComponentViews/SectionView.vue'
import CategoryView from './ComponentViews/CategoryView.vue';
import ProgramElectiveView from "./ComponentViews/ProgramElectiveView.vue";
import GeneralElectiveView from "./ComponentViews/GeneralElectiveView.vue";

/* Logic imports */
import {ProgramController} from '../../consumables/ProgramController.ts';

/* Temporary JSON loading */
// Load in ../../resources/example_program.json as a JSON object
import exampleProgram from '../../resources/example_program.json';
import AddComponent from "../shared/AddComponent.vue";

// Import all ProgramBlock Views
const controller: ProgramController = new ProgramController(exampleProgram);

const toast = useToast();

const componentMap: Record<string, any> = {
  section: SectionView,
  category: CategoryView,
  generalElectives: GeneralElectiveView,
  programElectives: ProgramElectiveView
};

function deleteComponent(componentID: string) {
  toast.add({ severity: 'success', summary: 'Component Deleted', detail: `${controller.getProgram().getComponentByID(componentID)?.getTitle()} has been deleted.` , life: 3000});
  controller.getProgram().removeComponentByID(componentID);
}

</script>

<template>
  <Toast />
    <div class="program-section" v-if="controller.getProgram()">
        <div class="program-header">
            <div class="program-header-top">
                <h1 class="program-title"> {{ controller.getProgram().getName() }} </h1>
                <div class="edit-menu">
                    <Button type="button" icon="pi pi-pencil" class="edit-button" @click=""/>
                </div>
            </div>
            <div class="program-description">
                <p class="program-code"> {{ controller.getProgram().getCode() }}</p>
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
          <AddComponent text="Add Component"></AddComponent>
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

<style scoped>
.program-section {
    .program-header {
        border-radius: 1rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;

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

                --p-button-primary-background: var(--surface-color);
                --p-button-primary-hover-background: var(--surface-light-color-alt);
                --p-button-primary-active-background: var(--surface-light-color-alt);

                --p-button-primary-border-color: var(--surface-color);
                --p-button-primary-hover-border-color: var(--surface-light-color-alt);
                --p-button-primary-active-border-color: var(--surface-light-color-alt);

                .edit-button {
                    width: 4rem;
                    height: 4rem;
                }
            }
        }


        .program-description {
            display: flex;
            flex-direction: row;
            padding: 0 1rem;
            
            font-size: var(--big-font-size);
            color: var(--text-color);

            .program-code {
                flex: 1;
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