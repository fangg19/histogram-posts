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

const convertDate = (date) => {
  return new Date(parseInt(date)).toLocaleString();
};

const Posts = () => {
  const { loading, error, data } = useQuery(ALL_POSTS);

  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Something went wrong. Try again please.</p>;

  const date = data.allPosts.createdAt;
  const formatedDate = new Date(date);
  console.log(date);

  return (
    <div className={classes.Posts}>
      {data.allPosts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          date={convertDate(post.createdAt)}
        />
      ))}
    </div>
  );
};

export default Posts;
