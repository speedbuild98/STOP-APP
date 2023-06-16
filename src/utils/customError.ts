export const CustomErrorTypes = {
    noPermissionsGranted: 'NO_PERMISSIONS_GRANTED',
    noUserFound: 'NO_USER_FOUND',
} as const;

// ─────────────── ∞ ───────────────

export type CustomErrorNameKeys = keyof typeof CustomErrorTypes;

export type CustomErrorNames = (typeof CustomErrorTypes)[CustomErrorNameKeys];

interface CustomErrorProps {
    message: string;
    name: CustomErrorNames | string;
}
// ─────────────── ∞ ───────────────

export default class CustomError extends Error {
    constructor(type: CustomErrorProps) {
        super(type.message);
        this.name = type.name;
        this.message = type.message
        // Error.captureStackTrace(this, CustomError);
    }

    // ────────────────────────────────────────────────────────────────────────────
    // ──────────────────────────────────────────────────────────CUSTOM ERROR TYPES
    // ────────────────────────────────────────────────────────────────────────────

    static get NO_PERMISSIONS_GRANTED() {
        return new CustomError({
            name: 'NO_PERMISSIONS_GRANTED',
            message: 'Los permisos deben ser aceptados',
        });
    }

    static get FOLDER_DOES_NOT_EXIST() {
        return new CustomError({
            name: 'FOLDER_DOES_NOT_EXIST',
            message: 'La carpeta seleccionada no existe',
        });
    }

    static get NO_VIDEO_FILES_FOUND() {
        return new CustomError({
            name: 'NO_VIDEO_FILES_FOUND',
            message: 'No se encontraron archivos de video',
        });
    }
}

// if (error instanceof CustomError) {}
