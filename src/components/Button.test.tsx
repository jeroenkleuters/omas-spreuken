import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

test('renders button and handles click', () => {
  const handleClick = vi.fn()
  render(<Button label="Klik hier" onClick={handleClick} />)

  const button = screen.getByText(/klik hier/i)
  fireEvent.click(button)

  expect(handleClick).toHaveBeenCalledTimes(1)
})