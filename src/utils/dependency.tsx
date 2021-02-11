import React from "react";
import { PanelPlugin } from "@grafana/data";
import { config } from "@grafana/runtime";
import { PanelAlert } from "../components/PanelAlert";
import { satisfies } from "semver";
import { getBackendSrv } from "@grafana/runtime";

interface PluginMeta {
  id: string;
  dependencies: {
    grafanaDependency: string;
  };
}

/**
 * getPluginOrFallback checks if the currently running Grafana version satisfies
 * the plugin requirements. If not, an error is displayed instead.
 *
 * TODO: Is there anyway to detect the plugin id automatically?
 */
export const getPanelPluginOrFallback = async (
  pluginId: string,
  plugin: PanelPlugin
): Promise<PanelPlugin> => {
  const res = await getBackendSrv().datasourceRequest({
    url: `/public/plugins/${pluginId}/plugin.json`,
  });

  const meta: PluginMeta = res.data;

  if (
    satisfies(config.buildInfo.version, meta.dependencies.grafanaDependency)
  ) {
    return plugin;
  }

  return new PanelPlugin<any>(() => (
    <PanelAlert
      title={`Error loading: ${meta.id}`}
    >{`This plugin requires a more recent version of Grafana (${meta.dependencies.grafanaDependency}).`}</PanelAlert>
  ));
};
