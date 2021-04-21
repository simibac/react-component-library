import IClaimConstraintConfig from "../../constants/toexternalmodule";

export interface AuthConfiguratorProps {
  authConfig: Array<IClaimConstraintConfig>;
  addClaimConstraint: (cliamConstraint: IClaimConstraintConfig) => void;
  removeClaimConstraint: (index: number) => void;
  devMode: boolean;
}
