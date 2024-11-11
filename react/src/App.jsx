import { useState } from 'react'
import { Header } from './components/Header'
import { HL7Form } from './components/HL7Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="ml-10 mt-5 mr-10">
      <Header/>
      <HL7Form/>
    </div>
  )
}

export default App
