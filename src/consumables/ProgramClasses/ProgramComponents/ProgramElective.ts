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

    static toJSON(component: ProgramElective): JSONProgramComponent {
        return {
            id: component.getId(),
            type: component.getType(),
            title: component.getTitle(),
            minUnits: component.getMinUnits(),
            maxUnits: component.getMaxUnits()
        };
    }
}