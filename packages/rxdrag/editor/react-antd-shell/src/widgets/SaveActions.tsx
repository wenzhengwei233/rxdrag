import { useTranslate } from "@rxdrag/react-locales"
import { Button, Space } from "antd"
import { memo } from "react"

export const SaveActions = memo(() => {
  const t = useTranslate("tools")
  return (
    <Space>
      <Button type="primary"> {t("save")}</Button>
    </Space>
  )
})