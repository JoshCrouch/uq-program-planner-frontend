import { ProgramComponent } from "./ProgramComponent.ts";
import { RegisterComponent } from "../../Factories/ComponentFactory.ts";
import type { JSONProgramComponent } from "../../Factories/ProgramFactory.ts";

@RegisterComponent('generalElectives')
export class GeneralElective extends ProgramComponent {

    constructor(id: string, title: string, minUnits: number, maxUnits: number) {
        super(id, title, minUnits, maxUnits);
    }

    static async fromJSON(componentJson: JSONProgramComponent): Promise<GeneralElective> {
        return new GeneralElective(componentJson.id, componentJson.title, componentJson.minUnits, componentJson.maxUnits);
    }

    static toJSON(component: GeneralElective): JSONProgramComponent {
        return {
            id: component.getId(),
            type: component.getType(),
            title: component.getTitle(),
            minUnits: component.getMinUnits(),
            maxUnits: component.getMaxUnits()
        };
    }
}