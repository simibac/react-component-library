import {
  Button,
  Card,
  Cascader,
  Col,
  Form,
  Input,
  Row,
  Space,
  Switch,
  Typography,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import React, { Dispatch, SetStateAction, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { ICredentialRequestInput } from "@veramo/selective-disclosure";
import { ConstraintConfigurator } from "../ConstraintConfigurator";
import { CascaderOptionType } from "antd/lib/cascader";
import { DataType, IConstraint, schemas } from "../../constants/toexternalmodule";
import { IUseCoinstraintGenerator } from "../../hooks/useConstraintGenerator";
import JsonBlock from "../JsonBlock/JsonBlock";

export interface ClaimConfiguratorProps {
  claim: ICredentialRequestInput;
  setClaim: Dispatch<SetStateAction<ICredentialRequestInput>>;
  selectedContextOptions: Array<string>;
  setSelectedContextOptions: Dispatch<SetStateAction<Array<string>>>;
  devMode: boolean;
  onComplete: () => any;
  constraintProps: IUseCoinstraintGenerator;
}

/**
 * Primary UI component for user interaction
 */
export const ClaimConfigurator: React.FC<ClaimConfiguratorProps> = ({
  claim,
  setClaim,
  selectedContextOptions,
  setSelectedContextOptions,
  devMode,
  onComplete,
  constraintProps,
}) => {
  const [claimDataType, setClaimDataType] = useState<DataType | undefined>(
    undefined
  );

  const { constraint } = constraintProps;

  const addIssuerDid = (did: string, index: number) => {
    let issuers = claim.issuers!;

    if (issuers[index]) {
      issuers[index].did = did;
    } else {
      issuers.push({ did: did, url: "" });
    }

    setClaim({
      ...claim,
      issuers,
    });
  };

  const addIssuerUrl = (url: string, index: number) => {
    let issuers = claim.issuers!;

    if (issuers[index]) {
      issuers[index].url = url;
    } else {
      issuers.push({ did: "", url: url });
    }

    setClaim({
      ...claim,
      issuers,
    });
  };

  const addIssuer = () => {
    setClaim({
      ...claim,
      issuers: [...claim.issuers!, { did: "", url: "" }],
    });
  };

  const removeIssuer = (index: number) => {
    let issuers = claim.issuers!;
    issuers.splice(index, 1);

    setClaim({
      ...claim,
      issuers,
    });
  };

  const setReason = (reason: string) => {
    if (reason) {
      setClaim({
        ...claim,
        reason: reason,
      });
    } else {
      delete claim.reason;
      setClaim({
        ...claim,
      });
    }
  };

  const handleClaimType = (options: Array<CascaderOptionType>) => {
    const credentialContext = options[0]["key"];
    const credentialType = options[options.length - 2]["key"];
    const claimType = options[options.length - 1]["key"];
    const claimDataType = options[options.length - 1]["dataType"] as DataType;

    setClaim({
      ...claim,
      claimType: claimType,
      credentialContext,
      credentialType,
    });

    setClaimDataType(claimDataType);
    setSelectedContextOptions(options.map((o) => o.key));
  };

  const setEssential = (isEssential: boolean) => {
    setClaim({
      ...claim,
      essential: isEssential,
    });
  };

  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Title level={5}>Claim Context (Type)</Title>
      <Form.Item>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Cascader
            value={selectedContextOptions}
            style={{ width: "100%" }}
            options={schemas}
            fieldNames={{
              label: "key",
              value: "key",
              children: "children",
            }}
            onChange={(_, selectedOptions) => {
              if (selectedOptions) {
                handleClaimType(selectedOptions);
              }
            }}
            placeholder="Please select"
          />
          {claimDataType && (
            <ConstraintConfigurator
              {...constraintProps}
              type={claimDataType}
              devMode={true}
            />
          )}
        </Space>
      </Form.Item>

      <Title level={5}>Accepted Issuers</Title>
      <>
        <div>
          {claim.issuers?.map((issuer, index) => (
            <Row key={index}>
              <Col flex={"auto"}>
                <Form.Item rules={[{ required: true, message: "Missing DID" }]}>
                  <Input
                    placeholder="DID"
                    onChange={(e) => addIssuerDid(e.target.value, index)}
                  />
                </Form.Item>
              </Col>
              <Col flex={"auto"} style={{ paddingRight: 10, paddingLeft: 10 }}>
                <Form.Item rules={[{ required: true, message: "Missing URL" }]}>
                  <Input
                    placeholder="URL"
                    onChange={(e) => addIssuerUrl(e.target.value, index)}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Button
                  type={"text"}
                  onClick={() => {
                    removeIssuer(index);
                  }}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => addIssuer()}
              block
              icon={<PlusOutlined />}
            >
              Add Issuer
            </Button>
          </Form.Item>
        </div>
      </>
      <Title level={5}>Options</Title>
      <Form.Item>
        <Row>
          <Col>
            <Typography>Essential</Typography>
          </Col>
          <Col flex="auto"></Col>
          <Col>
            <Switch
              defaultChecked
              onChange={(checked, event) => setEssential(checked)}
            />
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
        <TextArea
          value={claim.reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
      <Button>Submit</Button>
      <JsonBlock title={"Preview Claim"} data={claim} />
      <JsonBlock title={"Preview Constraint"} data={constraint} />
    </Form>
  );
};
