export interface ApiResponse {
    Body: BodyResponse[];
    Timeline: TimelineItem[];
}

export interface BodyResponse {
    About: string;
    Background: string;
    BackgroundOpacity: number;
    CSS: null;
    Epoch: number;
    Id: number;
    JS: string;
    Status: number;
    createDate: CreatedDateObj;
}

export interface TimelineItem {
    Id: string;
    Title: string;
    Media: number;
    Description: string;
    Image: string;
    Icon: string;
    Audio: string;
    RemoteId: string;
    Status: number;
    IsActive: number;
    InId: string;
    CreateDate: string;
    MediaName: string;
    Category: string;
    Epoch: number;
    AudioSize: number;
}

export interface CreatedDateObj {
    date: string;
    timezone: string;
    timezone_type: number;
}