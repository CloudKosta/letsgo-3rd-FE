import type { Colleague } from '../types';

export const mockCompanionList: Record<number, Colleague[]> = {
    1: [
        { userId: 'u1', name: '나', email: 'me@example.com', permission: 'OWNER' },
        { userId: 'u2', name: '한상인', email: 'han@example.com', permission: 'EDITOR' },
    ],
    2: [
        { userId: 'u1', name: '나', email: 'me@example.com', permission: 'OWNER' },
        { userId: 'u3', name: '김여름', email: 'summer@example.com', permission: 'EDITOR' },
        { userId: 'u4', name: '이바다', email: 'sea@example.com', permission: 'VIEWER' },
    ],
    3: [
        { userId: 'u1', name: '나', email: 'me@example.com', permission: 'OWNER' },
    ],
    4: [
        { userId: 'u1', name: '나', email: 'me@example.com', permission: 'OWNER' },
        { userId: 'u5', name: '박제주', email: 'jeju@example.com', permission: 'VIEWER' },
    ],
};
