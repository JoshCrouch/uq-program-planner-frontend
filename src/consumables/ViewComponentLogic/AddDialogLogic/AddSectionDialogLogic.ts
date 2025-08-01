/* ----- Imports ----- */
import {ref } from "vue";
import { useToast } from "primevue/usetoast";

/* ----- Logic Imports ----- */
import { Section } from "../../ProgramClasses/ProgramComponents/Section.ts";

export function useAddSectionDialogLogic(addCallback: (section: Section) => void,
                                         closeCallback: () => void) {

    /* ----- View Values ----- */
    // Use PrimeVue's Toast for notifications
    const toast = useToast();

    // Section details
    const title = ref<string>("");
    const minUnits = ref<string>("");
    const maxUnits = ref<string>("");

    function onAdd(): void {
        // Validate the input values
        if (!title.value) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'A title is required.',
                life: 3000
            });
            return;
        }

        if (!minUnits.value) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'minUnits is required.',
                life: 3000
            });
            return;
        }

        if (!maxUnits.value) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'maxUnits is required.',
                life: 3000
            });
            return;
        }

        const section = new Section(
            title.value.replace(/\s+/g, '-'),
            title.value,
            parseInt(minUnits.value),
            parseInt(maxUnits.value)
        );

        addCallback(section);

        closeCallback();
    }

    return {
        /* State Variables */
        title,
        minUnits,
        maxUnits,

        /* Methods */
        onAdd
    }
}