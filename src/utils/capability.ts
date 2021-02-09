import { FieldConfigProperty, StandardOptionConfig } from "@grafana/data";
import { config } from "@grafana/runtime";
import { gte } from "semver";

/**
 * hasCapability returns true if the currently running version of Grafana
 * supports a given feature. Enables graceful degredation for earlier versions
 * that don't support a given capability.
 */
export const hasCapability = (capability: string) => {
  const version = config.buildInfo.version;
  switch (capability) {
    case "color-scheme":
      return gte(version, "7.3.0");
    case "standard-options-object":
      return gte(version, "7.4.0");
    default:
      return false;
  }
};

/**
 * standardOptionsCompat translates the standard options API prior to 7.4 to the
 * new API.
 */
export const standardOptionsCompat = (options: FieldConfigProperty[]): any => {
  const init: Partial<Record<FieldConfigProperty, StandardOptionConfig>> = {};

  return hasCapability("standard-options-object")
    ? options.reduce((acc, curr) => {
        acc[curr] = {};
        return acc;
      }, init)
    : options;
};
