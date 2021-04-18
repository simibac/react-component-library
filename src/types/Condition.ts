import { v4 as uuidv4 } from "uuid";
import { DataType } from "../constants/toexternalmodule";

export class Condition {
  id: string;
  name: string;
  pattern: string;
  description: string;
  dataType: DataType;

  constructor(
    name: string,
    pattern: string,
    description: string,
    dataType: DataType
  ) {
    this.id = uuidv4();
    this.name = name;
    this.pattern = pattern;
    this.description = description;
    this.dataType = dataType;
  }
}
