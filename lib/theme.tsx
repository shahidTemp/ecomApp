import { createContext, useContext, useEffect, useState } from "react";
import { getData, storeData } from "./localStorage";
import { getApi } from "./api";

const THEME_STORAGE_KEY = "@app_theme";

export interface Theme {
    color: string;
    bgcolor: string;
}

interface ThemeContextValue {
    theme: Theme;
    isReady: boolean;
}

export const DEFAULT_THEME: Theme = {
    color: "#fff",
    bgcolor: "#0984e4",
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadTheme = async () => {
            try {
                const stored = await getData(THEME_STORAGE_KEY);
                if (stored && isMounted) {
                    setTheme({ ...DEFAULT_THEME, ...stored });
                }

                const response = await getApi("settings/site");
                const remoteTheme = response?.data?.theme;

                if (remoteTheme && isMounted) {
                    const nextTheme: Theme = {
                        color: remoteTheme.color || DEFAULT_THEME.color,
                        bgcolor: remoteTheme.bgcolor || DEFAULT_THEME.bgcolor,
                    };

                    setTheme(nextTheme);
                    await storeData(THEME_STORAGE_KEY, nextTheme);
                }
            } catch (error) {
                console.error("Failed to load theme:", error);
            } finally {
                if (isMounted) {
                    setIsReady(true);
                }
            }
        };

        loadTheme();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, isReady }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
