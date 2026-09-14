import { getLogger } from "@logtape/logtape";
import { useEffect, useMemo, useState } from "react";
import { getVersion } from "@/api/getVersion.ts";
import { useSettings } from "@/components/useSettings.ts";

const logger = getLogger(["rustypaste-ui", "useVersions"]);

export function useVersions() {
  const [serverVersion, setServerVersion] = useState<string>();

  const { settings } = useSettings();

  useEffect(() => {
    const abortController = new AbortController();
    void (async () => {
      setServerVersion("Loading...");
      try {
        const version = await getVersion({
          instanceUrl: settings.instanceUrl,
          signal: abortController.signal,
        });
        setServerVersion(version);
      } catch (e) {
        logger.warn("Failed to get server version", { error: e });
        setServerVersion(undefined);
      }
    })();
    return () => abortController.abort();
  }, [settings.instanceUrl]);

  return useMemo(() => {
    return {
      appVersion: (import.meta.env.VITE_APP_VERSION as string) ?? "0.0.1",
      serverVersion,
    };
  }, [serverVersion]);
}
