export interface PublishRequest {
    myScheduleId: number;
    isAnonymous: boolean;
}

export async function publishToSharedBoard(req: PublishRequest): Promise<void> {
    console.log('공유게시판 게시 요청', req);
    await new Promise((resolve) => setTimeout(resolve, 300));
}
