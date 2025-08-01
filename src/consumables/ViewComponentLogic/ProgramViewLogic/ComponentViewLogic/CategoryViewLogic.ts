/* ----- Imports ----- */
import { ref } from 'vue';
import { useToast } from 'primevue';
import {Category} from "../../../ProgramClasses/ProgramComponents/Category.ts";

export function useCategoryViewLogic(model: Category) {

    /* ----- View Values ----- */
    // Use PrimeVue's Toast for notifications
    const toast = useToast();

    // Section's collapsed state
    const isCollapsed = ref(false);

    // Reactive state for the edit dialog visibility and category details
    const editDialogVisible = ref(false);
    const categoryDialog = ref({
        title: '',
        minUnits: '',
        maxUnits: ''
    })

    // Reactive state for the add section dialog
    const addSectionDialogVisible = ref<boolean>(false);

    /* ----- Deletion, Creation and Edit Logic ----- */
    /**
     * Callback function for when a section is deleted, this is passed to each section.
     * @param sectionId The ID of the section to be deleted.
     */
    function sectionDeleteCallback(sectionId: string) {
        toast.add({
            severity: 'success',
            summary: 'Section Deleted',
            detail: `${model.getSectionById(sectionId)?.getTitle()} has been deleted.`,
            life: 3000
        });
        model.removeSectionById(sectionId);
    }

    /**
     * Function to be called when edit button is clicked.
     * Automatically fills the dialog values with the current values of the model.
     */
    function openEditDialog() {
        categoryDialog.value.title = model.getTitle();
        categoryDialog.value.minUnits = model.getMinUnits().toString();
        categoryDialog.value.maxUnits = model.getMaxUnits().toString();

        editDialogVisible.value = true;
    }

    /**
     * Function to be called when the close button is clocked in the edit dialog.
     * Currently, just closes the dialog without saving changes.
     */
    function onDialogClose() {
        editDialogVisible.value = false;
    }

    /**
     * Function to be called when the save button is clicked in the edit dialog.
     * Validates the input fields and updates the model with the new values.
     */
    function onDialogSave() {
        // Make sure all fields are filled
        if (!categoryDialog.value.title || !categoryDialog.value.minUnits || !categoryDialog.value.maxUnits) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill in all fields.',
                life: 3000
            });
            return;
        }

        // Make sure minUnits and maxUnits are valid numbers
        if (isNaN(parseInt(categoryDialog.value.minUnits)) || isNaN(parseInt(categoryDialog.value.maxUnits))) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Min and Max units must be valid numbers.',
                life: 3000
            });
            return;
        }

        // Ensure minUnits is less than or equal to maxUnits
        if (parseInt(categoryDialog.value.minUnits) > parseInt(categoryDialog.value.maxUnits)) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Min units cannot be greater than Max units.',
                life: 3000
            });
            return;
        }

        // Update all values in the model
        model.setTitle(categoryDialog.value.title);
        model.setMinUnits(parseInt(categoryDialog.value.minUnits));
        model.setMaxUnits(parseInt(categoryDialog.value.maxUnits));

        toast.add({
            severity: 'success',
            summary: 'Category Updated',
            detail: `Category ${model.getTitle()} has been updated.`,
            life: 3000
        });

        editDialogVisible.value = false;
    }

    /**
     * Function to be called when the add section button is clicked.
     * Opens the dialog to add a new section.
     */
    function onAddButtonClick(): void {
        // Open the add section dialog
        addSectionDialogVisible.value = true;
    }

    /**
     * Function to close the add section dialog.
     * Currently, it just sets the visibility to false.
     */
    function closeAddSectionDialog(): void {
        // Close the add section dialog
        addSectionDialogVisible.value = false;
    }

    /* ----- Return Values ----- */
    return {
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
    }
}