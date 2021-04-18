import { VerifiablePresentation } from "@veramo/core";
import { ICreateSelectiveDisclosureRequestArgs } from "@veramo/selective-disclosure";
import { useState } from "react";

export default function useSdrGenerator() {
  const [loading, setLoading] = useState<boolean>(false);
  const [signedVP, setSignedVP] = useState<VerifiablePresentation | undefined>(
    undefined
  );

  const [
    createSdrArgs,
    setCreateSdrArgs,
  ] = useState<ICreateSelectiveDisclosureRequestArgs>({
    data: {
      issuer: "did:ethr:0xb2e9fe08ca9a0323103883fe12c9609ed380f475",
      claims: [
        {
          claimType: "",
          issuers: [],
          essential: false,
        },
      ],
      subject: "did:ethr:0xb2e9fe08ca9a0323103883fe12c9609ed380f475",
    },
  });

  return {
    createSdrArgs,
    setCreateSdrArgs,
    signedVP,
    setSignedVP,
    loading,
    setLoading,
  };
}
