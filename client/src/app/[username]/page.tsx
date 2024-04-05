"use client";

import { useFetcher } from "~/hooks/fetcher";
import React from "react";
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Button } from "~/components/ui/button";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useUser } from "@clerk/clerk-react";

function UserProfile({ params }: { params: { username: string } }) {
    const { getUser, getUserPosts, getUserComments, getUserFollowers, getUserFollowing, getUserSubscriptions, getUserPostVotes, getUserCommentVotes, followUser, unfollowUser } = useFetcher();
    const { user } = useUser();
    const currentUsername = user?.username;
    const { data: currentfollowings } = useSWR(`getUserFollowing/${currentUsername}`, getUserFollowing);
    const followingUsernames = currentfollowings?.followings?.map(following => following.username) || [];
    console.log("currentfollowings", followingUsernames);
    const { data: userProfile, error } = useSWR(`getUser/${params.username}`, getUser);

    const [selectedTab, setSelectedTab] = useState('posts');
    const endpoint = selectedTab === 'posts' ? `getUserPosts/${params.username}` :
        selectedTab === 'comments' ? `getUserComments/${params.username}` :
            selectedTab === 'followers' ? `getUserFollowers/${params.username}` :
                selectedTab === 'following' ? `getUserFollowing/${params.username}` :
                    selectedTab === 'subscriptions' ? `getUserSubscriptions/${params.username}` :
                        selectedTab === 'postVotes' ? `getUserPostVotes/${params.username}` :
                            `getUserCommentVotes/${params.username}`;

    const fetcher = selectedTab === 'posts' ? getUserPosts :
        selectedTab === 'comments' ? getUserComments :
            selectedTab === 'followers' ? getUserFollowers :
                selectedTab === 'following' ? getUserFollowing :
                    selectedTab === 'subscriptions' ? getUserSubscriptions :
                        selectedTab === 'postVotes' ? getUserPostVotes :
                            getUserCommentVotes;

    const { data: tabData } = useSWR(endpoint, fetcher);
    const dataToDisplay = selectedTab === 'followers' ? tabData?.followers :
        selectedTab === 'following' ? tabData?.followings :
            tabData;
    console.log(endpoint, dataToDisplay);
    if (error) return <div>Error: {error.message}</div>
    if (!userProfile) return <div>Loading...</div>

    return (
        <div className="flex flex-col justify-between w-full max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row lg:flex-row justify-between w-full">
                <div className="w-full md:w-1/3 p-4">
                    <div className="dark:bg-secondary dark:text-[#d8dce0] bg-white rounded-lg shadow-md p-6">
                        <img className="w-24 h-24 -mt-12 border-4 border-white rounded-full mx-auto shadow-lg" src={userProfile.avatarUrl} alt={userProfile.username} />
                        <h1 className="mb-2 text-xl font-bold">{userProfile.username}</h1>
                        <p className="mb-2 text-sm text-orange-500 dark:text-[#d8dce0]">{userProfile.email}</p>
                        <p className="mb-2 text-sm dark:text-[#d8dce0]">{userProfile.aboutMe}</p>
                        <h2 className="text-lg font-semibold">Social Media</h2>
                        <div className="flex space-x-2 mt-2">
                            <a href={userProfile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href={userProfile.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                        <Button
                            size={"sm"}
                            className="text-sm mt-2"
                            onClick={() => followingUsernames.includes(userProfile.username) ? unfollowUser(currentUsername, userProfile.username) : followUser(currentUsername, userProfile.username)}
                        >
                            {followingUsernames.includes(userProfile.username) ? <FaMinus className="mr-2" /> : <FaPlus className="mr-2" />}
                            {followingUsernames.includes(userProfile.username) ? 'Unfollow' : 'Follow'}
                        </Button>
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-4">
                    <div className="dark:bg-secondary dark:text-[#d8dce0] bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold">Stats</h2>
                        <div className="flex flex-wrap flex-col md:flex-row lg:flex-row justify-between mt-2">
                            <div className="text-center mx-2">Reputation: {userProfile.reputation}</div>
                            <div className="text-center mx-2">Posts: {userProfile.PostCount}</div>
                            <div className="text-center mx-2">Comments: {userProfile.CommentCount}</div>
                            <div className="text-center mx-2">Followers: {userProfile.followersCount}</div>
                            <div className="text-center mx-2">Following: {userProfile.followingCount}</div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 p-4">
                    <div className="dark:bg-secondary dark:text-[#d8dce0] bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold">Basic Information</h2>
                        <div className="mt-2">
                            <div>Last Login: {new Date(userProfile.lastLogin).toLocaleString() || 'Not available'}</div>
                            <div>Country: {userProfile.country || 'Not available'}</div>
                            <div>City: {userProfile.city || 'Not available'}</div>
                            <div>Phone: {userProfile.phone || 'Not available'}</div>
                            <div>Website: {userProfile.website || 'Not available'}</div>
                            <div>Join Time: {new Date(userProfile.createdAt).toLocaleString() || 'Not available'}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full p-4">
                <div className="dark:bg-secondary dark:text-[#d8dce0] bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between">
                        <button
                            className={`p-2 ${selectedTab === 'posts' ? 'text-orange-100' : 'text-orange-500'}`}
                            onClick={() => setSelectedTab('posts')}
                        >
                            Posts
                        </button>
                        <button
                            className={`p-2 ${selectedTab === 'comments' ? 'text-orange-100' : 'text-orange-500'}`}
                            onClick={() => setSelectedTab('comments')}
                        >
                            Comments
                        </button>
                        <button
                            className={`p-2 ${selectedTab === 'followers' ? 'text-orange-100' : 'text-orange-500'}`}
                            onClick={() => setSelectedTab('followers')}
                        >
                            Followers
                        </button>
                        <button
                            className={`p-2 ${selectedTab === 'following' ? 'text-orange-100' : 'text-orange-500'}`}
                            onClick={() => setSelectedTab('following')}
                        >
                            Following
                        </button>
                        <button
                            className={`p-2 ${selectedTab === 'subscriptions' ? 'text-orange-100' : 'text-orange-500'}`}
                            onClick={() => setSelectedTab('subscriptions')}
                        >
                            Subscriptions
                        </button>
                        <button
                            className={`p-2 ${selectedTab === 'postVotes' ? 'text-orange-100' : 'text-orange-500'}`}
                            onClick={() => setSelectedTab('postVotes')}
                        >
                            Post Votes
                        </button>
                        <button
                            className={`p-2 ${selectedTab === 'commentVotes' ? 'text-orange-100' : 'text-orange-500'}`}
                            onClick={() => setSelectedTab('commentVotes')}
                        >
                            Comment Votes
                        </button>
                    </div>
                    <div className="mt-4">
                        {dataToDisplay ? (
                            dataToDisplay.length > 0 ? (
                                // @ts-ignore
                                dataToDisplay.map(item => {
                                    switch (selectedTab) {
                                        case 'posts':
                                            return (
                                                <Link href={`/post/${item.id}`} key={item.id}>
                                                    <div className="bg-white shadow rounded-lg p-4 mb-4">
                                                        <h2 className="text-orange-700">{item.title}</h2>
                                                        <p className="text-orange-700">{item.content}</p>
                                                    </div>
                                                </Link>
                                            );
                                        case 'comments':
                                            return (
                                                <Link href={`/post/${item.postId}`} key={item.id}>
                                                    <div className="bg-white shadow rounded-lg p-4 mb-4">
                                                        <p className="text-orange-700">{item.content}</p>
                                                        <p>Upvotes: {item.upvotesCount}, Downvotes: {item.downvotesCount}</p>
                                                    </div>
                                                </Link>
                                            );
                                        case 'followers':
                                        case 'following':
                                            return (
                                                <Link href={`/${item.username}`} key={item.id}>
                                                    <div className="bg-white shadow rounded-lg p-4 mb-4 w-32 h-32">
                                                        <img
                                                            src={item.avatarUrl}
                                                            alt={item.username}
                                                            className="w-8 h-8 object-cover" // Add these classes
                                                        />
                                                        <p className="text-orange-700">{item.username}</p>
                                                        <p>Reputation: {item.reputation}</p>
                                                    </div>
                                                </Link>
                                            );
                                        case 'subscriptions':
                                            return (
                                                <Link href={`/forum/${item.id}`} key={item.id}>
                                                    <div className="bg-white shadow rounded-lg p-4 mb-4">
                                                        <img src={item.logo} alt={item.name} />
                                                        <h2 className="text-orange-700">{item.name}</h2>
                                                        <p className="text-orange-700">{item.description}</p>
                                                    </div>
                                                </Link>
                                            );
                                        case 'postVotes':
                                            return (
                                                <Link href={`/post/${item.postId}`} key={item.id}>
                                                    <div className="bg-white shadow rounded-lg p-4 mb-4">
                                                        <p className="text-orange-700">{item.content}</p>
                                                        <p>Vote status: {item.voteStatus}, Upvotes: {item.upvotesCount}, Downvotes: {item.downvotesCount}</p>
                                                    </div>
                                                </Link>
                                            );
                                        case 'commentVotes':
                                            return (
                                                <Link href={`/post/${item.postId}`} key={item.id}>
                                                    <div className="bg-white shadow rounded-lg p-4 mb-4">
                                                        <p className="text-orange-700">{item.content}</p>
                                                        <p>Vote status: {item.voteStatus}, Upvotes: {item.upvotesCount}, Downvotes: {item.downvotesCount}</p>
                                                    </div>
                                                </Link>
                                            );
                                        default:
                                            return null;
                                    }
                                })
                            ) : (
                                <p>No data available.</p>
                            )
                        ) : (
                            <div className="flex justify-center items-center h-12">
                                <p className="text-orange-500">Loading...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
