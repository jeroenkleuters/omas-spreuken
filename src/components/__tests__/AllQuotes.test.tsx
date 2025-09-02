// __tests__/AllQuotes.test.tsx

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// 🔹 Mock data.json zodat we voorspelbare data hebben
vi.mock('../../data/data.json', () => {
  return {
    default: [
      {
        hoofdgroep: 'groep1',
        items: [
          { vraag: 'Vraag 1', antwoord: 'Antwoord 1' },
          { vraag: 'Vraag 2', antwoord: 'Antwoord 2' },
          { vraag: 'Vraag 3', antwoord: 'Antwoord 3' }
        ]
      },
       {
        hoofdgroep: 'groep2',
        items: [
          { vraag: 'Vraag 4', antwoord: 'Antwoord 1' },
          { vraag: 'Vraag 5', antwoord: 'Antwoord 2' },
          { vraag: 'Vraag 6', antwoord: 'Antwoord 3' }
        ]
      }
    ]
  }
})

import { AllQuotes } from '../AllQuotes'

describe('AllQuotes test', () => {
  it('Toon alle quotes', async () => {
    render(<AllQuotes onBack={function (): void {
        throw new Error('Function not implemented.')
    } } />)
  

    const allQuotes = await screen.findAllByRole('listitem')
    expect(allQuotes).toHaveLength(3)

  })

  it('kies een andere groep', async () => {  
    render(<AllQuotes onBack={function (): void {  
        throw new Error('Function not implemented.')
    } } />)
    const groep2Button = await screen.findByRole('button', { name: /groep2/i })
    fireEvent.click(groep2Button)
    const allQuotes = await screen.findAllByRole('listitem')
    expect(allQuotes).toHaveLength(3)
})


  it('klink de terug knop', async () => {   
    const mockOnBack = vi.fn()
    render(<AllQuotes onBack={mockOnBack} />)

    const backButton = await screen.findByRole('button', { name: /Terug/i })
    fireEvent.click(backButton)
    expect(mockOnBack).toHaveBeenCalled()
   })
})