<script setup lang="ts">
/* Vue imports */
import { ref, watch } from 'vue';

/* PrimeVue imports */
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";

const selectedOption = ref<string>('upload');

interface ProgramDetails {
    title: string;
    code: string;
    year: string;
    units: string;
}

interface LoadSettings {
    type: 'upload' | 'new' | 'local';
    file?: File;
    programDetails?: ProgramDetails;
}

const programDetails = ref<ProgramDetails>({
    title: '',
    code: '',
    year: '',
    units: ''
});

const buttonText = ref<string>('Upload');

watch(selectedOption, (newValue) => {
    if (newValue === 'upload') {
        buttonText.value = 'Upload';
    } else if (newValue === 'new') {
        buttonText.value = 'Create';
    } else if (newValue === 'local') {
        buttonText.value = 'Load';
    }
});

</script>

<template>
    <Dialog
        :visible="true"
        :modal="true"
        pt:root:class="edit-dialog">
        <template #container>
            <div class="dialog-header">
                <h1>Load Program</h1>
                <Button icon="pi pi-times" class="dialog-close-button" @click="dialogCloseCallback" />
            </div>
            <div class="load-options">
                <Button label="Upload File"
                        icon="pi pi-upload"
                        :class="{active : (selectedOption == 'upload')}"
                        @click="selectedOption = 'upload'">
                </Button>
                <Button label="Create New Program"
                        icon="pi pi-plus"
                        :class="{active : (selectedOption === 'new')}"
                        @click="selectedOption = 'new'">
                </Button>
                <Button label="Load from Local Storage"
                        icon="pi pi-box"
                        :class="{active : (selectedOption == 'local')}"
                        @click="selectedOption = 'local'">
                </Button>
            </div>

            <div class="load-menu">
                <div v-if="selectedOption === 'upload'">
                    <FileUpload ref="fileUpload" mode="basic" accept=".json" :maxFileSize="1000000" @upload="onUpload"/>
                </div>
                <div v-if="selectedOption === 'new'">
                    <FloatLabel variant="in">
                        <InputText id="program-title" v-model="programDetails.title"></InputText>
                        <label for="program-title">Program Title</label>
                    </FloatLabel>

                    <FloatLabel variant="in">
                        <InputText id="program-title" v-model="programDetails.title"></InputText>
                        <label for="program-title">Program Title</label>
                    </FloatLabel>

                    <FloatLabel variant="in">
                        <InputText id="program-code" v-model="programDetails.code"></InputText>
                        <label for="program-code">Program Code</label>
                    </FloatLabel>

                    <FloatLabel variant="in">
                        <InputText id="program-year" v-model="programDetails.year"></InputText>
                        <label for="program-year">Program Year</label>
                    </FloatLabel>
                </div>
                <div v-if="selectedOption === 'load'">

                </div>
            </div>

            <Button :label="buttonText"
                    class="p-button"
                    @click="console.log('Load Program')">
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
    }

    .p-inputtext {
        width: 100%;
        height: 3rem;
        border-radius: 0.5rem;
        padding: 0.5rem;

        background-color: var(--surface-color);
        color: var(--text-color);

        border: 1px solid var(--primary-color);

        &:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0.25rem rgba(0, 123, 255, 0.25);
        }

        --p-inputtext-focus-border-color: var(--primary-color);
    }

    .p-floatlabel {
        color: var(--text-color);

        --p-floatlabel-focus-color: var(--primary-color);
        --p-floatlabel-color: var(--secondary-text-color);
    }

    .p-button {
        width: 10rem;
        height: 3rem;
        border-radius: 0.5rem;
        align-self: center;

        --p-button-primary-background: var(--primary-bg-color);
        --p-button-primary-hover-background: var(--surface-light-color-alt);
        --p-button-primary-active-background: var(--surface-light-color-alt);

        --p-button-primary-color: var(--primary-text-color);
        --p-button-primary-hover-color: var(--primary-color);
        --p-button-primary-active-color: var(--secondary-text-color);

        --p-button-primary-border-color: var(--primary-color);
        --p-button-primary-hover-border-color: var(--primary-color);
        --p-button-primary-active-border-color: var(--primary-color);

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