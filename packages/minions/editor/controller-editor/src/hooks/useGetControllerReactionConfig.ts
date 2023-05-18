import { useCallback } from "react"
import { useTransformPorts } from "./useTransformPorts"
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { IThemeToken, usePortsConfig, useGetNodeWidth, useGetNodeHeight, useGetSubLabel, IActivityNode } from "@rxdrag/minions-logicflow-editor"

export function useGetControllerReactionConfig(token: IThemeToken) {

  const transformPorts = useTransformPorts(token)
  const portsGroup = usePortsConfig()
  const getNodeWidth = useGetNodeWidth()
  const getHeight = useGetNodeHeight()
  const getSubLabel = useGetSubLabel()
  const getNodeConfig = useCallback((nodeMeta: IActivityNode, material: IActivityMaterial | undefined) => {
    const subLabel = getSubLabel(nodeMeta)
    const height = getHeight(nodeMeta, !!subLabel)
    const width = getNodeWidth(nodeMeta, subLabel)
    const ports = transformPorts(nodeMeta)
    return {
      id: nodeMeta.id,
      shape: "reaction-node",
      x: nodeMeta.x6Node?.x || 340,
      y: nodeMeta.x6Node?.y || 240,
      width: width,
      height: height,
      data: {
        meta: nodeMeta,
        backgroundColor: token.colorBgContainer,
        color: token.colorTextSecondary,
        material,
        token,
        width: width,
        height: height,
        subLabel: subLabel,
        inputCounts: nodeMeta.inPorts?.length || ports.filter(port => port.group === 'in').length,
        outputCounts: nodeMeta.outPorts?.length || ports.filter(port => port.group === 'out').length,
      },
      ports: {
        groups: portsGroup,
        items: ports
      },
    }
  }, [getHeight, getNodeWidth, getSubLabel, portsGroup, token, transformPorts])

  return getNodeConfig
}