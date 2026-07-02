import { useState } from "react";

interface ListSwitchBtn {
  activatedTab: string;
  activatedTabHandler: (inputValue: string) => void;
}

export function TabButton (){
    const [activatedTab, setActivatedTab] = useState("all");
    const activatedTabHandler = (inputValue: string) => {
        setActivatedTab(inputValue);
    };
    return(
        <ListSwitchBtn activatedTab={activatedTab} activatedTabHandler={activatedTabHandler} />
    );
}

const ListSwitchBtn = ({ activatedTabHandler, activatedTab }: ListSwitchBtn) => {
  return (
    <div className="flex rounded-full bg-gray-100 p-1 w-64">
      <button
        value="all"
        onClick={(e) => activatedTabHandler(e.currentTarget.value)}
        className={`text-sm flex-1 py-2 rounded-full text-center transition-all ${
          activatedTab === "all" ? "bg-white font-bold shadow" : "text-gray-500"
        }`}
      >
        전체게시물
      </button>

      <button
        value="mine"
        onClick={(e) => activatedTabHandler(e.currentTarget.value)}
        className={`text-sm flex-1 py-2 rounded-full text-center transition-all ${
          activatedTab === "mine" ? "bg-white font-bold shadow" : "text-gray-500"
        }`}
      >
        내가 올린 게시물
      </button>
    </div>
  );
};
