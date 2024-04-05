'use client'

import { axios } from "~/lib/axios";
import { Forum, ForumPost } from "~/types/Forum";
import { mutate } from 'swr';

export const useFetcher = (filter = 'hot') => {
    const allPosts = async (sort: string): Promise<ForumPost[]> => {
        try {
            const response = await axios.get(!sort ? '/posts' : `/posts?order=${sort}`);
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const allForums = async (): Promise<Forum[]> => {
        try {
            const response = await axios.get('/forums?limit=25');

            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getForumPosts = async (forumId: string): Promise<ForumPost[]> => {
        try {
            const response = await axios.get(`/forums/${forumId}/posts`);
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getForum = async (forumId: string): Promise<Forum> => {
        try {
            const response = await axios.get(`/forums/${forumId}`);
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const createPost = async (data: any, token: string): Promise<ForumPost> => {
        try {
            const response = await axios.post('/posts/post', {
                ...data
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getPost = async (key: string): Promise<ForumPost> => {
        const postId = key.replace('getPost/', '');
        try {
            const response = await axios.get(`/posts/post/${postId}`);
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const postComment = async (key: string, content: string, parentId: string | null) => {
        const postId = key.replace('postComment/', '');
        try {
            const response = await axios.post('/comments/comment', {
                content,
                postId,
                parentId
            }, {
                withCredentials: true
            });
            console.log(response.data.message);
            mutate(`getComments/${postId}`);
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getComments = async (key: string) => {
        const postId = key.replace('getComments/', '');
        try {
            const response = await axios.get(`/posts/post/${postId}/comments`);
            //console.log("response", response.data)
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getMe = async () => {
        try {
            const response = await axios.get('/users/me', {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const searchPosts = async (key: string): Promise<ForumPost[]> => {
        const query = key.replace('searchPosts/', '');
        try {
            const response = await axios.get(`/posts/filtered-posts/${query}`);
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getUser = async (username: string) => {
        const query = username.replace('getUser/', '');
        try {
            const response = await axios.get(`/users/${query}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getUserFollowers = async (username: string) => {
        const query = username.replace('getUserFollowers/', '');
        try {
            const response = await axios.get(`/users/${query}/followers`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getUserFollowing = async (username: string) => {
        const query = username.replace('getUserFollowing/', '');
        try {
            const response = await axios.get(`/users/${query}/followings`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getUserOwnedForum = async (username: string) => {
        const query = username.replace('getUserOwnedForum/', '');
        try {
            const response = await axios.get(`/users/${query}/owned-forums`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getUserModeration = async (username: string) => {
        const query = username.replace('getUserModeration/', '');
        try {
            const response = await axios.get(`/users/${query}/moderator-forums`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getUserPosts = async (username: string) => {
        const query = username.replace('getUserPosts/', '');
        try {
            const response = await axios.get(`/users/${query}/posts`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getUserComments = async (username: string) => {
        const query = username.replace('getUserComments/', '');
        try {
            const response = await axios.get(`/users/${query}/comments`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getUserPostVotes = async (username: string) => {
        const query = username.replace('getUserPostVotes/', '');
        try {
            const response = await axios.get(`/users/${query}/posts-vote`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }
    const getUserCommentVotes = async (username: string) => {
        const query = username.replace('getUserCommentVotes/', '');
        try {
            const response = await axios.get(`/users/${query}/comments-vote`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const getUserSubscriptions = async (username: string) => {
        const query = username.replace('getUserSubscriptions/', '');
        try {
            const response = await axios.get(`/users/${query}/subs`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const followUser = async (idOrUsername: string, followingIdOrUsername: string) => {
        try {
            const response = await axios.post(`/users/${idOrUsername}/followings/${followingIdOrUsername}`, {}, {
                withCredentials: true
            });
            console.log(response.data.message);
            mutate(`getUserFollowing/${idOrUsername}`);
            mutate(`getUserFollowers/${followingIdOrUsername}`);
            mutate(`getUser/${followingIdOrUsername}`);
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const unfollowUser = async (idOrUsername: string, followingIdOrUsername: string) => {
        try {
            const response = await axios.delete(`/users/${idOrUsername}/followings/${followingIdOrUsername}`, {
                withCredentials: true
            });
            console.log(response.data.message);
            mutate(`getUserFollowing/${idOrUsername}`);
            mutate(`getUserFollowers/${followingIdOrUsername}`);
            mutate(`getUser/${followingIdOrUsername}`);
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    const createForum = async (forumData: { name: string, slug: string, description: string, logo?: string, banner?: string }, token: string) => {
        try {
            const response = await axios.post('/forums', forumData, {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(response.data.message);
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    return {
        createForum,
        unfollowUser,
        followUser,
        allPosts,
        allForums,
        getForumPosts,
        getForum,
        createPost,
        getPost,
        postComment,
        getComments,
        getMe,
        searchPosts,
        getUser,
        getUserFollowers,
        getUserFollowing,
        getUserOwnedForum,
        getUserModeration,
        getUserPosts,
        getUserComments,
        getUserPostVotes,
        getUserCommentVotes,
        getUserSubscriptions,

    }
}
/*

getUserFollowers, /api/v1/users/:idOrUsername/followers

getUserFollowing, /api/v1/users/:idOrUsername/followings

getUserOwnedForum /api/v1/users/:idOrUsername/owned-forums

getUserModeration /api/v1/users/:idOrUsername/moderator-forums

getUserPosts, /api/v1/users/:idOrUsername/posts

getUserComments, /api/v1/users/:idOrUsername/comments

getUserPostVotes, /api/v1/users/:idOrUsername/posts-vote

getUserCommentVote /api/v1/users/:idOrUsername/comments-vote

getUserSubscriptions, /api/v1/users/:idOrUsername/subs

*/
