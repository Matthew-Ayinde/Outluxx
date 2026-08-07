"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch } from "@/lib/api/client";
import type { StoreSettings } from "@/lib/data/settings";

const SettingsContext = createContext<StoreSettings | null>(null);

export function SettingsProvider({
  children,
  initialSettings,
}: {
  children: ReactNode;
  initialSettings: StoreSettings;
}) {
  const [settings, setSettings] = useState(initialSettings);

  // Server-rendered value is already correct on first paint; this just
  // picks up admin edits made after the page loaded, in the same session.
  useEffect(() => {
    apiFetch<StoreSettings>("/api/settings")
      .then(setSettings)
      .catch(() => {});
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
