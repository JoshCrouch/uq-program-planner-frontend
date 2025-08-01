<script setup lang="ts">
import { ref } from "vue";
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { CourseOption } from "../../../../consumables/ProgramClasses/CourseEntries/CourseOption.ts";
import { useToast } from "primevue/usetoast";

const toast = useToast();

async function getCourseEntry(): Promise<CourseOption> {

  if (!option1.value || !option2.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Both course codes must be provided.',
      life: 3000
    });
    return Promise.reject(new Error('Both course codes must be provided.'));
  }

  return await CourseOption.fromCourseCodes(
    option1.value,
    option2.value
  );
}

defineExpose({
  getCourseEntry,
})

const option1 = ref<string>('');
const option2 = ref<string>('');

</script>

<template>
  <FloatLabel variant="in">
    <InputText id="course-option1" v-model="option1"></InputText>
    <label for="course-option1">Option 1 Code</label>
  </FloatLabel>
  <FloatLabel variant="in">
    <InputText id="course-option2" v-model="option2"></InputText>
    <label for="course-option2">Option 2 Code</label>
  </FloatLabel>
</template>