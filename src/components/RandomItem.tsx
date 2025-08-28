import { useState } from 'react'
import { useEffect } from 'react'
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

  const pickRandom = () => {
    const randomIndex = Math.floor(Math.random() * allItems.length)
    setItem(allItems[randomIndex])
  }

   // Kies direct bij laden een item
  useEffect(() => {
    pickRandom()
  }, [])

  return (
    <div className="p-6 rounded-xl   flex flex-col gap-4 max-w-xl">
  

      {item && (
        <div>
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
