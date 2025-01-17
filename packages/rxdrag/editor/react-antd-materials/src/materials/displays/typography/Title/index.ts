import { Title } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Title"
export const TitleMaterial: IComponentMaterial = {
  componentName: name,
  component: Title,
  designer: Title,
  designerLocales: locales,
  propsSchema: schema,
  resource: {
    name: name,
    icon: icon,
    color: "#dfa324",
    resourceLocales: resourceLocales,
    elements: [
      {
        componentName: name,
        props: {
          value: name,
        }
      }
    ]
  },

}
