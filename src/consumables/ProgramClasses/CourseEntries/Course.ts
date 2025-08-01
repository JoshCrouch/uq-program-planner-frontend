import { CourseEntry } from './CourseEntry';
import type { JSONCourseEntry } from "../../Factories/ProgramFactory.ts";
import {RegisterCourseEntry} from "../../Factories/CourseEntryFactory.ts";

interface CourseData {
    code: string;
    title: string;
    units: number;
    errorMessage?: string | null;
}

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

    /**
     * Creates a Course instance from a JSON representation.
     * @param componentJson The JSON representation of the course.
     * @returns A Promise that resolves to a Course instance.
     */
    public static async fromJSON(componentJson: JSONCourseEntry): Promise<Course> {
        // Validate the JSON structure
        if (!componentJson.code) {
            throw new Error("Invalid JSON structure for Course. The 'code' field is required.");
        }

        const courseData: CourseData = await this.fetchCourseData(componentJson.code);

        if (courseData.errorMessage) {
            return new Course(courseData.code, courseData.title, courseData.units, courseData.errorMessage);
        }

        // Fetch the course information from the server
        return new Course(courseData.code, courseData.title, courseData.units);
    }

    /**
     * Creates a Course instance from a course code.
     * @param code The course code to fetch the course data for.
     * @returns A Promise that resolves to a Course instance.
     */
    public static async fromCourseCode(code: string): Promise<Course> {
        const courseData: CourseData = await this.fetchCourseData(code);

        // If there is an error message, return a Course instance with the error
        if (courseData.errorMessage) {
            return new Course(courseData.code, courseData.title, courseData.units, courseData.errorMessage)
        }

        // Create a new Course instance with the fetched data
        return new Course(courseData.code, courseData.title, courseData.units);
    }

    /**
     * Fetches course data from the server.
     * @param code The course code to fetch the data for.
     * @returns A Promise that resolves to a CourseData object.
     */
    private static async fetchCourseData(code: string): Promise<CourseData> {
        try {
            const response = await fetch(`/api/course/${code}`);

            if (!response.ok) {

                return {
                    code: code,
                    title: "Error Loading Course",
                    units: 0,
                    errorMessage: `Failed to fetch course data: ${response.statusText}`
                };
            }

            const courseData = await response.json();

            // Create a new Course instance with the fetched data
            return {
                code: courseData.code,
                title: courseData.title,
                units: courseData.units,
                errorMessage: null
            }

        } catch (err: any) {
            return {
                code: code,
                title: "Error Loading Course",
                units: 0,
                errorMessage: err.message || "An error occurred while fetching the course data."
            };
        }
    }

    /**
     * Updates the course data by fetching it from the server.
     * This method is called when the course code is set or changed.
     */
    private async updateCourseData(): Promise<void> {
        const courseData: CourseData = await Course.fetchCourseData(this.code);

        if (courseData.errorMessage) {
            this.errorMessage = courseData.errorMessage;
            return;
        }

        this.title = courseData.title;
        this.units = courseData.units;
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
     * Set the course code. Also grabs the course data from the server.
     * @param code The course code to set.
     */
    setCode(code: string): void {
        this.code = code;
        this.updateCourseData().then();

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