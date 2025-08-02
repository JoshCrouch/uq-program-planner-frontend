/* ----- Imports ----- */
import { ref } from 'vue';
import { useToast } from 'primevue';
import { ProgramController } from '../../ProgramController.ts';

/* ----- View Imports ----- */
import SectionView from "../../../components/ProgramViews/ComponentViews/SectionView.vue";
import CategoryView from "../../../components/ProgramViews/ComponentViews/CategoryView.vue";
import ProgramElectiveView from "../../../components/ProgramViews/ComponentViews/ProgramElectiveView.vue";
import GeneralElectiveView from "../../../components/ProgramViews/ComponentViews/GeneralElectiveView.vue";

export function useProgramViewLogic(controller: ProgramController) {

    /* ----- View Values ----- */
    // Use PrimeVue's Toast for notifications
    const toast = useToast();

    // Map of component types to their respective Vue components
    const componentMap: Record<string, any> = {
        section: SectionView,
        category: CategoryView,
        generalElectives: GeneralElectiveView,
        programElectives: ProgramElectiveView
    };

    // Reactive state for the edit dialog visibility and program details
    const editDialogVisible = ref<boolean>(false);
    const programDialog = ref({
        title: '',
        code: '',
        year: '',
        units: ''
    });

    const addProgramComponentDialogVisible = ref<boolean>(false);

    /* ----- Deletion, Creation and Edit Logic ----- */
    /**
     * Callback function for a component when deleted.
     * @param componentID The ID of the component to be deleted.
     */
    function deleteComponent(componentID: string) {
        toast.add({ severity: 'success', summary: 'Component Deleted', detail: `${controller.getProgram().getComponentByID(componentID)?.getTitle()} has been deleted.` , life: 3000});
        controller.getProgram().removeComponentByID(componentID);
    }

    /**
     * Function to be called when the edit button is clicked.
     * Automatically fills the dialog values with the current values of the program.
     */
    function openEditDialog() {
        // Set initial values for the dialog
        programDialog.value.title = controller.getProgram().getName();
        programDialog.value.code = controller.getProgram().getCode();
        programDialog.value.year = controller.getProgram().getYear().toString();
        programDialog.value.units = controller.getProgram().getUnits().toString();

        editDialogVisible.value = true;
    }

    /**
     * Function to be called when the save button is clicked in the edit dialog.
     */
    function onEditDialogClose() {
        editDialogVisible.value = false;
    }

    /**
     * Function to be called when the save button is clicked in the edit dialog.
     * Validates the input fields and updates the program with the new values.
     */
    function onEditDialogSave() {
        // Make sure all fields are filled
        if (!programDialog.value.title || !programDialog.value.code || !programDialog.value.year || !programDialog.value.units) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields.', life: 3000 });
            return;
        }

        // Make sure year and units are numbers
        if (isNaN(parseInt(programDialog.value.year)) || isNaN(parseInt(programDialog.value.units))) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Year and Units must be numbers.', life: 3000 });
            return;
        }

        // Check if the details have changes
        if (controller.getProgram().getName() === programDialog.value.title &&
            controller.getProgram().getCode() === programDialog.value.code &&
            controller.getProgram().getYear() === parseInt(programDialog.value.year) &&
            controller.getProgram().getUnits() === parseInt(programDialog.value.units)) {
            toast.add({ severity: 'info', summary: 'No Changes', detail: 'No changes were made to the program details.', life: 3000 });
            editDialogVisible.value = false;
            return;
        }

        const program = controller.getProgram();
        program.setName(programDialog.value.title);
        program.setCode(programDialog.value.code);
        program.setYear(parseInt(programDialog.value.year));
        program.setUnits(parseInt(programDialog.value.units));

        toast.add({ severity: 'success', summary: 'ProgramView Updated', detail: 'ProgramView details have been updated.', life: 3000 });

        editDialogVisible.value = false;
    }

    /**
     * Function to be called when the "Add Component" button is clicked.
     * Opens the dialog for adding a new program component.
     */
    function onAddButtonClick() {
        addProgramComponentDialogVisible.value = true;
    }

    /**
     * Function to close the add course entry dialog.
     * This is called when the dialog's close button is clicked.
     */
    function closeAddProgramComponentDialog() {
        addProgramComponentDialogVisible.value = false;
    }

    /* ----- Return Values ----- */
    return {
        /* State Variables */
        componentMap,
        editDialogVisible,
        programDialog,
        addProgramComponentDialogVisible,

        /* Methods */
        deleteComponent,
        openEditDialog,
        onEditDialogClose,
        onEditDialogSave,
        onAddButtonClick,
        closeAddProgramComponentDialog
    }
}