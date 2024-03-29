import { User } from './User';

export interface ForumPost {
    id: string;
    title: string;
    content: string;
    userId: string;
    forumId: string;
    isPinned: boolean;
    isVisible: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
    commentsCount: number;
    viewsCount: number;
    votesCount: number;
    user: User;
    forum: Forum;
    attachments: Attachment[];
}

export interface Attachment {
    id: string;
    url: string;
    name: string;
}

export interface Attachments {
    attachments: Attachment;
}

interface Forum {
    name: string;
    slug: string;
}

// {
//     "id": "clu7pxyzh000m12b8nh0e655o",
//     "title": "What are some good resources for learning about computer networks?",
//     "content": "Computer networks are the infrastructure that enables devices to communicate and share data with each other. Some good starting points for learning about computer networks include studying network protocols like TCP/IP and HTTP, learning about network topologies and architectures, and exploring network security principles like encryption and firewalls.",
//     "userId": "clu7pxw5a000012b88d0kmrox",
//     "forumId": "clu7pxxbt000b12b8qeheychz",
//     "isPinned": true,
//     "isVisible": true,
//     "slug": "contra-expedita-crebro",
//     "createdAt": "2024-03-26T01:49:14.715Z",
//     "updatedAt": "2024-03-26T01:49:14.715Z",
//     "commentsCount": 44,
//     "viewsCount": 486,
//     "votesCount": 0,
//     "upvotesCount": 0,
//     "downvotesCount": 0,
//     "acceptedCommentId": null,
//     "user": {
//         "username": "Eusebio35",
//         "avatarUrl": "https://i.pravatar.cc/300?u=f035ee32-f0dd-454f-bb59-181f5aa88427",
//         "reputation": 71
//     },
//     "attachments": [
//         {
//             "id": "clu7pxz3y000o12b8xcbt76tp",
//             "postId": "clu7pxyzh000m12b8nh0e655o",
//             "attachmentId": "clu7pxyv0000k12b8zkp7q7b7",
//             "name": "phew_robust_homeland.jsonld.jpg",
//             "type": "image/jpeg",
//             "url": "https://picsum.photos/200/300?random=149",
//             "createdAt": "2024-03-26T01:49:14.556Z",
//             "updatedAt": "2024-03-26T01:49:14.556Z"
//         }
//     ],
//     "forum": {
//         "name": "recusandae tergo ullam",
//         "slug": "sub-aro-nihil"
//     }
// }