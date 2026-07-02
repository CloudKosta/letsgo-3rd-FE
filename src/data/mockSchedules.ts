import type { MySchedule } from "../types";


export const mockSchedules: MySchedule[] = [
    {
        myScheduleId: 1,
        myScheduleTitle: '가평주말 나들이',
        startAt: '2026-07-12',
        placeCount: 9,
        placeTitle: ['가평 패밀리아일랜드', '자라섬'],
        isShared: false,
    },
    {
        myScheduleId: 2,
        myScheduleTitle: '여름 강원도 치킨',
        startAt: '2026-07-18',
        placeCount: 9,
        placeTitle: ['양양 서피비치', '낙산해변', '삼척 촬영지'],
        isShared: true,
    },
    {
        myScheduleId: 3,
        myScheduleTitle: '부산 먹방 투어',
        startAt: '2026-08-03',
        placeCount: 6,
        placeTitle: ['해운대', '광안리', '자갈치시장'],
        isShared: false,
    },
    {
        myScheduleId: 4,
        myScheduleTitle: '제주도 힐링 여행',
        startAt: '2026-08-15',
        placeCount: 12,
        placeTitle: ['성산일출봉', '우도', '협재해변'],
        isShared: true,
    },
];
