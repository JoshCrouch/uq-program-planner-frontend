import type { JSONCourseEntry } from "../../Factories/ProgramFactory.ts";

export abstract class CourseEntry {
    static TYPE: string;
    static REGISTERED: boolean;

    public static async fromJSON(componentJson: JSONCourseEntry): Promise<CourseEntry> {
        throw new Error("fromJSON method must be implemented in class: " + componentJson.type);
    }

    static toJSON(courseEntry: CourseEntry): JSONCourseEntry {
        throw new Error("toJSON method must be implemented in class: " + courseEntry.getType());
    }

    /* ---- Getters and Setters ---- */
    public abstract getTitle(): string;

    /**
     * Get the type of the course entry.
     * @return {string} The type of the course entry.
     */
    public getType(): string {
        return (this.constructor as typeof CourseEntry).TYPE;
    }
}