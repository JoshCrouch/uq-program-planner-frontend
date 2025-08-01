import type {Ref} from "vue";
import {ref} from "vue";
import {Program} from "./ProgramClasses/Program.ts";
import {type JSONProgram, ProgramFactory} from "./Factories/ProgramFactory.ts";

import.meta.glob('./ProgramClasses/*/*.ts', { eager: true });

/*
    Note to self: The idea for this class is that it will handle all the logic for program creation (might need to be renamed accordingly). Additionally,
    each part of the program (sections, categories, courses) will have their own classes which can be used to manage them, however, I would also like
    to implement it in such a way that they can return a vue component that can be used to display them in the UI - such that each part can "build" itself.
    This _should_ leave the ProgramView.vue (the component that will have this controller) pretty empty, most likely just with a <v-for> loop to display each ProgramComponent
    ( in which each component will have been filled out by the typescript classes). It's 11pm, so this might make no sense.
 */

/**
 * Handles managing a program. This includes any changes to the program, such as deleting a section, category or course.
 */
export class ProgramController {
    program: Ref<Program | null> = ref(null);

    /**
     * Constructor for the programController class, requires a JSON object representing the program to build the program.
     * @param loadedProgram The ProgramView object loaded from JSON (this is "generic," using abstract classes).
     */
    constructor(loadedProgram: JSONProgram) {
        this.loadProgramFromJSON(loadedProgram).then(() => {
        });
    }

    /**
     * Load a program from a JSON object.
     */
    public async loadProgramFromJSON(loadedProgram: JSONProgram): Promise<void> {
        this.program.value = await ProgramFactory.buildProgramFromLoaded(loadedProgram);
    }

    public saveProgramToJSON(): JSONProgram {
        return ProgramFactory.buildJSONFromProgram(this.program.value as Program);
    }

    /* ---- Getters and Setters ---- */
    getProgram(): Program {
        return this.program.value as Program;
    }

}