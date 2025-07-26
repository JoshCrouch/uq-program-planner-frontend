import { Program } from '../ProgramClasses/Program.ts';
import { ComponentFactory } from "./ComponentFactory.ts";
import type { ProgramComponent } from "../ProgramClasses/ProgramComponents/ProgramComponent.ts";

export interface JSONProgram {
    name: string;
    code: string;
    year: number;
    units: number;
    components: JSONProgramComponent[];
}

export interface JSONProgramComponent {
    id: string;
    type: string;
    title: string;
    minUnits: number;
    maxUnits: number;
    courseEntries?: JSONCourseEntry[];
    sections?: JSONProgramComponent[];
}

export interface JSONCourseEntry {
    type: string;
    optionOne?: string;
    optionTwo?: string;
    code?: string;
}


export class ProgramFactory {
    /**
     * Builds a program from a JSON object.
     * @param loadedProgram The Program object loaded from JSON (this is "generic," using abstract classes).
     * @returns A new Program instance built from the JSON object.
     */
    public static async buildProgramFromLoaded(loadedProgram: JSONProgram): Promise<Program> {

        const program = new Program(loadedProgram.name, loadedProgram.code, loadedProgram.year, loadedProgram.units);

        for (const componentJson of loadedProgram.components) {
            const component: ProgramComponent = await ComponentFactory.createComponentFromJSON(componentJson);
            program.addComponent(component);
        }

        console.log(program);

        return program;
    }
}