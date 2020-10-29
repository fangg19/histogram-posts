import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
  return (
    <div className={classes.Post}>
      <h1 className={classes.Title}>{props.title}</h1>
      <p>Created at: {props.date}</p>
    </div>
  );
};

export default Post;
