import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { RandomItem } from '../RandomItem'

// 🔹 Mock data.json zodat we voorspelbare data hebben
vi.mock('../data.json', () => {
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

// 🧹 Elke test begint met een schone sessionStorage
beforeEach(() => {
  sessionStorage.clear()
})

describe('RandomItem component', () => {
  it('toont initieel een item', () => {
    render(<RandomItem />)
    expect(
      screen.getByText(/Nog geen item geselecteerd/i)
    ).not.toBeInTheDocument()
  })

  it('toont een nieuw item na klikken op "Nieuwe random vraag"', () => {
    render(<RandomItem />)
    const firstItem = screen.getByText(/./).textContent

    const button = screen.getByRole('button', { name: /Nieuwe random vraag/i })
    fireEvent.click(button)

    const newItem = screen.getByText(/./).textContent
    expect(newItem).not.toEqual(firstItem)
  })

  it('wist geschiedenis en item bij reset', () => {
    render(<RandomItem />)

    // Eerst een item ophalen
    const vraagBefore = screen.getByText(/./).textContent
    expect(vraagBefore).toBeTruthy()

    // Klik op reset
    const resetButton = screen.getByRole('button', { name: /Reset sessie/i })
    fireEvent.click(resetButton)

    // Na reset zou de "Nog geen item geselecteerd" melding zichtbaar zijn
    expect(
      screen.getByText(/Nog geen item geselecteerd/i)
    ).toBeInTheDocument()

    // En er mag geen "Reeds getoond" lijst staan
    expect(screen.queryByText(/Reeds getoond/i)).not.toBeInTheDocument()
  })
})