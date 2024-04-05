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

    const postComment = async (key: string, content: string, parentId: string) => {
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

    return {
        allPosts,
        allForums,
        getForumPosts,
        getForum,
        createPost,
        getPost,
        postComment,
        getComments
    }
}
