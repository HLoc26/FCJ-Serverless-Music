import { useContext } from "react";
import type { CacheContextType } from "../interfaces/CacheData";
import { CacheContext } from "../contexts/CacheContext";

// Hook dùng bên ngoài
export const useCache = (): CacheContextType => {
    const context = useContext(CacheContext);
    if (!context) {
        throw new Error("useCache must be used within a CacheProvider");
    }
    return context;
};