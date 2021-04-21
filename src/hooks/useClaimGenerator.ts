import { ICredentialRequestInput } from "@veramo/selective-disclosure";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { DataType } from "../constants/toexternalmodule";

export interface IUseClaimGenerator {
  claim: ICredentialRequestInput;
  setClaim: Dispatch<SetStateAction<ICredentialRequestInput>>;
  selectedContextOptions: Array<string>;
  setSelectedContextOptions: Dispatch<SetStateAction<string[]>>;
  dataType: DataType | undefined;
  setDataType: Dispatch<SetStateAction<DataType | undefined>>;
  resetClaim: () => void;
}

export default function useClaimGenerator(): IUseClaimGenerator {
  const defaultClaim: ICredentialRequestInput = {
    claimType: "",
    issuers: [],
  };

  const [claim, setClaim] = useState<ICredentialRequestInput>(defaultClaim);
  const [selectedContextOptions, setSelectedContextOptions] = useState<
    Array<string>
  >([]);
  const [dataType, setDataType] = useState<DataType | undefined>(undefined);

  const resetClaim = () => {
    setClaim(defaultClaim);
    setSelectedContextOptions([]);
    setDataType(undefined);
  };

  return {
    claim,
    setClaim,
    selectedContextOptions,
    setSelectedContextOptions,
    dataType,
    setDataType,
    resetClaim,
  };
}
