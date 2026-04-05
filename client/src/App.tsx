import { useEffect } from "react"
import { io } from "socket.io-client"

const App = () => {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL)

    socket.on("new-event", (data: any) => {
      console.log(data)
    })
    return ()=>{
      socket.off("new-event")
      socket.disconnect()
    }
  }, [])
  return (
    <div className="w-screen min-h-screen bg-neutral-200">
      TraceFlow
    </div>
  )
}

export default App