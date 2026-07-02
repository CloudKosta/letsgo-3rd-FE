export interface MySchedule {
    myScheduleId: number;
    myScheduleTitle: string;
    startAt: string;
    placeCount: number;
    tags: string[];
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
    distanceToNext: DoubleRange;
    scheduleType: string;
}


