import React from "react";
import { Button, Card } from "antd";
import { JsonBlockProps } from "./JsonBlock.types";

export const JsonBlock: React.FC<JsonBlockProps> = ({
  title,
  data,
  isLoading,
}) => {
  return (
    <div>
      <Card title={title} loading={isLoading}>
        <code>
          <pre>{data && JSON.stringify(data, null, 2)}</pre>
        </code>
      </Card>
    </div>
  );
};

export default JsonBlock;
