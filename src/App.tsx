import { Button } from './components/Button'

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">🚀 React + TS + Tailwind + Vitest</h1>
      <Button label="Klik mij" onClick={() => alert('Button geklikt!')} />
    </div>
  )
}

export default App