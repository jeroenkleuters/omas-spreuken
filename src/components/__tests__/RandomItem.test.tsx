// __tests__/RandomItem.test.tsx

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// 🔹 Mock data.json zodat we voorspelbare data hebben
vi.mock('../../data/data.json', () => {
  return {
    default: [
      {
        hoofdgroep: 'Testgroep',
        items: [
          { vraag: 'Vraag 1', antwoord: 'Antwoord 1' },
          { vraag: 'Vraag 2', antwoord: 'Antwoord 2' },
          { vraag: 'Vraag 3', antwoord: 'Antwoord 3' }
        ]
      }
    ]
  }
})

import { RandomItem } from '../RandomItem'

// 🧹 Elke test begint met een schone sessionStorage
beforeEach(() => {
  sessionStorage.clear()
})

describe('RandomItem component', () => {
  it('toont automatisch een eerste vraag', async () => {
    render(<RandomItem />)

    const active = await screen.findByTestId('active-vraag')
    expect(active).toBeInTheDocument()
    expect(active.textContent).toMatch(/Vraag \d/)
  })

  it('voegt een item toe aan de geschiedenis na klikken op "Toon een andere spreuk"', async () => {
    render(<RandomItem />)

    // Eerste vraag komt vanzelf
    await screen.findByTestId('active-vraag')

    const button = await screen.findByRole('button', {
      name: /Toon een andere spreuk/i
    })
    fireEvent.click(button)

    // In de geschiedenis hoort nu precies 1 item te staan
    const historyItems = await screen.findAllByRole('listitem')
    expect(historyItems).toHaveLength(1)
  })

  it('laat de resetknop pas zien na meerdere vragen', async () => {
    render(<RandomItem />)

    await screen.findByTestId('active-vraag')

    // Resetknop mag nog niet bestaan
    expect(screen.queryByRole('button', { name: /Reset sessie/i })).toBeNull()

    // Klik → nu 2 vragen getoond
    const button = await screen.findByRole('button', {
      name: /Toon een andere spreuk/i
    })
    fireEvent.click(button)

    // Nu moet resetknop wel bestaan
    expect(
      await screen.findByRole('button', { name: /Reset sessie/i })
    ).toBeInTheDocument()
  })

  it('wist geschiedenis en actieve vraag bij reset', async () => {
    render(<RandomItem />)

    await screen.findByTestId('active-vraag')

    // Klik om tweede vraag te krijgen
    const button = await screen.findByRole('button', {
      name: /Toon een andere spreuk/i
    })
    fireEvent.click(button)

    // Resetknop verschijnt
    const resetButton = await screen.findByRole('button', {
      name: /Reset sessie/i
    })
    fireEvent.click(resetButton)

    // Na reset: geen geschiedenis
    expect(screen.queryByRole('listitem')).toBeNull()

    // En geen actieve vraag meer
    expect(screen.queryByTestId('active-vraag')).toBeNull()
  })

    it('slaat getoonde items op in sessionStorage', async () => {
    render(<RandomItem />)

    // Eerste vraag wordt automatisch gekozen
    await screen.findByTestId('active-vraag')

    // Controleer sessionStorage na eerste render
    let stored = sessionStorage.getItem('shownItems')
    expect(stored).not.toBeNull()
    let items = JSON.parse(stored!)
    expect(items.length).toBe(1)

    // Klik om een nieuwe vraag te tonen
    const button = await screen.findByRole('button', {
      name: /Toon een andere spreuk/i
    })
    fireEvent.click(button)

    // Controleer sessionStorage opnieuw
    stored = sessionStorage.getItem('shownItems')
    items = JSON.parse(stored!)
    expect(items.length).toBe(2) // nu twee getoonde items
  })

  it('reset wist sessionStorage', async () => {
    render(<RandomItem />)

    // Klik om meerdere items te tonen
    const button = await screen.findByRole('button', { name: /Toon een andere spreuk/i })
    fireEvent.click(button)

    const resetButton = await screen.findByRole('button', { name: /Reset sessie/i })
    fireEvent.click(resetButton)

    expect(sessionStorage.getItem('shownItems')).toBeNull()
  })
})
