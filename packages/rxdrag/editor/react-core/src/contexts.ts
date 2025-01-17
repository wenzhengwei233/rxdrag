import { IDesignerEngine, IDocument, ITreeNode } from "@rxdrag/core";
import { createContext } from "react";
import { IComponents } from "@rxdrag/react-shared";
import { IComponentsParams, initialParams } from "@rxdrag/react-runner";


export interface IDesignerComponentsParams extends IComponentsParams {
  tools: IComponents,
  registerTools: (...components: IComponents[]) => void
}

export const initialDesignerParams: IDesignerComponentsParams = {
  ...initialParams,
  tools: {},
  registerTools: function (): void {
    throw new Error("Function not implemented.");
  }
}

export const DesignerEngineContext = createContext<IDesignerEngine | undefined>(undefined)
export const DesignComponentsContext = createContext<IDesignerComponentsParams>(initialDesignerParams)
export const DocumentContext = createContext<IDocument | undefined>(undefined)
export const NodeContext = createContext<ITreeNode | undefined>(undefined)
export const LockContext = createContext<boolean | undefined>(undefined)
