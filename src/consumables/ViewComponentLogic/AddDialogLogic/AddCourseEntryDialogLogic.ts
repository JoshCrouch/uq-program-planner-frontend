/* ----- Imports ----- */
import { ref, shallowRef, markRaw } from "vue";
import { watch } from "vue";
import { useToast } from "primevue";

/* ----- View Imports ----- */
import AddSingular
    from "../../../components/ProgramBuiderVIews/AddDialogs/CourseEntries/AddSingular.vue";
import AddOption
    from "../../../components/ProgramBuiderVIews/AddDialogs/CourseEntries/AddOption.vue";

/* ----- Logic Imports ----- */
import { CourseEntry } from "../../ProgramClasses/CourseEntries/CourseEntry.ts";

export function useAddCourseEntryDialogLogic(dialogVisible: boolean,
                                             addCallback: (courseEntry: CourseEntry) => void,
                                             closeCallback: () => void) {

    /* ----- View Values ----- */
    // Use PrimeVue's Toast for notifications
    const toast = useToast();

    // Map of course entry types to their respective Vue components
    const courseEntryMap: Record<string, any> = {
        singular: markRaw(AddSingular),
        option: markRaw(AddOption),
    };

    // Select options - built from the keys of courseEntryMap, such that name is capitalized key, and value is the key
    const options = Object.keys(courseEntryMap).map(key => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: key
    }));

    // Reference to the selected course entry type
    const selectedCourseEntryType = ref<string | null>(null);

    // Reference to the active component based on the selected course entry type
    const activeComponent = shallowRef();

    // Reference to the component instance
    const activeComponentRef = ref();

    /* ----- Dialog Logic ----- */
    /**
     * Watch for changes in the dialog visibility.
     * When the dialog is opened, set the default selected course entry type to 'singular'.
     */
    watch(() => dialogVisible, (newValue) => {
        if (newValue) {
            // Set the default selected course entry to Singular Course Entry
            selectedCourseEntryType.value = 'singular';
        }
    })

    /**
     * Watch for changes in the selected course entry type.
     * When it changes, update the active component to the corresponding Vue component.
     */
    watch(selectedCourseEntryType, (newValue) => {
        if (!newValue) {
            activeComponent.value = null;
            return;
        }

        activeComponent.value = courseEntryMap[newValue] || null;
    })

    /**
     * Function to handle when the add button is pressed.
     * Doesn't handle any verification, other than checking if a course entry type is selected.
     */
    async function onAdd(): Promise<void> {
        if (!selectedCourseEntryType.value || !activeComponent.value) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please select a course entry type before adding.',
                life: 3000
            });
            return;
        }

        // Check if the active component exists and has a method to get the course entry
        if (!activeComponentRef.value || typeof activeComponentRef.value.getCourseEntry !== 'function') {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Course Entry not properly initialized.',
                life: 3000
            });
            return;
        }

        // Get the course entry from the active component
        const courseEntry = await activeComponentRef.value.getCourseEntry();

        // Call the addCallback with the course entry instance
        addCallback(courseEntry);

        // Close the dialog
        closeCallback();
    }

    return {
        /* State Variables */
        options,
        selectedCourseEntryType,
        activeComponent,
        activeComponentRef,
        courseEntryMap,

        /* Methods */
        onAdd
    }



}
