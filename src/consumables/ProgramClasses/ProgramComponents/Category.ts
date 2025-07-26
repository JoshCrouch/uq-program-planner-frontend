import { ProgramComponent } from "./ProgramComponent.ts";
import { Section } from "./Section.ts";
import { RegisterComponent } from "../../Factories/ComponentFactory.ts";

@RegisterComponent('category')
export class Category extends ProgramComponent {
    private sections: Array<Section>;

    constructor(id: string, title: string, minUnits: number, maxUnits: number, sections: Array<Section> = []) {
        super(id, title, minUnits, maxUnits);
        this.sections = sections;
    }

    /**
     * Creates a Category from a JSON object.
     * @param componentJson The JSON object representing the category.
     * @returns An instance of the Category.
     */
    static async fromJSON(componentJson: any): Promise<Category> {
        const category = new Category(componentJson.id, componentJson.title, componentJson.minUnits, componentJson.maxUnits);
        for (const sectionJson of componentJson.sections || []) {
            console.log(sectionJson);
            const section = await Section.fromJSON(sectionJson);
            console.log(section);
            category.addSection(section);
        }

        return category;
    }

    /* ---- Getters and Setters ---- */
    /**
     * Returns the sections of this category.
     * @returns {Array<Section>} The sections of this category.
     */
    getSections(): Array<Section> {
        return this.sections;
    }

    /**
     * Sets the sections of this category.
     * @param sections The sections to set for this category.
     */
    setSections(sections: Array<Section>): void {
        this.sections = sections;
    }

    /**
     * Adds a section to this category.
     * @param section The section to add.
     */
    addSection(section: Section): void {
        this.sections.push(section);
    }

    /**
     * Removes a section from this category by its ID.
     * @param sectionId The ID of the section to remove.
     */
    removeSectionById(sectionId: string): void {
        this.sections = this.sections.filter(section => section.getId() !== sectionId);
    }

    /**
     * Retrieves a section by its ID.
     * @param sectionId The ID of the section to retrieve.
     * @returns {Section | undefined} The section with the specified ID, or undefined if not found.
     */
    getSectionById(sectionId: string): Section | undefined {
        return this.sections.find(section => section.getId() === sectionId);
    }
}