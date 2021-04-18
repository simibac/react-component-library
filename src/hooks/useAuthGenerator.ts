import { Dispatch, SetStateAction, useState } from "react";
import IClaimConstraintConfig from "../constants/toexternalmodule";

export default function useAuthGenerator(): {
  authConfig: Array<IClaimConstraintConfig>;
  setAuthConfig: Dispatch<SetStateAction<IClaimConstraintConfig[]>>;
  addClaimConstraint: (claimConstraint: IClaimConstraintConfig) => void;
  removeClaimConstraint: (index: number) => void;
} {
  const [authConfig, setAuthConfig] = useState<Array<IClaimConstraintConfig>>(
    []
  );

  const addClaimConstraint = (claimConstraint: IClaimConstraintConfig) => {
    setAuthConfig([...authConfig, claimConstraint]);
  };
  const removeClaimConstraint = (index: number) => {
    const arr = authConfig;
    arr.splice(index, 1);
    setAuthConfig([...arr]);
  };

  return {
    authConfig,
    setAuthConfig,
    addClaimConstraint,
    removeClaimConstraint,
  };
}
