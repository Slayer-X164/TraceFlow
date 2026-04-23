
import { RxDashboard } from 'react-icons/rx';
import { FaLayerGroup } from 'react-icons/fa';
import Buttons from './Buttons';

const Sidebar = () => {

  const sidebarBtns = [
    {
      name: "Dashboard",
      to: "/",

      icon: RxDashboard
    },
    {
      name: "Groups",
      to: "/groups",

      icon: FaLayerGroup
    }
  ]
  return (
    <section className="w-[300px] h-full  overflow-y-auto flex items-center justify-center  p-4">
      <div className="bg-white border border-neutral-200 shadow-xl shadow-neutral-200/50 w-full h-full rounded-3xl py-2 px-4 flex justify-center">
        <li className="list-none w-full flex flex-col items-center gap-3 pt-2">
          {sidebarBtns.map((item, idx) => (
            <Buttons key={idx} name={item.name} to={item.to} icon={item.icon} />
          ))}
        </li>
      </div>
    </section>
  )
}

export default Sidebar