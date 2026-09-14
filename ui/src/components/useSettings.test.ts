import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { useSettings } from "@/components/useSettings.ts";

afterEach(() => {
  localStorage.clear();
});

test("When nothing is stored then the hook should default the instance url to the page origin", () => {
  localStorage.clear();

  const { result } = renderHook(() => useSettings());

  expect(result.current.settings.instanceUrl).toBe(window.location.origin);
  expect(result.current.settings.checkForReleases).toBe(true);
});

test("When a value is stored then the hook should return the trimmed instance url", () => {
  localStorage.setItem(
    "settings-key",
    JSON.stringify({
      instanceUrl: "  https://example.com/  ",
      checkForReleases: false,
    }),
  );

  const { result } = renderHook(() => useSettings());

  expect(result.current.settings.instanceUrl).toBe("https://example.com");
  expect(result.current.settings.checkForReleases).toBe(false);
});

test("When the stored value omits checkForReleases then the hook should default it to true", () => {
  localStorage.setItem("settings-key", JSON.stringify({ instanceUrl: "https://example.com" }));

  const { result } = renderHook(() => useSettings());

  expect(result.current.settings.checkForReleases).toBe(true);
});

test("When the stored instance url has trailing slashes then the hook should strip them", () => {
  localStorage.setItem("settings-key", JSON.stringify({ instanceUrl: "https://example.com////" }));

  const { result } = renderHook(() => useSettings());

  expect(result.current.settings.instanceUrl).toBe("https://example.com");
});

test("When setSettings is called then the hook should persist and reflect the new value", () => {
  localStorage.clear();

  const { result } = renderHook(() => useSettings());

  act(() => {
    result.current.setSettings({
      instanceUrl: "https://api.example.com",
      checkForReleases: false,
    });
  });

  expect(result.current.settings.instanceUrl).toBe("https://api.example.com");
  expect(result.current.settings.checkForReleases).toBe(false);
  expect(JSON.parse(localStorage.getItem("settings-key") ?? "null")).toEqual({
    instanceUrl: "https://api.example.com",
    checkForReleases: false,
  });
});
