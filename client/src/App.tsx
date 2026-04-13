import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import type { eventDataType } from "./types/eventTypes"

interface groupEvent {
  [fingerprint: string]: {
    event: eventDataType,
    count: number
  }
}
const App = () => {
  const [groupedEvents, setGroupedEvents] = useState<groupEvent>({})

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL)

    socket.on("new-event", (data: eventDataType) => {
      let fingerprint = `${data.eventType}-${data.message || "no-msg"}-${data.filename || "no-file"}-${data.lineno || 0}-${data.url}`

      setGroupedEvents(prev => {
        const existing = prev[fingerprint] //checks if a entry with this fingerprint already exists in the Object
        return {
          ...prev, //keep previous entries
          [fingerprint]:{ //make new entry in Object and if already exists then increment count
            event: existing ? existing.event : data,
            count: existing ? existing.count + 1 : 1
          }
        }
      })

    })
    return () => {
      socket.off("new-event")
      socket.disconnect()
    }
  }, [])
  return (
    <div className="w-screen min-h-screen bg-neutral-200 p-4">
      <nav><h1 className="text-xl font-bold mb-4">TraceFlow</h1></nav>

      <div className="space-y-3">
        {Object.values(groupedEvents).map(({event,count}, index) => (
          <div key={index} className="bg-white p-3 rounded shadow">
            <p><b>Type:</b> {event.eventType}</p>
            <p><b>Message:</b> {event.message}</p>
            <p><b>File:</b> {event.filename}</p>
            <p><b>Line no:</b> {event.lineno}</p>
            <p><b>Column no:</b> {event.colno}</p>
            <p><b>Error:</b> {event.error}</p>
            <p><b>URL:</b> {event.url}</p>
            <p><b>Time:</b> {event.timestamp}</p>
            <h1>count: {count}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App