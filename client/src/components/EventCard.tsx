import type { eventDataType } from '../types/eventTypes'

const EventCard = (events:eventDataType[]) => {
  return (
     <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className="bg-white p-3 rounded shadow">
            <p><b>Type:</b> {event.eventType}</p>
            <p><b>Message:</b> {event.message}</p>
            <p><b>File:</b> {event.filename}</p>
            <p><b>Line no:</b> {event.lineno}</p>
            <p><b>Column no:</b> {event.colno}</p>
            <p><b>Error:</b> {event.error}</p>
            <p><b>URL:</b> {event.filename}</p>
            <p><b>Time:</b> {event.timestamp}</p>
          </div>
        ))}
      </div>
  )
}

export default EventCard