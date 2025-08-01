/* ----- Imports ----- */
import { ref, shallowRef, markRaw } from "vue";
import { watch } from "vue";
import { useToast } from "primevue";

/* ----- View Imports ----- */
import AddSection from "../../../components/ProgramBuiderVIews/AddDialogs/ProgramComponents/AddSection.vue";
import AddCategory from "../../../components/ProgramBuiderVIews/AddDialogs/ProgramComponents/AddCategory.vue";
import AddProgramElective
    from "../../../components/ProgramBuiderVIews/AddDialogs/ProgramComponents/AddProgramElective.vue";
import AddGeneralElective
    from "../../../components/ProgramBuiderVIews/AddDialogs/ProgramComponents/AddGeneralElective.vue";

/* ----- Logic Imports ----- */
import {ProgramComponent} from "../../ProgramClasses/ProgramComponents/ProgramComponent.ts";

export function useAddProgramComponentDialogLogic(dialogVisible: boolean,
                                                  addCallback: (programComponent: ProgramComponent) => void,
                                                  closeCallback: () => void,
                                                  hasProgramElective: () => boolean,
                                                  hasGeneralElective: () => boolean){

    /* ----- View Values ----- */
    // Use PrimeVue's Toast for notifications
    const toast = useToast();

    // Map of program component types to their respective Vue components
    const programComponentMap: Record<string, any> = {
        section: markRaw(AddSection),
        category: markRaw(AddCategory),
        programElective: markRaw(AddProgramElective),
        generalElective: markRaw(AddGeneralElective),
    };

    // Select options
    const options = Object.keys(programComponentMap).map(key => ({
        // Capitalize the first letter of the key for display, and add a space before each uppercase letter
        name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),

        // Use the key as the value
        value: key
    }));

    // Reference to the selected program component type
    const selectedProgramComponentType = ref<string | null>(null);

    // Reference to the active component based on the selected program component type
    const activeComponent = shallowRef();

    // Reference to the component instance
    const activeComponentRef = ref();

    /* ----- Dialog Logic ----- */
    /**
     * Watch for changes in the dialog visibility.
     * When the dialog is opened, set the default selected program component type to 'section'.
     */
    watch(() => dialogVisible, (newValue) => {
        if (newValue) {
            // Set the default selected program component to Section
            selectedProgramComponentType.value = 'section';
        }
    });

    /**
     * Watch for changes in the selected program component type.
     * When it changes, update the active component to the corresponding Vue component.
     */
    watch(selectedProgramComponentType, (newValue) => {
        if (!newValue) {
            activeComponent.value = null;
            return;
        }

        activeComponent.value = programComponentMap[newValue];
    });

    /**
     * Callback function to handle the addition of a new program component.
     * It invokes the addCallback with the component instance and closes the dialog.
     */
    function onAdd() {
        // Check if a program component type is selected
        if (!activeComponentRef.value) {
            toast.add({severity: 'error', summary: 'Error', detail: 'No component selected', life: 3000});
            return;
        }

        // Check if the active component exists and has a method to get the course entry
        if (!activeComponentRef.value || typeof activeComponentRef.value.getProgramComponent !== 'function') {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Program Component not properly initialized.',
                life: 3000
            });
            return;
        }

        // Check if the selected program component type is 'programElective' and if a program elective already exists
        if (selectedProgramComponentType.value === 'programElective' && hasProgramElective()) {

            // If so, show an error message
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'A Program Elective already exists in the program.',
                life: 3000
            });
            return;
        }

        // Check if the selected program component type is 'generalElective' and if a general elective already exists
        if (selectedProgramComponentType.value === 'generalElective' && hasGeneralElective()) {

            // If so, show an error message
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'A General Elective already exists in the program.',
                life: 3000
            });
            return;
        }

        // Get the course entry from the active component
        const programComponent = activeComponentRef.value.getProgramComponent();

        // Call the add callback with the component instance
        addCallback(programComponent);

        // Close the dialog
        closeCallback();
    }

    return {
        /* State Variables */
        options,
        selectedProgramComponentType,
        activeComponent,
        activeComponentRef,
        programComponentMap,

        /* Methods */
        onAdd
    }

}