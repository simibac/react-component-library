import { ICredentialRequestInput } from "@veramo/selective-disclosure";
import { FormInstance } from "antd";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { DataType } from "../../constants/toexternalmodule";

export interface ClaimConfiguratorProps {
  claim: ICredentialRequestInput;
  setClaim: Dispatch<SetStateAction<ICredentialRequestInput>>;
  selectedContextOptions: Array<string>;
  setSelectedContextOptions: Dispatch<SetStateAction<Array<string>>>;
  dataType: DataType | undefined;
  setDataType: Dispatch<SetStateAction<DataType | undefined>>;
  devMode: boolean;
  constraintConfigurator?: ReactNode;
  form: FormInstance<any>;
}
