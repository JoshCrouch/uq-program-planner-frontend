/* ----- Imports ----- */
import { useToast } from 'primevue';
import { ProgramController } from '../../ProgramController.ts';
import type {JSONProgram} from "../../Factories/ProgramFactory.ts";

export function useProgramCreatorLogic() {

    /* ----- View Values ----- */
    // Use PrimeVue's Toast for notifications
    const toast = useToast();

    // Reactive state for the program controller
    const controller = new ProgramController();

    /* ----- Storage Logic ----- */
    async function loadProgram(): Promise<void> {
        const programJSON: JSONProgram | null = await getProgramJSON();

        if (!programJSON) {
            toast.add({
                severity: 'warn',
                summary: 'No Program Found',
                detail: 'No program found in local storage. Please create a new program.',
                life: 3000
            });
            return;
        }

        controller.loadProgramFromJSON(programJSON).then();

    }

    async function saveProgram(): Promise<void> {
        try {
            const programJSON = controller.toJSON();
            localStorage.setItem('program', JSON.stringify(programJSON));
            toast.add({ severity: 'success',
                        summary: 'Program Saved',
                        detail: 'Your program has been saved successfully.',
                        life: 3000 });
        } catch (error: any) {
            toast.add({ severity: 'error',
                        summary: 'Save Error',
                        detail: `Could not save program: ${error.message}`, life: 3000 });
            throw new Error("Could not save program: " + error.message);
        }
    }

    async function getProgramJSON(): Promise<JSONProgram | null> {
        try {
            const programJSON = localStorage.getItem('program');
            if (programJSON) {
                return JSON.parse(programJSON);
            } else {
                toast.add({ severity: 'warn',
                            summary: 'No Program Found',
                            detail: 'No program found in local storage. Please create a new program.',
                            life: 3000 });
                return null;
            }
        } catch (error: any) {
            toast.add({ severity: 'error',
                        summary: 'Retrieval Error',
                        detail: `Could not retrieve program: ${error.message}`, life: 3000 });
            throw new Error("Could not retrieve program: " + error.message);
        }
    }

    async function downloadProgram(): Promise<void> {
        const programJSON = controller.toJSON();
        const blob = new Blob([JSON.stringify(programJSON, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'program.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return {
        /* State Variables */
        controller,

        /* Methods */
        loadProgram,
        saveProgram,
        downloadProgram
    }
}