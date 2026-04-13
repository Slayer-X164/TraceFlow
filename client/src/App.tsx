import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import type { eventDataType } from "./types/eventTypes"
import Nav from "./components/Nav"
import { FaLayerGroup } from "react-icons/fa"
import { RxDashboard } from "react-icons/rx"
import { BiError } from "react-icons/bi"
import { LiaSyncAltSolid } from "react-icons/lia"


export interface groupEvent {
  [fingerprint: string]: {
    event: eventDataType,
    count: number
  }
}
const App = () => {
  const [groupedEvents, setGroupedEvents] = useState<groupEvent>({})
  const [selectedError, setSelectedError] = useState<{ event: eventDataType; count: number } | undefined>()
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL)

    socket.on("new-event", (data: eventDataType) => {
      let fingerprint = `${data.eventType}-${data.message || "no-msg"}-${data.filename || "no-file"}-${data.lineno || 0}-${data.url}`

      setGroupedEvents(prev => {
        const existing = prev[fingerprint] //checks if a entry with this fingerprint already exists in the Object
        return {
          ...prev, //keep previous entries
          [fingerprint]: { //make new entry in Object and if already exists then increment count
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

  const errorList = Object.values(groupedEvents)

  return (
    <div className="w-screen min-h-screen bg-neutral-100">
      <Nav />
      <div className="h-[calc(100vh-40px)] flex ">
        <section className="w-[250px] h-full  overflow-y-auto flex items-center justify-center  p-4">
          <div className="bg-white border border-neutral-200 shadow-xl shadow-neutral-200/50 w-full h-full rounded-3xl py-2 px-4 flex justify-center">
            <li className="list-none w-full">
              <button className="flex items-center justify-between w-full  p-3 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <RxDashboard className="text-neutral-800 font-semibold" />
                  <h3 className="text-neutral-800 font-semibold">Dashboard</h3>
                </div>
                {/* <IoChevronDownOutline  className="text-blue-800 font-semibold"/> */}
              </button>
              <button className="flex items-center justify-between w-full bg-blue-500/15 p-3 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-blue-800 font-semibold" />
                  <h3 className="text-blue-800 font-semibold">Groups</h3>
                </div>
                {/* <IoChevronDownOutline  className="text-blue-800 font-semibold"/> */}
              </button>

            </li>
          </div>
        </section>
        <section className="flex-1">
          <main className="flex items-start h-full">
            {/* LEFT SIDE (error cards)*/}
            <div className="w-1/3  py-4 overflow-y-auto h-full">
              <div className="bg-white rounded-3xl p-4 shadow-lg shadow-neutral-200/50 h-full">
                <h2 className="font-medium text-2xl px-2 pb-2">Errors</h2>

                {errorList.length != 0 ? errorList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedError(item)}
                    className={` p-4 my-2 rounded-2xl border  cursor-pointer hover:bg-blue-50 ${selectedError?.event.message == item.event.message ? "border-blue-800 bg-blue-50" : "border-neutral-200"}`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      {item.event.eventType == "js_error" ? <BiError className="text-xl text-red-600" /> : <LiaSyncAltSolid className="text-yellow-600 text-xl" />}
                      <p className={`capitalize text-lg font-semibold ${item.event.eventType == "js_error" ? "text-red-600" : "text-yellow-600"}`}>{item.event.eventType}</p>
                    </div>
                    <div className="flex items-center text-sm gap-2 ">
                      <p>{item.event.message}</p> -
                      <p className="bg-blue-600 rounded-full py-1 px-3 text-xs font-medium  text-white">{item.count} Times</p>
                    </div>
                  </div>
                )) : (
                  <div className="flex flex-col items-center justify-center h-[50%] gap-3 text-neutral-400">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                      <BiError className="text-2xl" />
                    </div>
                    <p className="text-sm">No Error's Detected Yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE (details)*/}
            <div className="w-2/3 p-4 h-full overflow-y-auto">
              <div className="bg-white rounded-3xl p-5 shadow-lg shadow-neutral-200/50 h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-medium text-2xl">Details</h2>
                  {selectedError && (
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
              ${selectedError.event.eventType === "js_error"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"}`}>
                        {selectedError.event.eventType === "js_error"
                          ? <BiError className="text-sm" />
                          : <LiaSyncAltSolid className="text-sm" />}
                        {selectedError.event.eventType}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                        × {selectedError.count} times
                      </span>
                    </div>
                  )}
                </div>
                {selectedError ? (
                  <>

                    {/* Message highlight */}
                    <div className="bg-blue-50 border-l-3 border-blue-500 rounded-xl px-4 py-3 mb-5">
                      <p className="text-blue-800 text-lg font-medium">{selectedError.event.message}</p>
                    </div>

                    {/* Fields */}
                    <div className="divide-y divide-neutral-100">
                      {[
                        { label: "File", value: selectedError.event.filename, mono: true },
                        { label: "Line / Col", value: `${selectedError.event.lineno} : ${selectedError.event.colno}`, mono: true },
                        { label: "URL", value: selectedError.event.url, url: true },
                        { label: "Error", value: selectedError.event.error },
                        { label: "Time", value: selectedError.event.timestamp },
                      ].map(({ label, value, mono, url }) => (
                        <div key={label} className="grid grid-cols-[110px_1fr] gap-3 py-3 items-start">
                          <span className="text-xs font-medium text-neutral-800 uppercase tracking-wide pt-0.5">{label}</span>
                          {mono ? (
                            <span className="bg-blue-50 text-blue-800 font-mono text-xs px-2 py-1 rounded-md inline-block">{value}</span>
                          ) : url ? (
                            <span className="text-blue-800  text-sm break-all">{value}</span>
                          ) : (
                            <span className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">{value}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-400">

                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                      <BiError className="text-2xl" />
                    </div>
                    <p className="text-sm capitalize">Select an error to see details</p>
                  </div>
                )}

              </div>
            </div>
          </main>
        </section>
      </div>
    </div>
  )
}

export default App