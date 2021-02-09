import { DisplayValue } from "@grafana/data";

export const measureText = (
  text: string,
  size: string
): TextMetrics | undefined => {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = `${size} sans-serif`;
    return ctx.measureText(text);
  }
  return undefined;
};

export const getFormattedDisplayValue = (
  displayValue?: DisplayValue
): string => {
  return displayValue
    ? `${displayValue.prefix ?? ""}${displayValue.text}${
        displayValue.suffix ?? ""
      }`
    : "";
};
