import { useEffect, useState } from 'react'
import data from '../data/spreuken.json'

type Item = {
  vraag: string
  antwoord: string
}

type Hoofdgroep = {
  hoofdgroep: string
  items: Item[]
}

const allItems: Item[] = (data as Hoofdgroep[]).flatMap(group => group.items)

export const RandomItem = () => {
  const [item, setItem] = useState<Item | null>(null)
  const [shownItems, setShownItems] = useState<Item[]>([])

  // 🔹 laad eerder getoonde items uit sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('shownItems')
    if (stored) {
      setShownItems(JSON.parse(stored))
    }
  }, [])

  // 🔹 helper: random item kiezen dat nog niet getoond is
  const pickRandom = () => {
    const remaining = allItems.filter(
      i => !shownItems.some(shown => shown.vraag === i.vraag)
    )

    // Als alles al getoond is → reset
    const pool = remaining.length > 0 ? remaining : allItems

    const randomIndex = Math.floor(Math.random() * pool.length)
    const chosen = pool[randomIndex]

    setItem(chosen)

    const updatedShown =
      remaining.length > 0 ? [...shownItems, chosen] : [chosen]

    setShownItems(updatedShown)
    sessionStorage.setItem('shownItems', JSON.stringify(updatedShown))
  }

  return (
    <div className="p-4 rounded-xl flex flex-col gap-4 max-w-xl">  

      {item && (
        <div className="text-center">
          <p className="font-bold text-lg text-gray-800">{item.vraag}</p>
          {item.antwoord && (
            <p className="text-gray-800 mt-2">Antwoord: {item.antwoord}</p>
          )}
        </div>
      )}
      <button
        onClick={pickRandom}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toon een andere spreuk
      </button>
    </div>
  )
}
