import { api } from "~/trpc/server";
import Link from "next/link";

export default async function ClerkUserPosts({
  params,
}: {
  params: { userId: string };
}) {
  const userPosts = await api.post.getPostsByUser.query({
    userId: params.userId,
  });
  if (!userPosts || userPosts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div>No posts found by this user </div>
        <Link href="/">&larr; Back to home </Link>
      </div>
    );
  }
  return (
    <div className="mt-6 flex max-w-xs flex-col space-y-4">
      <Link href="/">&larr; Back to home </Link>
      <ul className="space-y-2">
        {userPosts.map((post, index) => (
          <li key={index} className="border border-gray-400">
            <p className="text-xs">{`Posted by ${
              post.email
            } on ${post.createdAt.toLocaleDateString()}`}</p>
            <p className="text-xl text-pink-500">{post.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
