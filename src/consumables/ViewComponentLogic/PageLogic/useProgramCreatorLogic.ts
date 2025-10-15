/* ----- Imports ----- */
import { onMounted, ref } from "vue";
import { useToast } from "primevue";
import { ProgramController } from "../../ProgramController.ts";
import type { JSONProgram } from "../../Factories/ProgramFactory.ts";

export interface ProgramDetails {
  title: string;
  code: string;
  year: string;
  units: string;
}

export interface LoadSettings {
  type: "upload" | "new" | "local";
  file?: File;
  programDetails?: ProgramDetails;
}

export function useProgramCreatorLogic() {
  /* ----- View Values ----- */
  // Use PrimeVue's Toast for notifications
  const toast = useToast();

  // Reactive state for the program controller
  const controller = new ProgramController();

  // Reactive state for the load dialog visibility
  const dialogVisible = ref(false);

  const programLoaded = ref(false);

  /* ----- Program Load Logic ----- */
  onMounted(() => {
    // Check if a program is already loaded in local storage
    loadProgramFromLocalStorage().then(() => {
      if (!programLoaded.value) {
        dialogVisible.value = true;
      }
    });
  });

  /**
   * Loads a program from a file input.
   * It reads the file as text, parses it as JSON, and loads it into the controller.
   * If an error occurs, it shows an error toast.
   * @param file
   */
  function loadProgramFromFile(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const programJSON: JSONProgram = JSON.parse(
            event.target?.result as string,
          );
          await controller.loadProgramFromJSON(programJSON);
          toast.add({
            severity: "success",
            summary: "Program Loaded",
            detail: "Your program has been loaded successfully.",
            life: 3000,
          });
          programLoaded.value = true;
        } catch (error: any) {
          toast.add({
            severity: "error",
            summary: "Load Error",
            detail: `Could not load program: ${error.message}`,
            life: 3000,
          });
        }
      };
      reader.readAsText(file);

      programLoaded.value = true;
    } else {
      toast.add({
        severity: "warn",
        summary: "No File Selected",
        detail: "Please select a file to load.",
        life: 3000,
      });
      return;
    }
  }

  /**
   * Creates a new program with the provided details.
   * It validates the input and shows a warning toast if any details are missing.
   * If successful, it loads the new program into the controller.
   * @param programDetails
   */
  function createNewProgram(programDetails: ProgramDetails): void {
    const year: number = parseInt(programDetails.year);
    const units: number = parseInt(programDetails.units);

    if (isNaN(year)) {
      toast.add({
        severity: "warn",
        summary: "Invalid Year",
        detail: "Please provide a valid year for the program.",
        life: 3000,
      });
      return;
    }

    if (isNaN(units)) {
      toast.add({
        severity: "warn",
        summary: "Invalid Units",
        detail: "Please provide a valid number of units for the program.",
        life: 3000,
      });
      return;
    }

    const newProgram: JSONProgram = {
      name: programDetails.title,
      code: programDetails.code,
      year: parseInt(programDetails.year),
      units: parseInt(programDetails.units),
      components: [],
    };

    controller.loadProgramFromJSON(newProgram).then(() => {
      toast.add({
        severity: "success",
        summary: "New Program Created",
        detail: "Your new program has been created successfully.",
        life: 3000,
      });
    });
    programLoaded.value = true;
  }

  /**
   * Loads a program from local storage.
   * If no program is found, it shows a warning toast.
   */
  async function loadProgramFromLocalStorage(): Promise<void> {
    try {
      const localStorageProgram = localStorage.getItem("program");

      if (!localStorageProgram) {
        toast.add({
          severity: "info",
          summary: "No Program Found",
          detail:
            "No program found in local storage. Please create or upload a program.",
          life: 3000,
        });
        return;
      }

      programLoaded.value = true;

      const programJSON: JSONProgram = JSON.parse(localStorageProgram);

      controller.loadProgramFromJSON(programJSON).then();

      toast.add({
        severity: "success",
        summary: "Program Loaded",
        detail: "Your program has been loaded successfully.",
        life: 3000,
      });
    } catch (error: any) {
      toast.add({
        severity: "error",
        summary: "Retrieval Error",
        detail: `Could not retrieve program: ${error.message}`,
        life: 3000,
      });
      throw new Error("Could not retrieve program: " + error.message);
    }
  }

  /* ----- Program Save Logic ----- */
  /**
   * Saves the current program to local storage.
   * If an error occurs, it shows an error toast.
   */
  async function saveProgramToLocalStorage(): Promise<void> {
    try {
      const programJSON = controller.toJSON();
      localStorage.setItem("program", JSON.stringify(programJSON));
      toast.add({
        severity: "success",
        summary: "Program Saved",
        detail: "Your program has been saved successfully.",
        life: 3000,
      });
    } catch (error: any) {
      toast.add({
        severity: "error",
        summary: "Save Error",
        detail: `Could not save program: ${error.message}`,
        life: 3000,
      });
      throw new Error("Could not save program: " + error.message);
    }
  }

  /**
   * Downloads the current program as a JSON file.
   * It creates a Blob from the program JSON and triggers a download.
   */
  async function downloadProgram(): Promise<void> {
    const programJSON = controller.toJSON();
    const blob = new Blob([JSON.stringify(programJSON, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "program.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ----- Load Dialog Logic ----- */
  /**
   * Closes the dialog for loading a program.
   */
  function closeDialog(): void {
    if (!programLoaded.value) {
      toast.add({
        severity: "error",
        summary: "Program Not Loaded",
        detail: "Please load a program before closing the dialog.",
        life: 3000,
      });
      return;
    }
    dialogVisible.value = false;
  }

  function openDialog(): void {
    dialogVisible.value = true;
  }

  /**
   * Handles the loading of a program based on the provided load settings.
   * It can handle uploading a program from a file, creating a new program,
   * or loading a program from local storage.
   * @param loadSettings
   */
  function onLoad(loadSettings: LoadSettings): void {
    switch (loadSettings.type) {
      /* Upload a program from a file */
      case "upload":
        if (!loadSettings.file) {
          toast.add({
            severity: "warn",
            summary: "No File Selected",
            detail: "Please select a file to upload.",
            life: 3000,
          });
          return;
        }
        loadProgramFromFile(loadSettings.file);
        break;

      /* Create a new program */
      case "new":
        if (!loadSettings.programDetails) {
          toast.add({
            severity: "warn",
            summary: "No Program Details",
            detail: "Please provide program details to create a new program.",
            life: 3000,
          });
          return;
        }

        if (
          !loadSettings.programDetails.title ||
          !loadSettings.programDetails.code ||
          !loadSettings.programDetails.year ||
          !loadSettings.programDetails.units
        ) {
          toast.add({
            severity: "warn",
            summary: "Incomplete Details",
            detail: "Please provide all program details.",
            life: 3000,
          });
          return;
        }

        createNewProgram(loadSettings.programDetails);
        break;

      /* Load a program from local storage */
      case "local":
        loadProgramFromLocalStorage().then();
        break;
    }

    if (programLoaded.value) {
      dialogVisible.value = false;
    }
  }

  return {
    /* State Variables */
    controller,
    dialogVisible,

    /* Methods */
    loadProgram: loadProgramFromLocalStorage,
    saveProgram: saveProgramToLocalStorage,
    downloadProgram,

    closeDialog,
    openDialog,
    onLoad,
  };
}
