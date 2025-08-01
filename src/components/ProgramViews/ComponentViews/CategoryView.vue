<script setup lang="ts">
/* PrimeVue imports */
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";

/* View imports */
import SectionView from "./SectionView.vue";
import AddButton from '../../ProgramBuiderVIews/AddButton.vue';
import EditButton from '../../ProgramBuiderVIews/EditButton.vue'
import EditDialog from "../../ProgramBuiderVIews/EditDialog.vue";

/* Logic import */
import { Category } from '../../../consumables/ProgramClasses/ProgramComponents/Category';
import { useCategoryViewLogic } from "../../../consumables/ViewComponentLogic/ProgramViewLogic/ComponentViewLogic/CategoryViewLogic.ts";
import AddSectionDialog from "../../ProgramBuiderVIews/AddDialogs/AddSectionDialog.vue";

/* ----- Props ----- */
const { model, deleteCallback } = defineProps<{
  model: Category;
  deleteCallback: () => void;
}>();

const {
  // State variables
  isCollapsed,
  editDialogVisible,
  categoryDialog,
  addSectionDialogVisible,

  // Methods
  sectionDeleteCallback,
  openEditDialog,
  onDialogClose,
  onDialogSave,
  onAddButtonClick,
  closeAddSectionDialog
} = useCategoryViewLogic(model);
</script>

<template>
    <!-- Dialog for editing section -->
  <EditDialog dialogHeader="Edit Program Details"
              :dialogVisible="editDialogVisible"
              :dialogCloseCallback="onDialogClose"
              :dialogSubmitCallback="onDialogSave"
  >
    <FloatLabel variant="in">
      <InputText id="dialog-category-title"
                 v-model="categoryDialog.title"/>
      <label for="dialog-category-title">Category Title</label>
    </FloatLabel>

    <FloatLabel variant="in">
      <InputText id="dialog-category-minUnits"
                 v-model="categoryDialog.minUnits"/>
      <label for="dialog-category-minUnits">Category Minimum Units</label>
    </FloatLabel>

    <FloatLabel variant="in">
      <InputText id="dialog-category-maxUnits"
                 v-model="categoryDialog.maxUnits"/>
      <label for="dialog-category-maxUnits">Category Maximum Units</label>
    </FloatLabel>

  </EditDialog>

    <AddSectionDialog   :dialogVisible="addSectionDialogVisible"
                        :addCallback="(section) => {model.addSection(section)}"
                        :closeCallback="closeAddSectionDialog"/>

  <div class="program-section">

    <div class="section-header">

      <h2 class="section-title">{{ model.getTitle() }}</h2>

      <div class="section-header-right">

        <span class="course-units">
          <span class="units-number">{{ model.getMinUnits() }}</span>
          <span class="units-label">min</span>
        </span>

        <span class="course-units">
          <span class="units-number">{{ model.getMaxUnits() }}</span>
          <span class="units-label">max</span>
        </span>

        <!-- collapse toggle styled as badge -->
        <span class="collapse-toggle" @click="isCollapsed = !isCollapsed">
          <i
              class="collapse-icon pi pi-chevron-up chevron-icon"
              :class="{ collapsed: isCollapsed }"
          />
        </span>

        <span class="edit-menu">
          <EditButton :editCallback="openEditDialog" :deleteCallback="deleteCallback" />
        </span>

      </div>
    </div>

    <transition name="collapse">
      <div v-show="!isCollapsed" class="collapse-content course-grid">
        <SectionView
          v-for="section in model.getSections()"
          :key="section.getId()"
          :model="section"
          :deleteCallback="() => sectionDeleteCallback(section.getId())"
          />
        <div class="add-course">
          <AddButton :clickCallback="onAddButtonClick" :text="'Add Section'"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.program-section {
  border: 1px solid var(--primary-color);
  border-radius: 1.5rem;
  padding: 1rem;
  margin: 1rem 0;

  background-color: var(--primary-bg-color);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .section-title {
      font-size: var(--bigger-font-size);
      font-weight: bold;
      color: var(--text-color);
    }

    .section-header-right {
      display: flex;
      align-items: center;

      * {
        margin: 0 0.5rem;
      }

      .course-units {
        padding: 0.5rem 0.75rem;
        border-radius: 0.75rem;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 4rem;
        height: 4rem;

        cursor: default;

        background-color: var(--primary-color);
        color: white;

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

      .collapse-toggle {
        display: flex;
        width: 4rem;
        height: 4rem;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        border-radius: 0.75rem;
        color: var(--primary-text-color);

        transition: background-color var(--colour-transition-time) ease-in-out;

        &:hover {
          background-color: var(--surface-light-color-alt);
        }
      }

      .edit-menu {
        display: flex;
        width: 4rem;
        height: 4rem;
        border-radius: 0.75rem;
      }
    }
  }

  .section-meter {
    .completion-meter {
      padding: 1rem 0;
    }
  }
}

.course-grid {
  display: grid;
  grid-template-columns: 1fr;
}

/* Collapse transition styles */
.collapse-content {
  overflow: hidden;
  padding-top: 1rem;
}
.collapse-enter-active, .collapse-leave-active {
  transition: max-height 0.3s ease-in-out, opacity var(--colour-transition-time) ease-in-out;
}
.collapse-enter-from, .collapse-leave-to {
  max-height: 0;
}
.collapse-enter-to, .collapse-leave-from {
  max-height: 1000px;
}

/* Chevron rotation */
.chevron-icon {
  display: inline-block;
  transform-origin: center;
  transition: transform 0.3s ease-in-out;
}
.chevron-icon.collapsed {
  transform: rotate(180deg);
}

.collapse-toggle:hover .chevron-icon {
  transform: scale(1.1);
}

.collapse-toggle:hover .chevron-icon.collapsed {
  transform: rotate(180deg) scale(1.1);
}
</style>