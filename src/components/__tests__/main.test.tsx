// __tests__/App.test.tsx

import { render, screen } from '@testing-library/react'
import { describe, it, expect} from 'vitest'
import  App from '../../App'

describe('App', () => {
  it('toont de hoofdtitel', async () => {
    render(<App />)

    const heading = await screen.findByRole('heading', {
        level: 1,
        name: (content) => content.replace(/\s+/g, ' ').includes('Mijn oma zei vroeger altijd:')
    })

    expect(heading).toBeInTheDocument()
  })
})