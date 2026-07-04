export interface MySchedule {
    myScheduleId: number;
    myScheduleTitle: string;
    startAt: string;
    placeCount: number;
    placeTitle: string[];
    isShared: boolean;
}


export interface MyScheduleDetail {
    scheduleTitle: string;
    startAt: string;
    budgetDetail: string;
    todoDetail: string;
    visitId: string;
    visitOrder: string;
    placeId: string;
    title: string;
    distanceToNext: number;
    scheduleType: string;
}

export interface PostSchedule {
  postId: string;
  title: string;
  likeCount: number;
  viewCount: number;
  isAnonymous: number;
  isReported: number;
  isHidden: number;
  userName: string;
  placeTitle: string;
  addr1: string;
  firstImage: string;
}

export interface PostScheduleDetail {
  postId: string;
  scheduleTitle: string;
  likeCount: number;
  viewCount: number;
  writerId: string;
  owner: boolean; 
  routes: RouteSchedule[];
  maps: MapSchedule[];
  budgetDetail: string;
  todoDetail: string;
  isHidden: number;
}

export interface RouteSchedule {
  visitId: string;
  visitOrder: string;
  placeId: string;
  title: string;
  distanceToNext: number;
  scheduleType: string;
}

export interface MapSchedule {
  visitOrder: string;
  title: string;
  mapX: string;
  mapY: string;
  distanceToNext: string;
}

export interface Colleague {
    userId: string;
    name: string;
    email: string;
    permission: string;
}

export interface ScheduleDetailInfo {
    scheduleTitle: string;
    startAt: string;
    budgetDetail: string;
    todoDetail: string;
}

export interface RouteSchedule {
    visitId: string;
    visitOrder: string;
    placeId: string;
    title: string;
    distanceToNext: number;
    scheduleType: string;
}
