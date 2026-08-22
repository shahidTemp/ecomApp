import { createContext, useContext, useEffect, useState } from "react";
import { getData, storeData } from "./localStorage";
import { getApi } from "./api";

const SETTINGS_STORAGE_KEY = "@app_settings";

export const DEFAULT_THEME = {
    color: "#fff",
    bgcolor: "#0984e4",
};

const SettingsContext = createContext(null);

export function ThemeProvider({ children }) {
    const [settings, setSettings] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const cached = await getData(SETTINGS_STORAGE_KEY);
                if (cached && mounted) setSettings(cached);

                const response = await getApi("settings/site");
                if (response?.data && mounted) {
                    setSettings(response.data);
                    await storeData(SETTINGS_STORAGE_KEY, response.data);
                }
            } catch (error) {
                console.error("Failed to load settings:", error);
            } finally {
                if (mounted) setIsReady(true);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const theme = settings?.theme ?? DEFAULT_THEME;

    return (
        <SettingsContext.Provider value={{ settings, theme, isReady }}>
            {children}
        </SettingsContext.Provider>
    );
}

function useSettingsContext() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error("useTheme/useSettings must be used within a ThemeProvider");
    }

    return context;
}

export function useTheme() {
    const { theme, isReady } = useSettingsContext();
    return { theme, isReady };
}

export function useSettings() {
    return useSettingsContext();
}
