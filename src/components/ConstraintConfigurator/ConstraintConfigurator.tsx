import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  message,
  Select,
  Space,
  Typography,
  Row,
  Col,
  Input,
  DatePicker,
  Collapse,
  Button,
  Alert,
  Form,
} from "antd";

import { ConstraintConfiguratorProps } from "./ConstraintConfigurator.types";
import { CONDITIONS } from "../../constants/conditions";
import { arrayToEvalString } from "../../util";
import { EditableTagGroup } from "../EditableTagGroup/EditableTagGroup";
const { Option } = Select;
const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

export const ConstraintConfigurator: React.FC<ConstraintConfiguratorProps> = ({
  type,
  devMode,
  constraint,
  conditions,
  condition,
  description,
  arg1,
  arg2,
  testValue,
  testConstraint,
  initConstraint,
  updateConstraint,
  updateTestValue,
}) => {
  useEffect(() => {
    const conditions = CONDITIONS.filter((f) => f.dataType === type);
    initConstraint(conditions);
  }, [type]);

  const onTest = () => {
    try {
      // rollup-disable-warning-next-line EVAL
      if (eval(testConstraint)) message.success("Validation successful", 0.5);
      else message.warning("Validation failed", 0.5);
    } catch (error) {
      console.error(error);
      message.error("Internal Validation Error. Please contact a dev.", 2);
    }
  };

  const debugProps = {
    onTest,
    description,
    constraint,
    testConstraint,
    condition,
    arg1,
    arg2,
    updateConstraint,
    testValue,
    type,
    updateTestValue,
  };

  const handleOperatorChange = (e: any) => {
    const condition = conditions.filter((condition) => condition.name === e)[0];
    console.log(condition.name);
    updateConstraint(condition, arg1, arg2, testValue);
  };

  const handleArg1Input = (value: string) => {
    updateConstraint(condition, value, arg2, testValue);
    console.log(value);
  };

  const handleArg2Input = (dateString: string) => {
    updateConstraint(condition, arg1, dateString, testValue);
  };

  const handleTagInput = (tags: Array<string>) => {
    const evalString = arrayToEvalString(tags);
    updateConstraint(condition, evalString, arg2, testValue);
  };

  const SelectBefore = (
    <Select
      value={condition.name}
      style={{ width: "150px" }}
      onChange={handleOperatorChange}
    >
      {conditions.map((condition) => (
        <Option key={condition.id} value={condition.name}>
          {condition.name}
        </Option>
      ))}
    </Select>
  );

  const Configurator = (
    <Form.Item>
      <Row gutter={[16, 16]} align="middle">
        <Col flex="150px">{SelectBefore}</Col>

        {type === "TEXT" &&
          (condition.name === "is" || condition.name === "contains") && (
            <Col flex="auto">
              <Form.Item
                label="value"
                name="value"
                noStyle
                required
                rules={[{ required: true, message: "Value is required" }]}
              >
                <Input onChange={(e) => handleArg1Input(e.target.value)} />
              </Form.Item>
            </Col>
          )}

        {type === "TEXT" && condition.name === "is one of" && (
          <Col flex="auto">
            <EditableTagGroup onChange={handleTagInput} />
          </Col>
        )}

        {type === "NUMBER" &&
          (condition.name === "is" ||
            condition.name === "is greater than" ||
            condition.name === "is less than" ||
            condition.name === "is greater or equal" ||
            condition.name === "is less or equal") && (
            <Col flex="auto">
              <Form.Item
                label="value"
                name="value"
                noStyle
                required
                rules={[{ required: true, message: "Value is required" }]}
              >
                <Input onChange={(e) => handleArg1Input(e.target.value)} />
              </Form.Item>
            </Col>
          )}

        {type === "DATE" &&
          (condition.name === "is" ||
            condition.name === "is before" ||
            condition.name === "is after") && (
            <Col flex="auto">
              <Form.Item
                label="date"
                name="date"
                noStyle
                required
                rules={[{ required: true, message: "Date is required" }]}
              >
                <DatePicker
                  onChange={(_, dateString: string) =>
                    handleArg1Input(dateString)
                  }
                />
              </Form.Item>
            </Col>
          )}

        {type === "DATE" && condition.name === "is between" && (
          <Col flex="auto">
            <Space>
              <DatePicker
                onChange={(_, dateString: string) =>
                  handleArg1Input(dateString)
                }
              />
              <Text>And</Text>
              <DatePicker
                onChange={(_, dateString: string) =>
                  handleArg2Input(dateString)
                }
              />
            </Space>
          </Col>
        )}
      </Row>
    </Form.Item>
  );

  const DebugSection = (
    <Form.Item>
      <Collapse>
        <Panel header="Test Constraint Evaluation" key="1">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text>
              Use the following Input to evaluate the constraint you defined.
            </Text>
            <Space style={{ width: "100%" }}>
              {(type === "TEXT" || type === "NUMBER" || type === "BOOLEAN") && (
                <Input
                  value={testValue}
                  placeholder="value to test"
                  onChange={(e) => {
                    updateTestValue(e.target.value);
                  }}
                  onPressEnter={onTest}
                />
              )}
              {type === "DATE" && (
                <DatePicker
                  placeholder="value to test"
                  onChange={(_, dateString: string) => {
                    updateTestValue(dateString);
                  }}
                />
              )}
              <Button type="primary" onClick={onTest}>
                validate
              </Button>
            </Space>
            <Alert message={description} type="info" showIcon />
            <Alert
              message={
                <>
                  <Text>The evaluated JS expression is:</Text>
                  <Text code copyable>
                    {'eval("' + testConstraint + '")'}
                  </Text>
                </>
              }
              type="info"
              showIcon
            />
          </Space>
        </Panel>
        <Panel header="Developer Instructions" key="2">
          <Text>
            The entity reading this string can evaluate the string by
            interpreting it as a JavaScript expression as follows:
          </Text>
          <Paragraph>
            <ul>
              <li>
                <Text>
                  The following string can be stored as part of a configuration.
                </Text>
              </li>
              <li>
                <Text>The entity evaluating the constraint replaces </Text>
                <Text code>{"${VALUE}"}</Text>
                <Text> with the value received during runtime.</Text>
              </li>
              <li>
                <Text>With the help of the Javascript </Text>
                <Text code>{"eval()"}</Text>
                <Text> function, the expression can be evaluated.</Text>
              </li>
            </ul>
          </Paragraph>
          <Paragraph copyable>
            <pre>{JSON.stringify(constraint.js)}</pre>
          </Paragraph>
        </Panel>
        <Panel header="Preview Constraint" key="3">
          <code>
            <pre>{constraint && JSON.stringify(constraint, null, 2)}</pre>
          </code>
        </Panel>
      </Collapse>
    </Form.Item>
  );

  return (
    // <Space direction="vertical" style={{ width: "100%" }}>
    //   {Configurator}
    //   {devMode && DebugSection}
    // </Space>

    <>
      {Configurator}
      {devMode && DebugSection}
    </>
  );
};
