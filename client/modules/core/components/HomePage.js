import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_POSTS = gql`
  query {
    posts {
      id
      headline
      content
      updated
      author {
        username
      }
    }
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(ALL_POSTS);
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error}</p>;
  return data.posts.map((post) => (
    <div key={post.id}>
      <Link to={`/posts/${post.id}`}>
        {post.headline} by {post.author.username} at {post.updated}
      </Link>
    </div>
  ));
};

export default HomePage;
