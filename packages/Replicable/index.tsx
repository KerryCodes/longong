import { CheckOutlined, CopyOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React, { useState } from 'react'
import styles from './index.less'

export const Replicable = React.memo(function (
  props: React.PropsWithChildren<{
    fixed?: boolean
    position?: 'right' | 'left'
    value: string | number | undefined | null
  }>,
) {
  const { value, position = 'right', fixed = false } = props
  const [copied, setCopied] = useState(false)

  const onClick = () => {
    window.navigator.clipboard.writeText(String(value))
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const button = value !== null && value !== undefined && (
    <Tooltip className={fixed ? '' : styles.button} title={copied ? 'copy_success' : 'copy'}>
      <Button onClick={onClick} type="link" size="small" icon={copied ? <CheckOutlined /> : <CopyOutlined />} />
    </Tooltip>
  )

  return (
    <span className={styles.container}>
      {position === 'left' && button}
      {props.children}
      {position === 'right' && button}
    </span>
  )
})
