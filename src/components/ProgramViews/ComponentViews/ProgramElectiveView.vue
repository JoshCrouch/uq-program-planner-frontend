<script setup lang="ts">
import { ProgramElective } from "../../../consumables/ProgramClasses/ProgramComponents/ProgramElective.ts";

// Props
const { model, deleteCallback } = defineProps<{
  model: ProgramElective;
  deleteCallback: () => void
}>();

</script>

<template>
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

        <span class="delete-button" @click="deleteCallback">
          <i class="delete-icon pi pi-trash"/>
        </span>

      </div>
    </div>

    <div class="program-elective-text">
      <p>Choose any course from any option (major, minor, etc) of this program.</p>
    </div>
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

      .delete-button {
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

    }
  }

  .program-elective-text {
    background-color: var(--surface-light-color);
    border-radius: 1rem;
    padding: 1rem;

    font-size: var(--big-font-size);
    text-align: center;

    cursor: default;

    &:hover {
      background-color: var(--surface-light-color-alt);
    }
  }
}
</style>