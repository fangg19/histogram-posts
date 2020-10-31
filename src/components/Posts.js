import React from 'react';
import Post from './Post';
import classes from './Posts.module.css';
import Histogram from './Histogram';

import { useQuery, gql } from '@apollo/client';

const ALL_POSTS = gql`
  {
    allPosts(count: 12) {
      id
      title
      createdAt
    }
  }
`;

//had to call toLocaleString() on the date prop so I can use the convertDate into getMonthFromDate
const convertDate = (date) => {
  return new Date(parseInt(date));
};

let months = [];

const Posts = (props) => {
  const { loading, error, data } = useQuery(ALL_POSTS);

  if (loading) return <p>Wait for it...</p>;
  if (error) return <p>Something went wrong. Try again please.</p>;

  // getting the months out from the date to count them and then display them (maybe?)
  const getMonthFromDate = () => {
    data.allPosts.map((post) => {
      let month = convertDate(post.createdAt).getMonth() + 1;
      months.push(month);
    });
  };
  getMonthFromDate();
  console.log(months);

  //Getting an object where the key is the month and the value is the frequency it repeats itself in the months array
  let monthsFreq = months.reduce((acc, curr) => {
    if (typeof acc[curr] === 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }

    return acc;
  }, {});

  console.log(monthsFreq);

  return (
    <div className={classes.Posts}>
      <button>Show Histogram</button>
      <Histogram data={months} />
      {data.allPosts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          date={convertDate(post.createdAt).toLocaleString()}
        />
      ))}
    </div>
  );
};

export default Posts;
