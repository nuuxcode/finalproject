import { useFetcher } from '~/hooks/fetcher';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface CommentInputProps {
    postId: string;
}
interface User {
    username: string;
    avatarUrl: string;
  }
const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
    const [content, setContent] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const { postComment, getMe } = useFetcher();

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getMe();
            setUser(userData);
        };

        fetchUser();
    }, [getMe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postComment(`postComment/${postId}`, content, null);
        setContent('');
    };

    return (
        <div className="flex gap-2 items-center py-2">
            {user && (
                <>
                    <Link href={`/${user.username}`}>
                        <Image
                            className="rounded-full h-8 w-8 md:w-10 md:h-10"
                            src={user.avatarUrl || `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&size=250`}
                            alt="logo"
                            width={40}
                            height={400}
                        />
                    </Link>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                        <textarea value={content} onChange={e => setContent(e.target.value)} className="dark:text-primary text-sm" />
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-2">Post Comment</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default CommentInput;
