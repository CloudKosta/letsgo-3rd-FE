import DropDown from "./components/DropDown";
import PostScheduleCard from "./components/PostScheduleCard";
import {TabButton} from "./components/TabButton";




export default function PostScheduleApp() {
  return (
    <div>
      <DropDown />
      <TabButton />
      <PostScheduleCard />
    </div>
  );
}