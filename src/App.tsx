import { Button } from './components/Button'
import { RandomItem } from './components/RandomItem'
function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">Oma zei vroeger altijd:</h1>
      <div className="flex items-center justify-center bg-gray-100">
      <RandomItem />
    </div>
      {/* <Button label="Klik mij" onClick={() => alert('Button geklikt!')} /> */}
    </div>
  )
}

export default App