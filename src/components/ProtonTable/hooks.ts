import { useContext, useRef } from 'react'
import { ProtonTableContext } from './'
import { TEmitter } from './interface'

export function useCreateEmitter(): TEmitter {
  const emitter = useRef<TEmitter>({
    onTableChange: null,
  })
  return emitter.current
}

export function useGetEmitter(): TEmitter {
  const emitter = useContext(ProtonTableContext)
  return emitter
}
