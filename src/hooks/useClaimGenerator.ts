import { ICredentialRequestInput } from "@veramo/selective-disclosure";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";

export interface IUseClaimGenerator {
  claim: ICredentialRequestInput;
  setClaim: Dispatch<SetStateAction<ICredentialRequestInput>>;
  selectedContextOptions: Array<string>;
  setSelectedContextOptions: Dispatch<SetStateAction<string[]>>;
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

  const resetClaim = () => {
    setClaim(defaultClaim);
    setSelectedContextOptions([]);
  };

  return {
    claim,
    setClaim,
    selectedContextOptions,
    setSelectedContextOptions,
    resetClaim,
  };
}
