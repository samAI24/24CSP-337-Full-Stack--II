import { useMemo, useState } from "react";
import eventsData from "../data/events";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const [posts, setPosts] = useState(eventsData);
  const [formData, setFormData] = useState({
    title: "",
    date: "2026-08-20",
  });

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekday = firstDay.getDay();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstWeekday; i > 0; i -= 1) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i + 1),
        currentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      days.push({
        date: new Date(year, month, day),
        currentMonth: true,
      });
    }

    while (days.length % 7 !== 0) {
      const nextDay = days.length - daysInMonth - firstWeekday + 1;
      days.push({
        date: new Date(year, month + 1, nextDay),
        currentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  const eventsForMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    return posts.filter((event) => {
      const eventDate = new Date(`${event.date}T00:00:00`);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month
      );
    });
  }, [currentDate, posts]);

  const handleAddPost = (event) => {
    event.preventDefault();
    const title = formData.title.trim();

    if (!title || !formData.date) {
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      date: formData.date,
    };

    setPosts((prevPosts) => [...prevPosts, newPost]);
    setFormData({ title: "", date: formData.date });
    setCurrentDate(new Date(formData.date.slice(0, 4), Number(formData.date.slice(5, 7)) - 1, 1));
  };

  const handleDeletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const handleDaySelect = (day) => {
    const selectedDate = formatDateKey(day.date);
    setFormData((prevData) => ({ ...prevData, date: selectedDate }));
    setCurrentDate(new Date(day.date.getFullYear(), day.date.getMonth(), 1));
  };

  return (
    <div className="calendar-card">
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Social media planner</p>
          <h2>Plan posts with a polished calendar view</h2>
          <p>
            Add a new post, pick a date, and remove anything that no longer fits
            your schedule.
          </p>
        </div>

        <form className="composer" onSubmit={handleAddPost}>
          <label htmlFor="post-title">Post title</label>
          <input
            id="post-title"
            name="title"
            type="text"
            placeholder="e.g. Product launch"
            value={formData.title}
            onChange={(event) =>
              setFormData((prevData) => ({ ...prevData, title: event.target.value }))
            }
          />

          <label htmlFor="post-date">Scheduled date</label>
          <input
            id="post-date"
            name="date"
            type="date"
            value={formData.date}
            onChange={(event) =>
              setFormData((prevData) => ({ ...prevData, date: event.target.value }))
            }
          />

          <button type="submit">Schedule Post</button>
        </form>
      </div>

      <div className="calendar-header">
        <button
          type="button"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
        >
          ← Prev
        </button>
        <div className="month-title">
          <p className="eyebrow">Current month</p>
          <h2>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>
        <button
          type="button"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
        >
          Next →
        </button>
      </div>

      <div className="weekday-row">
        {weekdayNames.map((name) => (
          <div key={name} className="weekday-cell">
            {name}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const dateKey = formatDateKey(day.date);
          const dayEvents = posts.filter((event) => event.date === dateKey);

          return (
            <div
              key={`${dateKey}-${index}`}
              className={`day-cell ${day.currentMonth ? "" : "muted"}`}
              role="button"
              tabIndex={0}
              onClick={() => handleDaySelect(day)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleDaySelect(day);
                }
              }}
            >
              <div className="day-number">{day.date.getDate()}</div>
              <div className="event-list">
                {dayEvents.map((event) => (
                  <div key={event.id} className="event-pill">
                    <span>{event.title}</span>
                    <button
                      type="button"
                      className="delete-btn"
                      aria-label={`Delete ${event.title}`}
                      onClick={(clickEvent) => {
                        clickEvent.stopPropagation();
                        handleDeletePost(event.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="month-events">
        <div className="month-events-header">
          <h3>Posts this month</h3>
          <span>{eventsForMonth.length} scheduled</span>
        </div>
        {eventsForMonth.length > 0 ? (
          eventsForMonth.map((event) => (
            <div key={event.id} className="month-event-item">
              <div>
                <strong>{event.title}</strong>
                <p>{event.date}</p>
              </div>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => handleDeletePost(event.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No posts for this month.</p>
        )}
      </div>
    </div>
  );
}

export default CalendarView;
