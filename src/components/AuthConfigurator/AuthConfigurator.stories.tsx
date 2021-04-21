import React from "react";
import { AuthConfigurator } from "./AuthConfigurator";
import useAuthGenerator from "../../hooks/useAuthGenerator";

export default {
  title: "AuthConfigurator",
};

export const Primary = () => {
  const {
    authConfig,
    addClaimConstraint,
    removeClaimConstraint,
  } = useAuthGenerator();
  return (
    <AuthConfigurator
      authConfig={authConfig}
      addClaimConstraint={addClaimConstraint}
      removeClaimConstraint={removeClaimConstraint}
      devMode={true}
    />
  );
};
