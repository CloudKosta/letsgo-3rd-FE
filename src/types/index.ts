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

export interface Colleague {
    userId: string;
    name: string;
    email: string;
    permission: string;
}