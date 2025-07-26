<script setup lang="ts">

/* View imports */
import CourseView from './CourseView.vue';

/* Logic imports */
import {CourseOption} from "../../../consumables/ProgramClasses/./CourseEntries/CourseOption.ts";

const { model } = defineProps<{
    model: CourseOption;
    deleteCallback: () => void;
}>();

</script>

<template>
    <div class="option-course-card">
        <CourseView
            class="course-card"
            :model="model.getOption(1)"
            :deleteCallback="() => deleteCallback()"
        />
        <div class="or-text">
            <span class="or-text-span">
                <h1>OR</h1>
            </span>
        </div>

        <CourseView
            class="course-card"
            :model="model.getOption(2)"
            :deleteCallback="() => deleteCallback()"
        />
    </div>
        
</template>

<style scoped>

.option-course-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
}

.course-card {
    flex: 1;
}

.or-text {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto; /* Prevents it from growing */
}

.or-text-span {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--small-font-size);
  background-color: var(--surface-light-color-alt);
  padding: 0 1rem;
  border-radius: 1rem;

  cursor: default;

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }

}

</style>