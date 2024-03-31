'use client'

import {axios} from "~/lib/axios";
import { ForumPost } from "~/types/Forum";

export const useFetcher = () => {
    const allPosts = async (): Promise<ForumPost[]> => {
        try {
            const response = await axios.get('/posts');
            return response.data;
        } catch (error) {
            // @ts-ignore
            throw new Error(error);
        }
    }

    return {
        allPosts
    }
}