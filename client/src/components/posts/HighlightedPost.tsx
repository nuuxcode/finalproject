import React from "react";
import Post from "~/components/posts/post";
import Highlighter from "react-highlight-words";

function HighlightedPost({ post, query }: { post: any, query: string }) {
  const highlightedPost = {
    ...post,
    title: <Highlighter
      highlightClassName="YourHighlightClass"
      searchWords={[query]}
      autoEscape={true}
      textToHighlight={post.title}
    />,
    content: <Highlighter
      highlightClassName="YourHighlightClass"
      searchWords={[query]}
      autoEscape={true}
      textToHighlight={post.content}
    />
  };

  return <Post post={highlightedPost} />;
};

export default HighlightedPost;
