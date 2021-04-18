import { useState } from "react";
import { CONDITIONS } from "../constants/conditions";
import { IConstraint } from "../constants/toexternalmodule";
import { Condition } from "../types/Condition";

export interface IUseCoinstraintGenerator {
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

export default function useConstraintGenerator(): IUseCoinstraintGenerator {
  const initialConstraint: IConstraint = { js: "", desc: "" };

  const [constraint, setConstraint] = useState<IConstraint>(initialConstraint);

  const [conditions, setConditions] = useState<Array<Condition>>([]);
  const [condition, setCondition] = useState<Condition>(CONDITIONS[0]);
  const [description, setDescription] = useState<string>("");
  const [arg1, setArg1] = useState<string>("");
  const [arg2, setArg2] = useState<string>("");
  const [testValue, setTestValue] = useState<string>("");
  const [testConstraint, setTestConstraint] = useState<string>("");

  const updateConstraint = (
    condition: Condition,
    arg1: string,
    arg2: string,
    value: string
  ) => {
    setArg1(arg1);
    setArg2(arg2);
    setTestValue(value);
    if (condition) {
      setCondition(condition);
      let expression = condition.pattern;
      expression = expression.split("${ARG_1}").join(arg1);
      expression = expression.split("${ARG_2}").join(arg2);
      setConstraint({ js: expression, desc: description });
      expression = expression.split("${VALUE}").join(value);
      setTestConstraint(expression);
      let desc = condition.description;
      desc = desc.split("'${VALUE}'").join("value");
      desc = desc.split("${ARG_1}").join(arg1);
      desc = desc.split("${ARG_2}").join(arg2);
      setDescription(desc);
    }
  };

  const initConstraint = (conditions: Array<Condition>) => {
    setConstraint(initialConstraint);
    setConditions(conditions);
    setCondition(conditions[0]);
    setDescription("");
    setArg1("");
    setArg2("");
    setTestValue("");
    setTestConstraint("");
  };

  const updateTestValue = (testValue: string) => {
    console.log("arg1" + arg1);
    console.log("arg2" + arg2);
    console.log("arg1" + arg1);

    updateConstraint(condition, arg1, arg2, testValue);
  };

  const resetConstraint = () => {
    setConstraint(initialConstraint);
    setCondition(CONDITIONS[0]);
    setDescription("");
    setArg1("");
    setArg2("");
    setTestValue("");
    setTestConstraint("");
  };

  return {
    constraint,
    conditions,
    condition,
    description,
    arg1,
    arg2,
    testValue,
    testConstraint,
    initConstraint,
    resetConstraint,
    updateConstraint,
    updateTestValue,
  };
}
