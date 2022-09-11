import { TablePaginationConfig } from 'antd'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'

export interface TTableChangeProps {
  ifShowLoading?: boolean
  pagination?: TablePaginationConfig
  filters?: Record<string, FilterValue>
  sorter?: SorterResult<any> | Array<SorterResult<any>>
  extra?: TableCurrentDataSource<any>
}

export type TProtonTableService = (props: TTableChangeProps) => Promise<any>

export interface TEmitter {
  onTableChange: (props?: TTableChangeProps) => void
}
