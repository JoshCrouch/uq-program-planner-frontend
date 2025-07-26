import { CourseEntry } from './CourseEntry';
import type { JSONCourseEntry } from "../../Factories/ProgramFactory.ts";
import {RegisterCourseEntry} from "../../Factories/CourseEntryFactory.ts";

@RegisterCourseEntry('singular')
export class Course extends CourseEntry {
    private code: string;
    private title: string;
    private units: number;
    private errorMessage: string | null;

    constructor(code: string, title: string, units: number, errorMessage?: string) {
        super();
        this.code = code;
        this.title = title;
        this.units = units;
        this.errorMessage = (errorMessage) ? errorMessage : null;
    }

    public static async fromJSON(componentJson: JSONCourseEntry): Promise<Course> {
        // Validate the JSON structure
        if (!componentJson.code) {
            throw new Error("Invalid JSON structure for Course. The 'code' field is required.");
        }

        // Fetch the course information from the server
        return this.fromCourseCode(componentJson.code);
    }

    public static async fromCourseCode(code: string): Promise<Course> {
        try {
            const response = await fetch(`/api/course/${code}`);

            if (!response.ok) {
                return new Course(
                    code,
                    "Error Loading Course",
                    0,
                    `Failed to fetch course data: ${response.statusText}`);
            }

            const courseData = await response.json();

            // Create a new Course instance with the fetched data
            return new Course(
                courseData.code,
                courseData.title,
                courseData.units
            );

        } catch (err: any) {
            return new Course(
                code,
                "Error Loading Course",
                0,
                err.message || "An error occurred while fetching the course data.");
        }
    }

    /* ---- Getters and Setters ---- */
    /**
     * Get the course code.
     * @returns The course code.
     */
    getCode(): string {
        return this.code;
    }   

    /** 
     * Set the course code.
     * @param code The course code to set.
     */
    setCode(code: string): void {
        this.code = code;
    }

    /**
     * Get the course title.
     * @returns The course title.
     */
    getTitle(): string {
        return this.title;
    }

    /**
     * Set the course title.
     * @param title The course title to set.
     */
    setTitle(title: string): void {
        this.title = title;
    }

    /**
     * Get the course units.
     * @returns The course units.
     */
    getUnits(): number {
        return this.units;
    }

    /**
     * Set the course units.
     * @param units The course units to set.
     */
    setUnits(units: number): void {
        this.units = units;
    }

    /**
     * Get the error message if any.
     * @returns The error message.
     */
    getErrorMessage(): string | null {
        return this.errorMessage;
    }

    /**
     * Set the error message.
     * @param message The error message to set.
     */
    setErrorMessage(message: string): void {
        this.errorMessage = message;
    }
}