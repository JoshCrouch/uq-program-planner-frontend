import {ProgramComponent} from "../ProgramClasses/ProgramComponents/ProgramComponent.ts";

export function RegisterComponent(type: string) {
    return function (constructor: typeof ProgramComponent) {
        ComponentFactory.registerComponent(type, constructor);
        constructor.TYPE = type; // Set the static type property on the class
        constructor.REGISTERED = true; // Mark the component as registered
    };
}

export class ComponentFactory {
    private static componentRegistry: Record<string, typeof ProgramComponent> = {};

    /**
     * Registers a component class with a specific type.
     * @param type The type of the component.
     * @param componentClass The class of the component to register.
     */
    public static registerComponent(type: string, componentClass: typeof ProgramComponent): boolean {
        this.componentRegistry[type] = componentClass;
        return true;
    }

    /**
     * Creates a component from a JSON object.
     * @param json The JSON object representing the component.
     * @returns An instance of the component class.
     */
    public static async createComponentFromJSON(json: any): Promise<ProgramComponent> {
        const componentType = json.type;
        const componentClass = this.componentRegistry[componentType];

        if (!componentClass) {
            console.log("Registery: ", this.componentRegistry);
            throw new Error(`Component type "${componentType}" is not registered.`);
        }

        return await componentClass.fromJSON(json);
    }
}