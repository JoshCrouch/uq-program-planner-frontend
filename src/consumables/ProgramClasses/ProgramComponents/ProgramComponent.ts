import type { JSONProgramComponent} from "../../Factories/ProgramFactory.ts";

export abstract class ProgramComponent {

    private id: string;
    static TYPE: string;
    static REGISTERED: boolean;
    private title: string;
    private minUnits: number;
    private maxUnits: number;

    protected constructor(id: string, title: string, minUnits: number, maxUnits: number) {
        this.id = id;
        this.title = title;
        this.minUnits = minUnits;
        this.maxUnits = maxUnits;

        const ctor = this.constructor as typeof ProgramComponent;
        if (!ctor.REGISTERED) {
            throw new Error(`Component type "${ctor.TYPE}" is not registered.`);
        }
    }

    /**
     * Creates a ProgramComponent from a JSON object.
     * @param componentJson The JSON object representing the component.
     * @returns An instance of the ProgramComponent.
     */
    static async fromJSON(componentJson: JSONProgramComponent): Promise<ProgramComponent> {
        throw new Error("Method 'fromJSON' must be implemented in class: " + componentJson.type);
    }

    /**
     * Converts a ProgramComponent to a JSON object.
     * @param component The ProgramComponent instance to convert.
     * @returns A JSON representation of the component.
     */
    static toJSON(component: ProgramComponent): JSONProgramComponent {
        throw new Error("Method 'toJSON' must be implemented in component: " + component.getType());
    }

    /* ---- Getters and Setters ---- */
    /**
     * Get the type of the component.
     * @returns The type of the component.
     */
    getType(): string {
        const ctor = this.constructor as typeof ProgramComponent;
        return ctor.TYPE;
    }

    /**
     * Get the ID of the component.
     * @returns The ID of the component.
     */
    getId(): string {
        return this.id;
    }

    /**
     * Set the ID of the component.
     * @param id The ID to set for the component.
     */
    setId(id: string): void {
        this.id = id;
    }

    /**
     * Get the title of the component.
     * @returns The title of the component.
     */
    getTitle(): string {
        return this.title;
    }

    /**
     * Set the title of the component.
     * @param title The title to set for the component.
     */
    setTitle(title: string): void {
        this.title = title;
    }

    /**
     * Get the minimum units of the component.
     * @returns The minimum units of the component.
     */
    getMinUnits(): number {
        return this.minUnits;
    }

    /**
     * Set the minimum units of the component.
     * @param minUnits The minimum units to set for the component.
     */
    setMinUnits(minUnits: number): void {
        this.minUnits = minUnits;
    }

    /**
     * Get the maximum units of the component.
     * @returns The maximum units of the component.
     */
    getMaxUnits(): number {
        return this.maxUnits;
    }

    /**
     * Set the maximum units of the component.
     * @param maxUnits The maximum units to set for the component.
     */
    setMaxUnits(maxUnits: number): void {
        this.maxUnits = maxUnits;
    }
}