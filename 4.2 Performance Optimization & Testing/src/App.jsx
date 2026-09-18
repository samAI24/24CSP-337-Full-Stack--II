import { useCallback, useMemo, useState } from 'react'
import Calendar from './components/Calendar'
import './App.css'

const initialEvents = [
  { id: 1, title: 'React Workshop' },
  { id: 2, title: 'Redux Seminar' },
  { id: 3, title: 'Machine Learning' },
  { id: 4, title: 'JavaScript Basics' },
  { id: 5, title: 'UI Performance Review' },
  { id: 6, title: 'Sam AL-Basara - 24BAI70236' },
]

function App() {
  const [search, setSearch] = useState('')
  const [selectedEvent, setSelectedEvent] = useState('')

  const filteredEvents = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return initialEvents

    return initialEvents.filter((event) => event.title.toLowerCase().includes(term))
  }, [search])

  const performanceHighlights = useMemo(
    () => [
      'React.memo keeps the calendar component from re-rendering when its props stay unchanged.',
      'useMemo caches filtered event results so search work is skipped on every keystroke.',
      'useCallback stabilizes the event-click handler and reduces unnecessary child updates.',
    ],
    [],
  )

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event.title)
    window.alert(`Selected: ${event.title}`)
  }, [])

  const todayLabel = useMemo(() => {
    const today = new Date()
    return today.toLocaleDateString('en', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Experiment 4.2</p>
        <h1>Calendar Performance Optimization</h1>
        <p className="intro">
          Memoized components, cached computations, and tested interactions create a faster and
          more reliable calendar experience.
        </p>

        <div className="hero-grid">
          <div className="calendar-summary">
            <p className="summary-title">Today</p>
            <h2>{todayLabel}</h2>
            <p>{filteredEvents.length} visible events ready for review.</p>
          </div>

          <label className="search-box" htmlFor="event-search">
            <span>Search event</span>
            <input
              id="event-search"
              type="text"
              placeholder="Search Event"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="status-card" role="status">
          <strong>Active focus:</strong> {selectedEvent || 'Choose an event to inspect it'}
        </div>

        <div className="highlight-card">
          <h3>Optimizations applied</h3>
          <ul>
            {performanceHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Calendar events={filteredEvents} onEventClick={handleEventClick} />
    </main>
  )
}

export default App
