import { Table, TablePaginationConfig, TableProps } from 'antd'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface'
import React, { useEffect, useRef, useState } from 'react'
import { useCreateEmitter, useGetEmitter } from './hooks'
import { TProtonTableService, TEmitter, TTableChangeProps } from './interface'
import { defaultTransResponseToDataSource, defaultTransResponseToPagination } from './utils'

export const ProtonTableContext = React.createContext<TEmitter>(null)

export function ProtonTable(
  props: React.PropsWithoutRef<{
    emitter: TEmitter
    service: TProtonTableService
    initialPagination?: TablePaginationConfig
    pollTime?: number
    transResponseToDataSource?: (response: any) => any[]
    transResponseToPagination?: (response: any) => TablePaginationConfig
  }> &
    TableProps<any>,
) {
  const {
    emitter,
    service,
    pollTime,
    initialPagination = { current: 1, pageSize: 10 },
    transResponseToDataSource = defaultTransResponseToDataSource,
    transResponseToPagination = defaultTransResponseToPagination,
    ...antdTableProps
  } = props
  const timeIdRef = useRef<NodeJS.Timeout>()
  const cacheTableChangePropsRef = useRef<Omit<TTableChangeProps, 'ifShowLoading'>>({})
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [paginationConfig, setPaginationConfig] = useState<TablePaginationConfig>(initialPagination)

  emitter.onTableChange = (props: TTableChangeProps = cacheTableChangePropsRef.current) => {
    const { ifShowLoading = true, pagination = paginationConfig, filters, sorter, extra } = props
    cacheTableChangePropsRef.current = { pagination, filters, sorter, extra }
    clearTimeout(timeIdRef.current)
    setLoading(ifShowLoading)
    service({ ifShowLoading, pagination, filters, sorter, extra }).then(response => {
      setDataSource(transResponseToDataSource(response))
      setPaginationConfig(transResponseToPagination(response))
    }).finally(() => {
      setLoading(false)
      if (typeof pollTime === 'number') {
        timeIdRef.current = setTimeout(
          () =>
            emitter.onTableChange({
              ...cacheTableChangePropsRef.current,
              ifShowLoading: false,
            }),
          pollTime,
        )
      }
    })
  }

  const onChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<any> | Array<SorterResult<any>>,
    extra: TableCurrentDataSource<any>,
  ) => {
    emitter.onTableChange({ pagination, filters, sorter, extra })
  }

  useEffect(() => {
    emitter.onTableChange()
    return () => clearTimeout(timeIdRef.current)
  }, [])

  return (
    <ProtonTableContext.Provider value={emitter}>
      <Table loading={loading} dataSource={dataSource} pagination={paginationConfig} onChange={onChange} {...antdTableProps} />
    </ProtonTableContext.Provider>
  )
}

ProtonTable.useCreateEmitter = useCreateEmitter
ProtonTable.useGetEmitter = useGetEmitter
