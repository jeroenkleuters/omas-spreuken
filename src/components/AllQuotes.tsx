import { useState } from 'react'
import data from '../data/data.json'

type Item = {
  vraag: string
  antwoord: string
}

type Hoofdgroep = {
  hoofdgroep: string
  items: Item[]
}

type Props = {
  onBack: () => void
}

export const AllQuotes = ({ onBack }: Props) => {
  const groups: Hoofdgroep[] = (data as Hoofdgroep[])
    .map(g => ({
      ...g,
      items: g.items.sort((a, b) => a.vraag.localeCompare(b.vraag))
    }))
    .sort((a, b) => a.hoofdgroep.localeCompare(b.hoofdgroep))

  const [activeGroup, setActiveGroup] = useState<string>(
    groups.length > 0 ? groups[0].hoofdgroep : ''
  )

  return (
    <>
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-4 ">
        {groups.map(group => (
          <button
            key={group.hoofdgroep}
            onClick={() => setActiveGroup(group.hoofdgroep)}
            className={`px-4 py-2 rounded ${
              activeGroup === group.hoofdgroep
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {group.hoofdgroep}
          </button>
        ))}
      </div>

      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 max-h-48 overflow-y-auto">
        {groups
          .find(g => g.hoofdgroep === activeGroup)
          ?.items.map((item, idx) => (
            <li key={idx}>
              <p className="font-bold">{item.vraag}</p>
              {item.antwoord && <p className="text-gray-700">{item.antwoord}</p>}
            </li>
          ))}
      </ul>
    </div>
    <button
        onClick={onBack}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mb-4"
      >
        Terug
      </button>
      </>
  )
}