import React, { useState } from "react";
import { Button, Modal, Space, Tag, Typography } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import IClaimConstraintConfig from "../../constants/toexternalmodule";
import useConstraintGenerator, {
  IUseCoinstraintGenerator,
} from "../../hooks/useConstraintGenerator";
import { ClaimConfigurator } from "../ClaimConfigurator/ClaimConfigurator";
import JsonBlock from "../JsonBlock/JsonBlock";
import useClaimConfigurator from "../../hooks/useClaimGenerator";

const { Title, Text } = Typography;
export interface AuthConfiguratorProps {
  authConfig: Array<IClaimConstraintConfig>;
  setAuthConfig: any;
  addClaimConstraint: (cliamConstraint: IClaimConstraintConfig) => void;
  removeClaimConstraint: (index: number) => void;
  devMode: boolean;
  onSubmit: () => any;
}

export const AuthConfigurator: React.FC<AuthConfiguratorProps> = ({
  authConfig,
  setAuthConfig,
  addClaimConstraint,
  removeClaimConstraint,
  devMode,
  onSubmit,
}) => {
  const constraintProps: IUseCoinstraintGenerator = useConstraintGenerator();
  const {
    claim,
    setClaim,
    resetClaim,
    selectedContextOptions,
    setSelectedContextOptions,
  } = useClaimConfigurator();
  const [showModal, setShowModal] = useState(false);

  const onComplete = () => {};

  const handleAddClaim = () => {
    setShowModal(true);
  };

  const handleOk = () => {
    addClaimConstraint({ claim, constraint: constraintProps.constraint });
    setShowModal(false);
  };
  const handleCancel = () => {
    resetClaim();
    constraintProps.resetConstraint();
    setShowModal(false);
  };
  const handleRemoveClaimConstraint = (index: number) => {
    console.log(index);
    removeClaimConstraint(index);
  };

  return (
    <>
      <Title level={5}>
        Create confituration for the necessary authentication claims
      </Title>
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

      <Modal visible={showModal} onCancel={handleCancel} onOk={handleOk}>
        <ClaimConfigurator
          claim={claim}
          setClaim={setClaim}
          selectedContextOptions={selectedContextOptions}
          setSelectedContextOptions={setSelectedContextOptions}
          constraintProps={constraintProps}
          devMode={devMode}
          onComplete={onComplete}
        />
      </Modal>
      {devMode && (
        <JsonBlock title="Preview Auth Configuration" data={authConfig} />
      )}
      <Button type="primary" onClick={onSubmit}>
        Send To Blockchain
      </Button>
    </>
  );
};
