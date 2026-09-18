import { memo } from 'react'

function Calendar({ events, onEventClick }) {
  return (
    <section className="calendar-card" aria-label="calendar events">
      <div className="calendar-header">
        <p className="eyebrow">Performance Lab</p>
        <h2>Post Calendar</h2>
        <p className="subtitle">Optimized rendering with memoization and tested interactions.</p>
      </div>

      <div className="event-list" role="list">
        {events.length === 0 ? (
          <p className="empty-state">No events match your search yet.</p>
        ) : (
          events.map((event) => (
            <button
              key={event.id}
              type="button"
              className="event-item"
              onClick={() => onEventClick(event)}
            >
              <span>{event.title}</span>
              <span className="event-chip">Open</span>
            </button>
          ))
        )}
      </div>
    </section>
  )
}

export default memo(Calendar)
