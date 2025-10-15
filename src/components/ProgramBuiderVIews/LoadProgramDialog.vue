<script setup lang="ts">
/* Vue imports */
import { ref, watch, computed } from "vue";

/* PrimeVue imports */
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";

/* Logic imports */
import type {
  LoadSettings,
  ProgramDetails,
} from "../../consumables/ViewComponentLogic/PageLogic/useProgramCreatorLogic.ts";

const { dialogVisible, closeCallback, onLoad } = defineProps<{
  dialogVisible: boolean;
  closeCallback: () => void;
  onLoad: (loadSettings: LoadSettings) => void;
}>();

const programDetails = ref<ProgramDetails>({
  title: "",
  code: "",
  year: "",
  units: "",
});

const uploadedFile = ref<File | null>(null);

const selectedOption = ref<"upload" | "new" | "local">("upload");

const loadSettings = computed<LoadSettings>(() => ({
  type: selectedOption.value,
  programDetails: programDetails.value,
  file: uploadedFile.value || undefined,
}));

const buttonText = ref<string>("Upload");

watch(selectedOption, (newValue) => {
  if (newValue === "upload") {
    buttonText.value = "Upload";
  } else if (newValue === "new") {
    buttonText.value = "Create";
  } else if (newValue === "local") {
    buttonText.value = "Load";
  }
});

function onFileSelect(event: any) {
  if (event.files && event.files.length > 0) {
    uploadedFile.value = event.files[0];
  }
}
</script>

<template>
  <Dialog :visible="dialogVisible" :modal="true" pt:root:class="edit-dialog">
    <template #container>
      <div class="dialog-header">
        <h1>Load Program</h1>
        <Button
          icon="pi pi-times"
          class="dialog-close-button"
          @click="closeCallback"
        />
      </div>
      <div class="load-options">
        <Button
          label="Upload File"
          icon="pi pi-upload"
          :class="{ active: selectedOption == 'upload' }"
          @click="selectedOption = 'upload'"
        >
        </Button>
        <Button
          label="Create New Program"
          icon="pi pi-plus"
          :class="{ active: selectedOption === 'new' }"
          @click="selectedOption = 'new'"
        >
        </Button>
        <Button
          label="Load from Local Storage"
          icon="pi pi-box"
          :class="{ active: selectedOption == 'local' }"
          @click="selectedOption = 'local'"
        >
        </Button>
      </div>

      <div class="load-menu">
        <div v-if="selectedOption === 'upload'">
          <FileUpload
            mode="basic"
            accept=".json"
            :maxFileSize="1000000"
            @select="onFileSelect"
          />
        </div>
        <div v-if="selectedOption === 'new'">
          <FloatLabel variant="in">
            <InputText id="program-title" v-model="programDetails.title" />
            <label for="program-title">Program Title</label>
          </FloatLabel>

          <FloatLabel variant="in">
            <InputText
              id="program-code"
              v-model="programDetails.code"
              v-keyfilter="/^[A-Za-z0-9-]*$/"
            />
            <label for="program-code">Program Code</label>
          </FloatLabel>

          <FloatLabel variant="in">
            <InputText
              id="program-year"
              v-model="programDetails.year"
              v-keyfilter="/^[0-9]*$/"
            />
            <label for="program-year">Program Year</label>
          </FloatLabel>

          <FloatLabel variant="in">
            <InputText
              id="program-units"
              v-model="programDetails.units"
              v-keyfilter="/^[0-9]*$/"
            />
            <label for="program-units">Program Units</label>
          </FloatLabel>
        </div>
        <div v-if="selectedOption === 'local'">
          <div class="local-option">
            <p>
              Loads the program from local storage, no need to enter anything!
            </p>
          </div>
        </div>
      </div>

      <Button
        :label="buttonText"
        class="p-button"
        @click="onLoad(loadSettings)"
      >
      </Button>
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

  .load-options {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1rem;
  }

  .load-menu {
    padding: 1rem;
    flex: 1;

    * {
      margin: 0.25rem 0;
    }

    .local-option {
      background-color: var(--surface-light-color);
      padding: 1rem;
      border-radius: 1rem;
      color: var(--text-color);
      text-align: center;
      font-size: var(--medium-font-size);
    }
  }

  .active {
    --p-button-primary-background: var(--primary-color-hover);
    --p-button-primary-hover-background: var(--primary-color-alt);
    --p-button-primary-active-background: var(--primary-color);

    --p-button-primary-color: white;
    --p-button-primary-hover-color: white;
    --p-button-primary-active-color: white;
  }
}
</style>
