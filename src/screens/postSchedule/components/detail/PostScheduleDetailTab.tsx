import "./css/PostScheduleDetailTab.css";

export type PostScheduleDetailTabType = "schedule" | "budget" | "todo";


interface PostScheduleDetailTabProps {
  activeTab: PostScheduleDetailTabType;
  onTabChange: (tab: PostScheduleDetailTabType) => void;
}

export default function PostScheduleDetailTab({ activeTab, onTabChange }: PostScheduleDetailTabProps) {
  return (
    <div className="post-schedule-detail-tab">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={`post-schedule-detail-tab-button ${
            activeTab === tab.key ? "post-schedule-detail-tab-button-active" : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
