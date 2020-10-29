import React from 'react';
import Post from './Post';
import classes from './Posts.module.css';

import { useQuery, gql } from '@apollo/client';

const ALL_POSTS = gql`
  {
    allPosts(count: 5) {
      id
      title
      createdAt
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery(ALL_POSTS);

  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Something went wrong. Try again please.</p>;

  return (
    <div className={classes.Posts}>
      {data.allPosts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          date={new Date(post.createdAt)}
        />
      ))}
    </div>
  );
};

export default Posts;
