import "./TabButton.css";

export type PostTabType = "all" | "mine";

interface TabButtonProps {
  activeTab: PostTabType;
  onTabChange: (tab: PostTabType) => void;
}

export function TabButton({ activeTab, onTabChange }: TabButtonProps) {
  return (
    <div className="post-tab-wrapper">
      <div className="post-tab-group">
        <button
          onClick={() => onTabChange("all")}
          className={`post-tab ${activeTab === "all" ? "post-tab-active" : ""}`}
        >
          전체게시물
        </button>

        <button
          onClick={() => onTabChange("mine")}
          className={`post-tab ${activeTab === "mine" ? "post-tab-active" : ""}`}
        >
          내가 올린 게시물
        </button>
      </div>
    </div>
  );
}