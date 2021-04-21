import React, { useState } from "react";
import { Button, Collapse, Form, Modal, Space, Tag, Typography } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import useConstraintGenerator, {
  IUseCoinstraintGenerator,
} from "../../hooks/useConstraintGenerator";
import { ClaimConfigurator } from "../ClaimConfigurator/ClaimConfigurator";
import useClaimConfigurator, {
  IUseClaimGenerator,
} from "../../hooks/useClaimGenerator";
import { AuthConfiguratorProps } from "./AuthConfigurator.types";
import { ConstraintConfigurator } from "../ConstraintConfigurator";
const { Title, Text } = Typography;
const { Panel } = Collapse;
export const AuthConfigurator: React.FC<AuthConfiguratorProps> = ({
  authConfig,
  addClaimConstraint,
  removeClaimConstraint,
  devMode,
}) => {
  const constraintProps: IUseCoinstraintGenerator = useConstraintGenerator();
  const claimProps: IUseClaimGenerator = useClaimConfigurator();
  const [showModal, setShowModal] = useState(false);

  const [form] = Form.useForm();

  const handleAddClaim = () => {
    setShowModal(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      addClaimConstraint({
        claim: claimProps.claim,
        constraint: constraintProps.constraint,
      });
      setShowModal(false);
    });
  };

  const handleCancel = () => {
    claimProps.resetClaim();
    constraintProps.resetConstraint();
    setShowModal(false);
  };

  const handleRemoveClaimConstraint = (index: number) => {
    removeClaimConstraint(index);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space>
        {authConfig.map((claimConstraint, index) => (
          <Tag
            closable
            key={claimConstraint.constraint.desc}
            onClose={() => handleRemoveClaimConstraint(index)}
            icon={<ExclamationCircleOutlined />}
            color="warning"
          >
            {claimConstraint.claim.claimType}: {claimConstraint.constraint.desc}
          </Tag>
        ))}

        <Button
          size="small"
          type="dashed"
          onClick={() => handleAddClaim()}
          block
          icon={<PlusOutlined />}
        >
          Add Auth Claim Constraint
        </Button>
      </Space>
      <Modal
        visible={showModal}
        onCancel={handleCancel}
        onOk={handleOk}
        title="Add new claim to auth configuration"
        footer={[
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button
            form="claim-form"
            key="submit"
            htmlType="submit"
            onClick={handleOk}
            type="primary"
          >
            Submit
          </Button>,
        ]}
      >
        <ClaimConfigurator
          {...claimProps}
          devMode={devMode}
          form={form}
          constraintConfigurator={
            <ConstraintConfigurator
              {...constraintProps}
              type={claimProps.dataType}
              devMode={devMode}
            />
          }
        />
      </Modal>
      {devMode && (
        <Collapse>
          <Panel header="Preview Auth Configuration" key="1">
            <code>
              <pre>{authConfig && JSON.stringify(authConfig, null, 2)}</pre>
            </code>
          </Panel>
        </Collapse>
      )}
    </Space>
  );
};
