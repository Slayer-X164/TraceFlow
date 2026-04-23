import { createRootRoute, Outlet } from "@tanstack/react-router"
import Sidebar from "../components/Sidebar/Sidebar"
import Nav from "../components/Nav"

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="w-screen min-h-screen bg-neutral-100">
      <Nav />
      <div className="h-[calc(100vh-40px)] flex ">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

