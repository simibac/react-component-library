import {
  Button,
  Card,
  Cascader,
  Col,
  Collapse,
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

import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ConstraintConfigurator } from "../ConstraintConfigurator";
import { CascaderOptionType } from "antd/lib/cascader";
import {
  DataType,
  IConstraint,
  schemas,
} from "../../constants/toexternalmodule";
import { ClaimConfiguratorProps } from "./ClaimConfigurator.types";
const { Panel } = Collapse;

/**
 * Primary UI component for user interaction
 */
export const ClaimConfigurator: React.FC<ClaimConfiguratorProps> = ({
  claim,
  setClaim,
  selectedContextOptions,
  setSelectedContextOptions,
  dataType,
  setDataType,
  devMode,
  constraintConfigurator,
  form,
}) => {
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

    setDataType(claimDataType);
    setSelectedContextOptions(options.map((o) => o.key));
  };

  const setEssential = (isEssential: boolean) => {
    setClaim({
      ...claim,
      essential: isEssential,
    });
  };

  return (
    <Form id="claim-form" form={form} layout="vertical">
      <Form.Item
        label="Context"
        name="context"
        rules={[{ required: true, message: "Context is required" }]}
        tooltip={{
          title: "Context of the claim.",
          icon: <InfoCircleOutlined />,
        }}
        required
      >
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
          placeholder="Please select the context"
        />
      </Form.Item>
      {dataType && constraintConfigurator}

      {claim.issuers?.map((issuer, index) => (
        <Form.Item>
          <Row key={index} align="middle">
            <Col flex={"auto"}>
              <Form.Item
                label="DID"
                name="did"
                rules={[{ required: true, message: "DID is required" }]}
                tooltip={{
                  title: "Decentralized identifier of the issuer",
                  icon: <InfoCircleOutlined />,
                }}
                required
                noStyle
              >
                <Input
                  placeholder="did:web:..."
                  onChange={(e) => addIssuerDid(e.target.value, index)}
                />
              </Form.Item>
            </Col>
            <Col flex={"auto"} style={{ paddingLeft: 10 }}>
              <Form.Item
                label="URL"
                name="url"
                rules={[{ required: true, message: "URL is required" }]}
                tooltip={{
                  title: "URL of the issuer",
                  icon: <InfoCircleOutlined />,
                }}
                noStyle
                required
              >
                <Input
                  placeholder="https://..."
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
                style={{
                  color: "red",
                }}
              >
                <CloseCircleOutlined />
              </Button>
            </Col>
          </Row>
        </Form.Item>
      ))}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() => addIssuer()}
          block
          icon={<PlusOutlined />}
        >
          Add a Trusted Issuer
        </Button>
      </Form.Item>
      <Form.Item
        label="Reason"
        name="reason"
        rules={[{ required: true, message: "Please add a reason." }]}
        tooltip={{
          title: "We need to know that you are...",
          icon: <InfoCircleOutlined />,
        }}
        required
      >
        <TextArea
          value={claim.reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="State a reason why this claim must be disclosed in the authentication process"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
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

      {devMode && (
        <Collapse>
          <Panel header="Preview Claim" key="1">
            <code>
              <pre>{claim && JSON.stringify(claim, null, 2)}</pre>
            </code>
          </Panel>
        </Collapse>
      )}
    </Form>
  );
};
