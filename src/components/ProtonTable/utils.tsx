import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, TablePaginationConfig } from 'antd'
import { ColumnType } from 'antd/lib/table'

export function defaultTransResponseToDataSource(response: any): any[] {
  return response.items
}

export function defaultTransResponseToPagination(response: any): TablePaginationConfig {
  return {
    current: response.pageNum,
    pageSize: response.pageSize,
    total: response.totalSize,
  }
}

export function getColumnSearchProps(placeholder: string): ColumnType<any> {
  return {
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#0366c1' : undefined }} />,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <Space direction="vertical" style={{ padding: 8 }}>
        <Input placeholder={placeholder} value={selectedKeys} onChange={e => setSelectedKeys(e.target.value)} onPressEnter={confirm} allowClear />
        <Space>
          <Button
            onClick={() => {
              clearFilters()
              confirm()
            }}
            size="small"
            style={{ width: 90 }}
          >
            <span>Reset</span>
          </Button>
          <Button onClick={confirm} style={{ width: 90 }} type="primary" size="small" icon={<SearchOutlined />}>
            <span>Search</span>
          </Button>
        </Space>
      </Space>
    ),
  }
}
