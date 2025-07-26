import {CourseEntry} from "../ProgramClasses/./CourseEntries/CourseEntry.ts";

export function RegisterCourseEntry(type: string) {
    return function (constructor: any) { // Use 'any' to allow static property assignment
        CourseEntryFactory.registerCourseEntry(type, constructor);
        constructor.TYPE = type; // Set the static type property on the class
        constructor.REGISTERED = true; // Mark the course entry as registered
    };
}

export class CourseEntryFactory {
    private static courseEntryRegistry: Record<string, typeof CourseEntry> = {};

    /**
     * Registers a course entry class with a specific type.
     * @param type The type of the course entry.
     * @param courseEntryClass The class of the course entry to register.
     */
    public static registerCourseEntry(type: string, courseEntryClass: typeof CourseEntry): boolean {
        this.courseEntryRegistry[type] = courseEntryClass;
        return true;
    }

    /**
     * Creates a course entry from a JSON object asynchronously.
     * @param json The JSON object representing the course entry.
     * @returns A Promise resolving to an instance of the course entry class.
     */
    public static async createCourseEntryFromJSON(json: any): Promise<CourseEntry> {
        const courseEntryType = json.type;
        const courseEntryClass = this.courseEntryRegistry[courseEntryType];

        if (!courseEntryClass) {
            console.log("Registry: ", this.courseEntryRegistry);
            throw new Error(`Course entry type "${courseEntryType}" is not registered.`);
        }

        return courseEntryClass.fromJSON(json);
    }
}