import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

export function useSettings() {
  const [value, setValue] = useLocalStorage<Settings | undefined>("settings-key", undefined);
  return useMemo(
    () => ({
      settings: {
        instanceUrl: value?.instanceUrl.trim().replace(/\/+$/, "") || window.location.origin,
        checkForReleases: value?.checkForReleases ?? true,
      },
      setSettings: setValue,
    }),
    [value, setValue],
  );
}

type Settings = {
  instanceUrl: string;
  /** Optional; defaults to `true` when absent. */
  checkForReleases?: boolean;
};
