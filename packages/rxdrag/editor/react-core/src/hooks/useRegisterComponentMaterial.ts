import { IComponentMaterial } from "../interfaces";
import { useCallback } from "react";
import { useComponentManager } from "./useComponentManager";
import { useDesignComponentsParams } from "./useDesignComponentsParams";
import { useLocalesManager } from "./useLocalesManager";
import { useResourceManager } from "./useResourceManager";
import { isStr } from "@rxdrag/shared"
//import { usePreviewComponents } from "@rxdrag/react-runner";
import { ReactComponent } from "@rxdrag/react-shared";
import { IComponentConfig } from "@rxdrag/core";

export function useRegisterComponentMaterial() {
  const resourceManager = useResourceManager()
  const componentManager = useComponentManager()
  const localesManager = useLocalesManager()
  const { registerComponents: registerDesignComponents, registerTools } = useDesignComponentsParams()
  //const { registerComponents: registerPreviewComponents } = usePreviewComponents()

  const register = useCallback((meterial: IComponentMaterial, isSlot?: boolean) => {
    const designers = { [meterial.componentName]: meterial.designer }
    //const previews = { [meterial.componentName]: meterial.component }
    const tools = meterial.tools
    componentManager?.registerComponents(meterial)
    if (meterial.designerLocales) {
      localesManager?.registerComponentLocales(meterial.componentName, meterial.designerLocales)
    }
    if (meterial.resource?.resourceLocales) {
      localesManager?.registerResourceLocales(meterial.resource.resourceLocales)
    }

    if (meterial.toolsLocales) {
      localesManager?.registerToolsLocales(meterial.toolsLocales)
    }

    for (const key of Object.keys(meterial.slots || {})) {
      const slotMaterial = meterial.slots?.[key]
      if (slotMaterial === true || slotMaterial === undefined || isStr(slotMaterial)) {
        continue
      }
      register(slotMaterial as IComponentConfig<ReactComponent>, true)
    }

    registerDesignComponents(designers)
    //registerPreviewComponents(previews)
    tools && registerTools(tools)

    if (meterial.resource && !resourceManager?.getResourceByName(meterial.resource.name) && !isSlot) {
      const resources = resourceManager?.registerResources(meterial.resource)
      return (resources?.[0])
    }
    return undefined
  }, [componentManager, localesManager, registerDesignComponents, registerTools, resourceManager])

  return register
}