import type {Ref} from "vue";
import {ref} from "vue";
import {Program} from "./ProgramClasses/Program.ts";
import {type JSONProgram, ProgramFactory} from "./Factories/ProgramFactory.ts";

import.meta.glob('./ProgramClasses/*/*.ts', { eager: true });

/**
 * Handles managing a program. This includes any changes to the program, such as deleting a section, category or course.
 */
export class ProgramController {
    program: Ref<Program | null> = ref(null);

    /**
     * Constructor for the programController class, requires a JSON object representing the program to build the program.
     */
    constructor() {}

    /**
     * Load a program from a JSON object.
     */
    public async loadProgramFromJSON(loadedProgram: JSONProgram): Promise<void> {
        this.program.value = await ProgramFactory.buildProgramFromLoaded(loadedProgram);
    }

    /**
     * Converts the current program to a JSON object.
     * @returns A JSON representation of the program.
     */
    public toJSON(): JSONProgram {
        const programJSON: JSONProgram = ProgramFactory.buildJSONFromProgram(this.program.value as Program);

        return programJSON;
    }

    /* ---- Getters and Setters ---- */
    getProgram(): Program {
        return this.program.value as Program;
    }

}