// Generated with util/create-component.js
import React from "react";
import { AuthConfigurator } from "./AuthConfigurator";
import useAuthGenerator from "../../hooks/useAuthGenerator";

export default {
  title: "AuthConfigurator",
};

export const Primary = () => {
  const {
    authConfig,
    setAuthConfig,
    addClaimConstraint,
    removeClaimConstraint,
  } = useAuthGenerator();
  return (
    <AuthConfigurator
      authConfig={authConfig}
      setAuthConfig={setAuthConfig}
      addClaimConstraint={addClaimConstraint}
      removeClaimConstraint={removeClaimConstraint}
      devMode={true}
      onSubmit={() => console.log("hello")}
    />
  );
};
