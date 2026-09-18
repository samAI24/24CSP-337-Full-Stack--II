import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'
import Calendar from '../components/Calendar'

describe('Calendar performance app', () => {
  it('renders the calendar heading', () => {
    render(<Calendar events={[]} onEventClick={() => {}} />)

    expect(screen.getByRole('heading', { name: /post calendar/i })).toBeInTheDocument()
  })

  it('filters events as the user types in the search field', () => {
    render(<App />)

    const searchInput = screen.getByPlaceholderText(/search event/i)
    fireEvent.change(searchInput, { target: { value: 'react' } })

    expect(screen.getByText(/react workshop/i)).toBeInTheDocument()
    expect(screen.queryByText(/redux seminar/i)).not.toBeInTheDocument()
  })

  it('calls the click handler when an event is selected', () => {
    const handleEventClick = vi.fn()

    render(
      <Calendar
        events={[{ id: 1, title: 'React Workshop' }]}
        onEventClick={handleEventClick}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /react workshop/i }))

    expect(handleEventClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, title: 'React Workshop' }),
    )
  })
})
