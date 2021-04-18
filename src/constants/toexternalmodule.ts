import { ICredentialRequestInput } from "@veramo/selective-disclosure";

export type DataType = "NUMBER" | "DATE" | "BOOLEAN" | "TEXT";

export interface SchemaNode {
  key: string;
  name?: string;
  url?: string;
  children?: Array<SchemaNode>;
  dataType?: DataType;
}

export interface IConstraint {
  js: string;
  desc: string;
}
export default interface IClaimConstraintConfig {
  claim: ICredentialRequestInput;
  constraint: IConstraint;
}

// JSON-LD is a linked data encoding schema. Thus, resolving nodes
export const schemas: [SchemaNode] = [
  {
    key: "https://schema.org",
    children: [
      {
        key: "Person",
        url: "https://schema.org/Person",
        children: [
          {
            key: "birthDate",
            url: "https://schema.org/birthDate",
            dataType: "DATE",
          },
          {
            key: "PostalAddress",
            url: "https://schema.org/Person",
            children: [
              {
                key: "postalCode",
                url: "https://schema.org/postalCode",
                dataType: "TEXT",
              },
            ],
          },
        ],
      },
      {
        key: "Ticket",
        url: "https://schema.org/Ticket",
        children: [
          {
            key: "dateIssued",
            url: "https://schema.org/dateIssued",
            dataType: "DATE",
          },
          {
            key: "ticketNumber",
            url: "https://schema.org/ticketNumber",
            dataType: "TEXT",
          },
          {
            key: "totalPrice",
            url: "https://schema.org/totalPrice",
            dataType: "NUMBER",
          },
        ],
      },
      {
        key: "VoteAction",
        url: "https://schema.org/VoteAction",
        children: [
          {
            key: "name",
            url: "https://schema.org/name",
            dataType: "TEXT",
          },
        ],
      },
      {
        key: "Place",
        url: "https://schema.org/Place",
        children: [
          {
            key: "publicAccess",
            url: "https://schema.org/publicAccess",
            dataType: "BOOLEAN",
          },
        ],
      },
    ],
  },
];
