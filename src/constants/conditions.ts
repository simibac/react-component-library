import { Condition } from "../types/Condition";

export const CONDITIONS: Array<Condition> = [
  new Condition(
    "is",
    "'${VALUE}' === '${ARG_1}'",
    "The '${VALUE}' must exactly match '${ARG_1}'.",
    "TEXT"
  ),
  new Condition(
    "contains",
    "'${VALUE}'.includes('${ARG_1}')",
    "The '${VALUE}' must contain the substring '${ARG_1}'.",
    "TEXT"
  ),
  new Condition(
    "is one of",
    "${ARG_1}.includes('${VALUE}')",
    "The '${VALUE}' must exactly match any of the elements from '${ARG_1}'",
    "TEXT"
  ),
  new Condition(
    "has any value",
    "true",
    "The '${VALUE}' can contain any value.",
    "TEXT"
  ),
  new Condition(
    "is",
    "new Date('${VALUE}').getTime() === new Date('${ARG_1}').getTime()",
    "The '${VALUE}' must exactly match '${ARG_1}'.",
    "DATE"
  ),
  new Condition(
    "is before",
    "new Date('${VALUE}').getTime() < new Date('${ARG_1}').getTime()",
    "The '${VALUE}' must be before '${ARG_1}'.",
    "DATE"
  ),
  new Condition(
    "is after",
    "new Date('${VALUE}').getTime() > new Date('${ARG_1}').getTime()",
    "The '${VALUE}' must be after '${ARG_1}'.",
    "DATE"
  ),
  new Condition(
    "is between",
    "new Date('${VALUE}').getTime() >= new Date('${ARG_1}').getTime() && new Date('${VALUE}').getTime() <= new Date('${ARG_2}').getTime()",
    "The '${VALUE}' must be after '${ARG_1}' and before '${ARG_2}'.",
    "DATE"
  ),
  new Condition(
    "has any value",
    "true",
    "The '${VALUE}' can contain any value.",
    "DATE"
  ),
  new Condition(
    "is",
    "${VALUE} === ${ARG_1}",
    "The '${VALUE}' must exactly be ${ARG_1}.",
    "NUMBER"
  ),
  new Condition(
    "is greater than",
    "${VALUE} > ${ARG_1}",
    "The '${VALUE}' must be greater than ${ARG_1}.",
    "NUMBER"
  ),
  new Condition(
    "is greater or eqaual",
    "${VALUE} >= ${ARG_1}",
    "The '${VALUE}' must be greater than ${ARG_1}.",
    "NUMBER"
  ),
  new Condition(
    "is less than",
    "${VALUE} < ${ARG_1}",
    "The '${VALUE}' must be less than ${ARG_1}.",
    "NUMBER"
  ),
  new Condition(
    "is less or eqaual",
    "${VALUE} <= ${ARG_1}",
    "The '${VALUE}' must be less or equal ${ARG_1}.",
    "NUMBER"
  ),
  new Condition(
    "has any value",
    "true",
    "The '${VALUE}' can contain any value.",
    "NUMBER"
  ),

  new Condition(
    "is true",
    "${VALUE} === true",
    "The '${VALUE}' has to be true.",
    "BOOLEAN"
  ),
  new Condition(
    "is false",
    "${VALUE} === false",
    "The '${VALUE}' has to be false.",
    "BOOLEAN"
  ),
  new Condition(
    "has any value",
    "true",
    "The '${VALUE}' can be true or false.",
    "BOOLEAN"
  ),
];
