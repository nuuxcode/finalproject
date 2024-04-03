import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useFetcher } from '~/hooks/fetcher';

interface CommentType {
  id: string;
  content: string;
  userId: string;
  postId: string;
  isVisible: boolean;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  votesCount: number;
  upvotesCount: number;
  downvotesCount: number;
  isAccepted: boolean;
  deletedAt: string | null;
  replies?: CommentType[];
  username: string;
  avatarUrl: string;
  reputation: number;
}

interface SingleCommentProps {
  comment: CommentType;
  allComments: CommentType[];
  depth: number;
}

const SingleComment: React.FC<SingleCommentProps> = ({ comment, allComments, depth }) => {

  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const replies = allComments.filter(c => c.parentId === comment.id);
  //console.log("Replies: ", replies);
  const { postComment } = useFetcher();

  const handleReply = async () => {
    setShowReplyPopup(false);
    await postComment(`postComment/${comment.postId}`, replyContent, comment.id);
    setReplyContent('');
  };

  return (
    <div style={{ paddingLeft: `${depth * 20}px` }} className="dark:bg-secondary dark:text-[#d8dce0] bg-white w-full py-3 px-4 shadow border rounded-md border-yellow-500 m-4">
      <div className="flex gap-2 items-center py-2">
        <Link href={`/${comment.username}`}>
          <Image
            className="rounded-full h-8 w-8 md:w-10 md:h-10"
            src={comment.avatarUrl || `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(comment.username)}&size=250`}
            alt="logo"
            width={40}
            height={400}
          />
        </Link>
        <div className="flex flex-col justify-center">
          <Link
            href={`/${comment.username}`}
            className="dark:text-primary hover:text-primary font-[500] text-xs hover:underline cursor-pointer"
          >
            <span className="dark:text-yellow-500">Author: </span>{comment.username}
          </Link>
          <p className="dark:text-primary text-sm">
            <span className="dark:text-yellow-500">Reputation: </span>{comment.reputation}
          </p>
          <p className="dark:text-primary text-sm">
            <span className="dark:text-yellow-500">Posted: </span>
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
      <p className="dark:text-primary text-sm">
        {comment.content}
      </p>
      <p>Comment ID: {comment.id}</p>
      <p>Post ID: {comment.postId}</p>
      <p>Parent ID: {comment.parentId}</p>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => setShowReplyPopup(true)}>Reply</button>
      {showReplyPopup && (
        <div>
          <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)} />
          <button onClick={handleReply}>Send</button>
          <button onClick={() => setShowReplyPopup(false)}>Cancel</button>
        </div>
      )}
      {replies.map(reply => (
        <SingleComment key={reply.id} comment={reply} allComments={allComments} depth={depth + 1} />
      ))}
    </div>
  );
};

export default function Comment({ comments }: { comments: CommentType[] }) {
  const topLevelComments = Array.isArray(comments) ? comments.filter(c => c.parentId === null) : [];
  //console.log("Top level comments: ", topLevelComments);
  return (
    <div>
      {topLevelComments.map(comment => (
        <SingleComment key={comment.id} comment={comment} allComments={comments} depth={0} />
      ))}
    </div>
  );
}
