export interface IVideo {
    id: string;
    hash: string;
    title: string;
    description: string;
    location: string;
    category: string;
    thumbnailHash: string;
    livepeerID: string;
    isAudio: boolean;
    date: number;
    author: string;
    duration: number;
    bitrate: number;
    size: number;
    createdAt: BigInt;
}