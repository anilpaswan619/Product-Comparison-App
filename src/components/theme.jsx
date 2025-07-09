import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for theme
const ThemeContext = createContext();

// Custom hook to use theme
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Check local storage or system preference
    const getInitialTheme = () => {
        if (typeof window !== "undefined" && window.localStorage) {
            const storedPrefs = window.localStorage.getItem("theme");
            if (typeof storedPrefs === "string") {
                return storedPrefs;
            }
            const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
            if (userMedia.matches) {
                return "dark";
            }
        }
        return "light";
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        // Apply theme to document root
        document.documentElement.setAttribute("data-theme", theme);
        // Also apply to body for better coverage
        document.body.setAttribute("data-theme", theme);
        // Store in localStorage
        window.localStorage.setItem("theme", theme);
        
        // Apply theme-specific classes to body
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};