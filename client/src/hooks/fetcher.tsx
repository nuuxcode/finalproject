'use client'

import {axios} from "~/lib/axios";
import { Forum, ForumPost } from "~/types/Forum";

export const useFetcher = (filter= 'hot') => {
    const allPosts = async (): Promise<ForumPost[]> => {
        try {
            const response = await axios.get('/posts');
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

    return {
        allPosts,
        allForums,
        getForumPosts,
        getForum,
        createPost
    }
}