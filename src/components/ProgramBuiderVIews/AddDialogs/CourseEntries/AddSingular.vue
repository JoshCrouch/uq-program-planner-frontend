<script setup lang="ts">
import { ref } from "vue";
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { Course } from "../../../../consumables/ProgramClasses/CourseEntries/Course.ts";
import { useToast } from "primevue/usetoast";

const toast = useToast();

async function getCourseEntry(): Promise<Course> {
  if (!courseCode.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Course code must be provided.',
      life: 3000
    });
    return Promise.reject(new Error('Course code must be provided.'));
  }

  return await Course.fromCourseCode(courseCode.value);
}

defineExpose({
  getCourseEntry,
})

const courseCode = ref<string>('');

</script>

<template>
  <FloatLabel variant="in">
    <InputText id="course-code" v-model="courseCode"></InputText>
    <label for="course-code">Course Code</label>
  </FloatLabel>
</template>