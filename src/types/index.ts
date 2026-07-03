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
  budgetDetail: string;
  todoDetail: string;
  owner: boolean;
  routes: PostScheduleRoute[];
}

export interface PostScheduleRoute {
  visitId: string;
  visitOrder: number;
  title: string;
}

export interface Colleague {
    userId: string;
    name: string;
    email: string;
    permission: string;
}
