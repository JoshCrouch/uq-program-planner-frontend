import { ProgramComponent } from './ProgramComponents/ProgramComponent.ts';

export class Program {
    private name: string;
    private code: string;
    private year: number;
    private units: number;
    private components: Array<ProgramComponent>;

    constructor(name: string, code: string, year: number, units: number, components: Array<ProgramComponent> = []) {
        this.name = name;
        this.code = code;
        this.year = year;
        this.units = units;
        this.components = components;
    }

    public hasProgramElectiveComponent(): boolean {
        return this.components.some(component => component.getType() === 'programElectives');
    }

    public hasGeneralElectiveComponent(): boolean {
        return this.components.some(component => component.getType() === 'generalElectives');
    }

    /* ---- Getters and Setters ---- */
    /**
     * Get the name of the program.
     * @returns The name of the program.
     */
    getName(): string {
        return this.name;
    }

    /**
     * Set the name of the program.
     * @param name The name to set for the program.
     */
    setName(name: string): void {
        this.name = name;
    }

    /**
     * Get the code of the program.
     * @returns The code of the program.
     */
    getCode(): string {
        return this.code;
    }

    /**
     * Set the code of the program.
     * @param code The code to set for the program.
     */
    setCode(code: string): void {
        this.code = code;
    }

    /**
     * Get the year of the program.
     * @returns The year of the program.
     */
    getYear(): number {
        return this.year;
    }

    /**
     * Set the year of the program.
     * @param year The year to set for the program.
     */
    setYear(year: number): void {
        this.year = year;
    }

    /**
     * Get the total units of the program.
     * @returns The total units of the program.
     */
    getUnits(): number {
        return this.units;
    }

    /**
     * Set the total units of the program.
     * @param units The total units to set for the program.
     */
    setUnits(units: number): void {
        this.units = units;
    }

    /**
     * Get the components of the program.
     * @returns Array of components in the program.
     */
    getComponents(): Array<ProgramComponent> {
        return this.components;
    }

    /**
     * Set the components of the program.
     * @param components Array of components to set.
     */
    setComponents(components: Array<ProgramComponent>): void {
        this.components = components;
    }

    /**
     * Add a component to the program.
     * @param component Component to add.
     */
    addComponent(component: ProgramComponent): void {
        this.components.push(component);
    }

    /**
     * Remove a component from the program. Does nothing if the component is not found.
     * @param component Component to remove.
     */
    removeComponentByID(componentID: string): void {
        this.components = this.components.filter(component => component.getId() !== componentID);
    }

    /**
     * Get a component by its ID.
     * @param componentID The ID of the component to retrieve.
     * @returns The component with the specified ID, or undefined if not found.
     */
    getComponentByID(componentID: string): ProgramComponent | undefined {
        return this.components.find(component => component.getId() === componentID);
    }
}