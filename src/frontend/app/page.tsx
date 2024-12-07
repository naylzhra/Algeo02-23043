import Image from "next/image";
import ImageRetrieval from "./components/image";
import SideBar from "./components/sidebar";
import AudioBox from "./components/audioBox";

export default function Main() {
  return (
    <div className="w-full h-full">
      <ImageRetrieval/>
      <AudioBox/>
    </div>
  )
}
