import React, { useState } from "react";

import { Input, Tag, Tooltip, Button, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { removeFromArray } from "../../util";

export const EditableTagGroup: React.FC<{ onChange: any }> = ({ onChange }) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);

  const handleRemove = (value: string) => {
    const newTags = [...removeFromArray(tags, value)];
    setTags(newTags);
    onChange(newTags);
  };

  const handleAdd = (value: string) => {
    if (value) {
      const newTags = [...tags, value];
      setTags(newTags);
      setTagInput("");
      onChange(newTags);
    }
  };

  const handleInput = (value: string) => {
    setTagInput(value);
  };

  return (
    <>
      {tags.map((tag, index) => (
        <Tag key={index} onClick={() => handleRemove(tag)}>
          {tag}
        </Tag>
      ))}
      <Input
        type="text"
        size="small"
        prefix={<PlusOutlined />}
        style={{
          width: "120px",
          background: "#fff",
          borderStyle: "dashed",
        }}
        value={tagInput}
        onChange={(e) => handleInput(e.target.value)}
        onPressEnter={() => handleAdd(tagInput)}
      />
    </>
  );
};
