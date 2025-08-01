/* ----- Imports ----- */
import { ref } from "vue";
import { useToast } from "primevue";

/* ----- Logic Imports ----- */
import type {Course} from "../../../ProgramClasses/CourseEntries/Course.ts";

export function useCourseViewLogic(model: Course) {
    /* ----- View Values ----- */
    // Use PrimeVue's Toast for notifications
    const toast = useToast();

    // Reactive state for the edit dialog visibility and course code
    const editDialogVisible = ref<boolean>(false);
    const courseCodeDialog = ref('');

    /* ----- Deletion, Creation and Edit Logic ----- */
    /**
     * Function to be called when edit button is clicked.
     */
    function openEditDialog() {
        // Set the initial value for the dialog
        courseCodeDialog.value = model.getCode();
        editDialogVisible.value = true;
    }

    /**
     * Function to be called when the close button is clicked in the edit dialog.
     * Currently, just closes the dialog without saving changes.
     */
    function onDialogClose() {
        editDialogVisible.value = false;
    }

    function onDialogSave() {
        // Validate the input field
        if (!courseCodeDialog.value) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Course code cannot be empty.',
                life: 3000
            });
            return;
        }

        // Update the course code in the model
        model.setCode(courseCodeDialog.value);
        editDialogVisible.value = false;

        // Notify the user of the successful update
        toast.add({
            severity: 'success',
            summary: 'Course Updated',
            detail: `Course code has been updated to ${model.getCode()}.`,
            life: 3000
        });
    }

    return {
        // State variables
        editDialogVisible,
        courseCodeDialog,

        // Methods
        openEditDialog,
        onDialogClose,
        onDialogSave
    }
}