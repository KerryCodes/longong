import { ProtonTable } from './components/ProtonTable'
import { TProtonTableService } from './components/ProtonTable/interface'
import { columns } from './columns'

function App() {
  const emitter = ProtonTable.useCreateEmitter()

  const service: TProtonTableService = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({items: [ {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },]})
      }, 3000)
    })
  }

  return (
    <div className="App">
      <div>
        <ProtonTable title={() => 'Table'} emitter={emitter} service={service} columns={columns} />
      </div>
      <div>
      </div>
    </div>
  )
}

export default App
