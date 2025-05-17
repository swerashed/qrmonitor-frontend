"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
})

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  attribute?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
  attribute = "class",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    if (storedTheme) {
      setTheme(storedTheme)
    } else if (enableSystem) {
      setTheme(getSystemTheme())
    }
  }, [enableSystem, storageKey])

  useEffect(() => {
    if (attribute === "class") {
      if (theme === "system") {
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(getSystemTheme())
      } else if (theme) {
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(theme)
      }
    } else {
      if (theme === "system") {
        document.documentElement.setAttribute(attribute, getSystemTheme())
      } else if (theme) {
        document.documentElement.setAttribute(attribute, theme)
      }
    }

    if (!disableTransitionOnChange) {
      document.documentElement.classList.add("[&_*]:!transition-none")
      window.setTimeout(() => {
        document.documentElement.classList.remove("[&_*]:!transition-none")
      }, 100)
    }
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey, attribute, disableTransitionOnChange])

  const getSystemTheme = (): Theme => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
