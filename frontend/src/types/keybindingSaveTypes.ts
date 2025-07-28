export interface KeybindingDataSave {
    _id: string,
    name: string,
    category: string,
    keyBinding: Array<{id: string, value: string[]}>,
    public: boolean,
    likeCount: number,
    isLiked: boolean,
    createdAt: string,
    username: string
}