import { DataType, IConstraint } from "../../constants/toexternalmodule";
import { Condition } from "../../types/Condition";

// Generated with util/create-component.js
export interface ConstraintConfiguratorProps {
  type: DataType;
  devMode: boolean;

  constraint: IConstraint;
  conditions: Array<Condition>;
  condition: Condition;
  description: string;
  arg1: string;
  arg2: string;
  testValue: string;
  testConstraint: string;
  initConstraint: (conditions: Array<Condition>) => void;
  resetConstraint: () => void;
  updateConstraint: (
    condition: Condition,
    arg1: string,
    arg2: string,
    value: string
  ) => void;
  updateTestValue: (testValue: string) => void;
}
