import { Alert } from "@grafana/ui";
import React, { FC } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const PanelAlert: FC<Props> = ({ title, children }) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <Alert title={title}>{children}</Alert>
    </div>
  );
};
