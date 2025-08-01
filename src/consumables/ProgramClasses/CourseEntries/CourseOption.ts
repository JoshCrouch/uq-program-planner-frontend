import { CourseEntry } from "./CourseEntry.ts";
import { Course } from "./Course.ts";
import type { JSONCourseEntry } from "../../Factories/ProgramFactory.ts";
import {RegisterCourseEntry} from "../../Factories/CourseEntryFactory.ts";

@RegisterCourseEntry('option')
export class CourseOption extends CourseEntry {
    private optionOne: Course;
    private optionTwo: Course;

    constructor(optionOne: Course, optionTwo: Course) {
        super();
        this.optionOne = optionOne;
        this.optionTwo = optionTwo;
    }

    public static async fromJSON(componentJson: JSONCourseEntry): Promise<CourseOption> {
        // Validate the JSON structure
        if (!componentJson.optionOne || !componentJson.optionTwo) {
            throw new Error("Invalid JSON structure for CourseOption. Both optionOne and optionTwo are required.");
        }

        try {
            // Create Course instances from the provided course codes
            const optionOne: Course = await Course.fromCourseCode(componentJson.optionOne);
            const optionTwo: Course = await Course.fromCourseCode(componentJson.optionTwo);

            return new CourseOption(optionOne, optionTwo);

        } catch (err: any) {
            console.error("Error creating CourseOption from JSON:", err);
            throw new Error(`Could not create CourseOption from JSON: ${err?.message}`);
        }
    }

    public static async fromCourseCodes(optionOneCode: string, optionTwoCode: string): Promise<CourseOption> {
        // Validate the course codes
        if (!optionOneCode || !optionTwoCode) {
            throw new Error("Both optionOneCode and optionTwoCode are required.");
        }

        try {
            // Create Course instances from the provided course codes
            const optionOne: Course = await Course.fromCourseCode(optionOneCode);
            const optionTwo: Course = await Course.fromCourseCode(optionTwoCode);

            return new CourseOption(optionOne, optionTwo);

        } catch (err: any) {
            console.error("Error creating CourseOption from course codes:", err);
            throw new Error(`Could not create CourseOption from course codes: ${err?.message}`);
        }
    }

    /* ---- Getters and Setters ---- */

    /**
     * Get the title of the course option.
     * @returns The title of the course option.
     */
    getTitle(): string {
        return 'Option ' + this.optionOne.getCode() + " or " + this.optionTwo.getCode();
    }

    /**
     * Get the first course option.
     * @param optionNumber The option number (1 or 2).
     * @requires optionNumber to be either 1 or 2.
     * @returns The first course option.
     */
    getOption(optionNumber: number): Course {

        if (optionNumber !== 1 && optionNumber !== 2) {
            throw new Error("Invalid option number. Use 1 or 2.");
        }

        return optionNumber === 1 ? this.optionOne : this.optionTwo;
    }

    /**
     * Set the course option.
     * @param optionNumber The option number (1 or 2).
     * @param course The course to set as the option.
     * @requires optionNumber to be either 1 or 2.
     */
    setOption(optionNumber: number, course: Course): void {
        if (optionNumber !== 1 && optionNumber !== 2) {
            throw new Error("Invalid option number. Use 1 or 2.");
        }

        if (optionNumber === 1) {
            this.optionOne = course;
        } else {
            this.optionTwo = course;
        }
    }
}