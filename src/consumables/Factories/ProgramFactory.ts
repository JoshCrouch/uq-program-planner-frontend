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
     * @param loadedProgram The ProgramView object loaded from JSON (this is "generic," using abstract classes).
     * @returns A new ProgramView instance built from the JSON object.
     */
    public static async buildProgramFromLoaded(loadedProgram: JSONProgram): Promise<Program> {

        const program = new Program(loadedProgram.name, loadedProgram.code, loadedProgram.year, loadedProgram.units);

        for (const componentJson of loadedProgram.components) {
            const component: ProgramComponent = await ComponentFactory.createComponentFromJSON(componentJson);
            program.addComponent(component);
        }

        return program;
    }

    /**
     * Builds a JSON object from a Program instance.
     * @param program The Program instance to convert to JSON.
     */
    public static buildJSONFromProgram(program: Program): JSONProgram {
        const jsonProgram: JSONProgram = {
            name: program.getName(),
            code: program.getCode(),
            year: program.getYear(),
            units: program.getUnits(),
            components: []
        };

        for (const component of program.getComponents()) {
            jsonProgram.components.push(ComponentFactory.createJSONFromComponent(component));
        }

        return jsonProgram;
    }
}