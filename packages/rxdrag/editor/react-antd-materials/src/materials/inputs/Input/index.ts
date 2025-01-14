import { IComponentMaterial } from "@rxdrag/react-core";
import { Input } from "antd";
import { inputIcon } from "./icon";
import { inputLocales, inputResourceLocales } from "./locales";
import { inputSchema } from "./schema";

export * from "./textarea"

export const InputMaterial: IComponentMaterial = {
  componentName: "Input",
  component: Input,
  designer: Input,
  designerLocales: inputLocales,
  propsSchema: inputSchema,
  designerProps: {
    readOnly: true,
    style: {
      cursor: "default",
    }
  },
  resource: {
    name: "Input",
    resourceLocales: inputResourceLocales,
    icon: inputIcon,
    color: "#F5A623",
    elements: [
      {
        componentName: "Input",
      }
    ],
  },
  slots: {
    addonAfter: true,
    addonBefore: true,
    prefix: true,
    suffix: true,
  }
}