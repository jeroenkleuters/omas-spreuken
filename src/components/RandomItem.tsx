import { useEffect, useState } from 'react'
import data from '../data/data.json'

type Item = {
  vraag: string
  antwoord: string
}

type Hoofdgroep = {
  hoofdgroep: string
  items: Item[]
}

const allItems: Item[] = (data as Hoofdgroep[]).flatMap(g => g.items)

// Helper die, gegeven de huidige (prev) lijst, de volgende keuze bepaalt
function pickNext(prevShown: Item[]) {
  const remaining = allItems.filter(
    i => !prevShown.some(shown => shown.vraag === i.vraag)
  )
  const pool = remaining.length > 0 ? remaining : allItems
  const chosen = pool[Math.floor(Math.random() * pool.length)]
  const updatedShown = remaining.length > 0 ? [...prevShown, chosen] : [chosen]
  return { chosen, updatedShown }
}

export const RandomItem = () => {
  // Lazy init: haal direct uit sessionStorage bij eerste render
  const [shownItems, setShownItems] = useState<Item[]>(() => {
    try {
      const stored = sessionStorage.getItem('shownItems')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [item, setItem] = useState<Item | null>(null)

  // Bij eerste mount automatisch een item kiezen (zoals eerder gewenst)
  useEffect(() => {
    if (!item) {
      setShownItems(prev => {
        const { chosen, updatedShown } = pickNext(prev)
        setItem(chosen)
        sessionStorage.setItem('shownItems', JSON.stringify(updatedShown))
        return updatedShown
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pickRandom = () => {
    setShownItems(prev => {
      const { chosen, updatedShown } = pickNext(prev)
      setItem(chosen)
      sessionStorage.setItem('shownItems', JSON.stringify(updatedShown))
      return updatedShown
    })
  }

  const resetSession = () => {
    // Wis storage én state. Niet direct opnieuw kiezen, zodat alles echt leeg is op het scherm.
    sessionStorage.removeItem('shownItems')
    setShownItems([])
    setItem(null)
  }
  
  return (
    <div className="p-4 rounded-xl flex flex-col gap-4 max-w-xl">  

      {item && (
        <div className="text-center">
          <p data-testid="active-vraag" className="font-bold text-2xl text-pink-500 animate-bounce">
            {item.vraag}
          </p>
          {item.antwoord && (
            <p className="text-gray-800 mt-2">Antwoord: {item.antwoord}</p>
          )}
        </div>
      )}
        <button
        onClick={pickRandom}
        name='show'
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        Toon een andere spreuk
        </button>
        
      {/* Geschiedenis */}
      {shownItems.length > 1 && (
        <><div>
                  <h2 className="font-semibold text-md text-gray-800 mb-2">Reeds getoond:</h2>
                  <ul className="space-y-1 text-sm text-gray-700 max-h-48 overflow-y-auto">
                      {shownItems
                          .slice(0, -1) // laatste item = huidige vraag
                          .sort((a, b) => b.vraag.localeCompare(a.vraag)) // alfabetisch
                          .map((shown, idx) => (
                              <li data-testid='quote' key={idx}>{shown.vraag}</li>
                          ))}
                  </ul>
              </div><button
                  onClick={resetSession}
                  name='reset'
                  className="bg-none text-blue-900 underline"
              >Reset sessie</button>
        </>
      )}
      
    </div>
  )
}
