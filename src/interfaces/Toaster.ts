export type ToasterType = "success" | "error";

export interface ToasterProps {
    message: string;
    type: ToasterType;
    duration?: number; // ms
    onClose?: () => void;
}