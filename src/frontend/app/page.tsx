
import Navbar from "./components/navbar";
import Home from "./components/home";


export default function Main() {
  return (
    <div className="w-full h-full overflow-auto">
      <Navbar/>
      <Home/>
    </div>
  )
}
