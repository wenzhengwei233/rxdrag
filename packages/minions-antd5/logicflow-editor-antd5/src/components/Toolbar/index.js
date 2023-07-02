import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback } from "react";
import styled from "styled-components";
import { Button, Divider, Space } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { MAX_ZOOM, MIN_ZOOM, useBackup, useGraph, useMarkChange, useRedo, useRedoList, useSelected, useUndo, useUndoList, useZoom, useZoomIn, useZoomOut } from "@rxdrag/minions-logicflow-editor";
import { undoIcon, redoIcon, mapIcon, zoomResetIcon } from "./icons";
const StyledToolbar = styled.div `
  display: flex;
  padding: 0 16px;
  height: 40px;
  align-items: center;
  width: 100%;
  border-bottom: ${props => props.theme.token?.colorBorder} solid 1px;
`;
const ToolbarButton = styled((props) => _jsx(Button, { type: "text", size: "small", ...props })) `
`;
const ToobarCenter = styled.div `
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Toolbar = memo((props) => {
    const { showMap, toggleShowMap } = props;
    const { zoom, setZoom } = useZoom();
    const { selected } = useSelected();
    const graph = useGraph();
    const { redoList } = useRedoList();
    const { undoList } = useUndoList();
    const backup = useBackup();
    const markeChange = useMarkChange();
    const handleRemove = useCallback(() => {
        if (selected) {
            backup();
            graph?.getCellById(selected)?.remove();
            markeChange();
        }
    }, [backup, graph, markeChange, selected]);
    const zoomIn = useZoomIn();
    const zoomOut = useZoomOut();
    const undo = useUndo();
    const redo = useRedo();
    const handleZoomReset = useCallback(() => {
        setZoom(1);
    }, [setZoom]);
    return (_jsxs(StyledToolbar, { children: [_jsxs(Space, { children: [_jsx(ToolbarButton, { disabled: !undoList.length, icon: _jsx("span", { role: "img", className: "anticon", children: undoIcon }), onClick: undo }), _jsx(ToolbarButton, { disabled: !redoList.length, icon: _jsx("span", { role: "img", className: "anticon", children: redoIcon }), onClick: redo }), _jsx(Divider, { type: "vertical" }), _jsx(ToolbarButton, { disabled: !selected, icon: _jsx("span", { role: "img", className: "anticon", children: _jsx("svg", { width: "1rem", height: "1rem", viewBox: "0 0 24 24", children: _jsx("path", { fill: "currentColor", d: "M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" }) }) }), onClick: handleRemove })] }), _jsx(ToobarCenter, {}), _jsxs(Space, { children: [_jsx(ToolbarButton, { icon: mapIcon, type: showMap ? "default" : "text", onClick: toggleShowMap }), _jsx(ToolbarButton, { icon: zoomResetIcon, disabled: zoom === 1, onClick: handleZoomReset }), _jsx(ToolbarButton, { icon: _jsx(ZoomOutOutlined, {}), disabled: zoom === MIN_ZOOM, onClick: zoomOut }), _jsx(ToolbarButton, { icon: _jsx(ZoomInOutlined, {}), disabled: zoom === MAX_ZOOM, onClick: zoomIn })] })] }));
});
