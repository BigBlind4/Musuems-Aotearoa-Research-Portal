export class PostModel {
    public userid: string;
    public title: string;
    public details: string;
    public tags: string;
    public topicid: string;
}

export class CommentModel {
    public userid: string;
    public topicid: string;
    public comments: string;
    public commentid: string;
}