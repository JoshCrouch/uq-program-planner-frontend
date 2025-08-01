<script setup lang="ts">
/* PrimeVue imports */
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";

/* View imports */
import EditButton from '../../ProgramBuiderVIews/EditButton.vue';
import EditDialog from "../../ProgramBuiderVIews/EditDialog.vue";

/* Logic imports */
import { Course } from '../../../consumables/ProgramClasses/./CourseEntries/Course.ts';
import { useCourseViewLogic } from "../../../consumables/ViewComponentLogic/ProgramViewLogic/CourseEntryViewLogic/CourseViewLogic.ts";

const { model, deleteCallback } = defineProps<{
    model: Course;
    deleteCallback: () => void;
}>();

const {
    editDialogVisible,
    courseCodeDialog,
    openEditDialog,
    onDialogClose,
    onDialogSave
} = useCourseViewLogic(model);

</script>

<template>
  <EditDialog dialogHeader="Edit Program Details"
              :dialogVisible="editDialogVisible"
              :dialogCloseCallback="onDialogClose"
              :dialogSubmitCallback="onDialogSave"
  >
    <FloatLabel variant="in">
      <InputText id="dialog-category-title"
                 v-model="courseCodeDialog"/>
      <label for="dialog-category-title">CourseCode</label>
    </FloatLabel>

  </EditDialog>

  <div class="course-card" :class="{ 'course-card-error': (model.getErrorMessage() !== null )}">

      <div class="course-info">
          <span class="course-title">{{ model.getTitle() }}</span>
          <span class="course-code">{{ model.getCode() }}</span>
      </div>
      <div class="course-card-right">
          <span class="course-units" v-if="!model.getErrorMessage()">
              <span class="units-number">{{ model.getUnits() }}</span>
              <span class="units-label">units</span>
          </span>
          <span class="edit-menu">
              <EditButton :editCallback="openEditDialog" :deleteCallback="deleteCallback" />
          </span>
      </div>
  </div>
</template>

<style scoped>
.course-card {
  /* Custom transition durations */
  --move-on-hover-transition-time: 0.15s;

  padding: 1rem;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;

  align-items: center;

  background-color: var(--primary-bg-color);
  border-radius: 1rem;
  border: 1px solid var(--primary-color);

  transition:
  transform var(--move-on-hover-transition-time) ease-in-out,
  background-color var(--colour-transition-time) ease-in-out,
  color var(--colour-transition-time) ease-in-out,
  box-shadow var(--move-on-hover-transition-time) ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .course-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0; /* Prevents flex item from overflowing */

    .course-title {
      font-size: var(--big-font-size);
      font-weight: bold;
      color: var(--primary-text-color);
      white-space: normal; /* Ensure text can wrap */
      word-wrap: break-word; /* Break long words */
    }

    .course-code {
      font-size: var(--small-font-size);
      color: var(--secondary-text-color);
      margin-top: 0.25rem;
    }
  }

  .course-card-right {
    display: flex;
    margin-left: 1rem;
    align-items: center;

    .course-units,
    .edit-menu {
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
  }

  .edit-menu {
    width: 4rem;
    height: 4rem;
    border-radius: 0.75rem;

    display: flex;
  }
}

/* Error state styling - red theme */
.course-card-error {
  border-color: var(--error-color);

  color: var(--error-color);

  &:hover {
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.2);
    transform: translateY(-2px);
  }

  .course-title {
    color: var(--error-color) !important;
  }
}
</style>
