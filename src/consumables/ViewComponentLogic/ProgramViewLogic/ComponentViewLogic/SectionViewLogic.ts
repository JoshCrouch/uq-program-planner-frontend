/* ----- Imports ----- */
import { ref } from 'vue';
import { useToast } from 'primevue';

/* ----- View Imports ----- */
import CourseView from "../../../../components/ProgramViews/CourseEntryViews/CourseView.vue";
import CourseOptionView from "../../../../components/ProgramViews/CourseEntryViews/CourseOptionView.vue";

/* ----- Logic Imports ----- */
import { Section } from "../../../ProgramClasses/ProgramComponents/Section.ts";
import {CourseEntry} from "../../../ProgramClasses/CourseEntries/CourseEntry.ts";

export function useSectionViewLogic(model: Section) {

    /* ----- View Values ----- */
    // Use PrimeVue's Toast for notifications
    const toast = useToast();

    // Section's collapsed state
    const isCollapsed = ref(false);

    // Map of course entry types to their respective Vue components
    const courseEntryMap: Record<string, any> = {
        singular: CourseView,
        option: CourseOptionView
    };

    // Reactive state for the edit dialog visibility and section details
    const editDialogVisible = ref<boolean>(false);
    const sectionDialog = ref({
        title: '',
        minUnits: '',
        maxUnits: ''
    });

    // Reactive state for the add course entry dialog
    const addCourseEntryDialogVisible = ref<boolean>(false);

    /* ----- Deletion, Creation and Edit Logic ----- */
    /**
     * Callback function for when a course entry is deleted.
     * @param courseEntry The course entry that was deleted.
     */
    function courseEntryDeleteCallback(courseEntry: CourseEntry) {
        toast.add({
            severity: 'success',
            summary: 'Course Deleted',
            detail: `${courseEntry.getTitle()} has been deleted from ${model.getTitle()}.`,
            life: 3000
        });
        model.removeCourseEntry(courseEntry);
    }

    /**
     * Function to be called when edit button is clicked.
     * Automatically fills the dialog values with the current values of the model.
     */
    function openEditDialog() {
        sectionDialog.value.title = model.getTitle();
        sectionDialog.value.minUnits = model.getMinUnits().toString();
        sectionDialog.value.maxUnits = model.getMaxUnits().toString();

        editDialogVisible.value = true;
    }

    /**
     * Function to be called when the close button is clocked in the edit dialog.
     * Currently, just closes the dialog without saving changes.
     */
    function onEditDialogClose() {
        editDialogVisible.value = false;
    }

    /**
     * Function to be called when the save button is clicked in the edit dialog.
     * Validates the input fields and updates the model with the new values.
     */
    function onEditDialogSave() {
        // Make sure all fields are filled
        if (!sectionDialog.value.title || !sectionDialog.value.minUnits || !sectionDialog.value.maxUnits) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill in all fields.',
                life: 3000
            });
            return;
        }

        // Make sure minUnits and maxUnits are valid numbers
        if (isNaN(parseInt(sectionDialog.value.minUnits)) || isNaN(parseInt(sectionDialog.value.maxUnits))) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Min and Max units must be valid numbers.',
                life: 3000
            });
            return;
        }

        // Ensure minUnits is less than or equal to maxUnits
        if (parseInt(sectionDialog.value.minUnits) > parseInt(sectionDialog.value.maxUnits)) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Min units cannot be greater than Max units.',
                life: 3000
            });
            return;
        }

        // Update all values in the model
        model.setTitle(sectionDialog.value.title);
        model.setMinUnits(parseInt(sectionDialog.value.minUnits));
        model.setMaxUnits(parseInt(sectionDialog.value.maxUnits));

        toast.add({
            severity: 'success',
            summary: 'Category Updated',
            detail: `Category ${model.getTitle()} has been updated.`,
            life: 3000
        });

        editDialogVisible.value = false;
    }

    /**
     * Function to be called when the add button is clicked.
     * Opens the dialog for adding a new course entry.
     */
    function onAddButtonClick(): void {
        addCourseEntryDialogVisible.value = true;
    }

    /**
     * Function to close the add course entry dialog.
     * This is called when the dialog's close button is clicked.
     */
    function closeAddCourseEntryDialog(): void {
        addCourseEntryDialogVisible.value = false;
    }

    /* ----- Return Values ----- */
    return {
        // State variables
        isCollapsed,
        courseEntryMap,
        editDialogVisible,
        sectionDialog,
        addCourseEntryDialogVisible,

        // Methods
        courseEntryDeleteCallback,
        openEditDialog,
        onEditDialogClose,
        onEditDialogSave,
        onAddButtonClick,
        closeAddCourseEntryDialog
    }

}