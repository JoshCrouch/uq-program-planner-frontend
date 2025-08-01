<script setup lang="ts">
import { ref } from "vue";
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { useToast } from "primevue/usetoast";
import { Category } from "../../../../consumables/ProgramClasses/ProgramComponents/Category.ts";

const toast = useToast();

function getProgramComponent(): Category {
  if (!title.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Title must be provided.',
      life: 3000
    });
    throw new Error('Title must be provided.');
  }

  if (!minUnits.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Minimum units must be provided.',
      life: 3000
    });
    throw new Error('Minimum units must be provided.');
  }

  if (!maxUnits.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Maximum units must be provided.',
      life: 3000
    });
    throw new Error('Maximum units must be provided.');
  }

  return new Category(
      title.value.replace(/\s+/g, '-'),
      title.value,
      parseInt(minUnits.value),
      parseInt(maxUnits.value)
  )
}

defineExpose({
  getProgramComponent,
})

const title = ref<string>('');
const minUnits = ref<string>('');
const maxUnits = ref<string>('');
</script>

<template>
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

</template>