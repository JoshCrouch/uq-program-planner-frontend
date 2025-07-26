import { ProgramComponent } from "./ProgramComponent.ts";
import { CourseEntry } from ".././CourseEntries/CourseEntry.ts";
import { RegisterComponent } from "../../Factories/ComponentFactory.ts";
import type {JSONProgramComponent} from "../../Factories/ProgramFactory.ts";
import type { JSONCourseEntry } from "../../Factories/ProgramFactory.ts";
import { CourseEntryFactory } from "../../Factories/CourseEntryFactory.ts";

@RegisterComponent('section')
export class Section extends ProgramComponent {

    private courseEntries: Array<CourseEntry>;

    constructor(id: string, title: string, minUnits: number, maxUnits: number, courseGroups: Array<CourseEntry> = []) {
        super(id, title, minUnits, maxUnits);
        this.courseEntries = courseGroups;
    }

    /**
     * Creates a SectionView from a JSON object.
     * @param componentJson The JSON object representing the section.
     * @returns An instance of the SectionView.
     */
    static async fromJSON(componentJson: JSONProgramComponent): Promise<Section> {
        const section = new Section(componentJson.id, componentJson.title, componentJson.minUnits, componentJson.maxUnits);

        if (!componentJson.courseEntries || !Array.isArray(componentJson.courseEntries)) {
            return section; // Return empty section if no course groups are provided
        }

        for (const courseEntryJSON of componentJson.courseEntries) {
            const courseEntry: CourseEntry = await CourseEntryFactory.createCourseEntryFromJSON(courseEntryJSON as JSONCourseEntry);
            section.addCourseEntry(courseEntry);
        }

        return section;
    }

    /**
     * Get the course groups in this section.
     * @returns An array of course groups in this section.
     */
    getCourseEntries(): Array<CourseEntry> {
        return this.courseEntries;
    }

    /**
     * Set the course groups for this section.
     * @param courseEntries An array of course groups to set.
     */
    setCourseEntries(courseEntries: Array<CourseEntry>): void {
        this.courseEntries = courseEntries;
    }

    /**
     * Add a course entry to this section.
     * @param courseEntry The course entry to add.
     */
    addCourseEntry(courseEntry: CourseEntry): void {
        this.courseEntries.push(courseEntry);
    }

    /**
     * Remove a course entry from this section by its reference.
     * @param courseEntry The course entry to remove.
     */
    removeCourseEntry(courseEntry: CourseEntry): void {
        const index: number = this.courseEntries.indexOf(courseEntry);
        if (index > -1) {
            this.courseEntries.splice(index, 1);
        }
    }
}