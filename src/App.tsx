import { useState } from 'react'
import { AllQuotes as AllQuotes } from './components/AllQuotes'
import { RandomItem } from './components/RandomItem'
function App() {
  const [showAll, setShowAll] = useState(false)

  return (
    <div>
      <div className="text-center fixed p4">mijn oma had nogal markante uitspraken; deels Amsterdams, deels West Fries.
Op deze webapp kun je ze vinden 😊</div>
        <div className="flex flex-col items-center justify-center h-screen gap-6">
          <div className="flex flex-col items-center justify-center h-screen gap-6">
          <div className="bg-white w-auto min-w-sm lg:min-w-lg max-w-5xl h-auto flex flex-col items-center justify-center p-2 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-blue-900">Mijn oma zei vroeger altijd:</h1>
            {!showAll && (
              <>
                <div className="flex items-center justify-center flex-col">
                  <RandomItem /> 
                </div>          
                <button
                  onClick={() => setShowAll(true)}
                  className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                  Overzicht van alle spreuken
                </button>
                </>
            )}
            {showAll && <AllQuotes onBack={() => setShowAll(false)} />}
          </div>
        </div>
    </div>
    </div>
  )
}


export default App