import { ProgramComponent } from "./ProgramComponent.ts";
import type {JSONProgramComponent} from "../../Factories/ProgramFactory.ts";
import { RegisterComponent } from "../../Factories/ComponentFactory.ts";

@RegisterComponent('programElectives')
export class ProgramElective extends ProgramComponent {

    constructor(id: string, title: string, minUnits: number, maxUnits: number) {
        super(id, title, minUnits, maxUnits);
    }

    static async fromJSON(componentJson: JSONProgramComponent): Promise<ProgramElective> {
        return new ProgramElective(componentJson.id, componentJson.title, componentJson.minUnits, componentJson.maxUnits);
    }

    // Additional methods specific to ProgramElective can be added here
}