import { Button } from './components/Button'
import { RandomItem } from './components/RandomItem'
function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <div className="bg-white w-auto h-auto flex flex-col items-center justify-center p-2 rounded-lg shadow-lg">

      
      <h1 className="text-3xl font-bold text-blue-900 m-4">Mijn oma zei vroeger altijd:</h1>
      <div className="flex items-center justify-center">
      <RandomItem />
    </div>
      {/* <Button label="Klik mij" onClick={() => alert('Button geklikt!')} /> */}
    </div>
    </div>
  )
}

export default App