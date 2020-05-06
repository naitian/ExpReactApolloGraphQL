import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";
import React from "react";
import HtmlToReactParser from "html-to-react";

const GET_POST_QUERY = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      headline
      updated
      content
      author {
        username
        email
      }
    }
  }
`;

const parser = new HtmlToReactParser.Parser();

const PostPage = (props) => {
  const { loading, error, data } = useQuery(GET_POST_QUERY, {
    variables: { id: props.match.params.post_id },
  });
  if (loading) return "Loading";
  if (error) return `Error :( ${error}`;
  const post = data.post;
  return (
    <div>
      <h1>{post.headline}</h1>
      <b>
        by {post.author.username} ({post.author.email}) on{" "}
        {new Date(post.updated).toLocaleDateString()}
      </b>
      <article>{parser.parse(post.content)}</article>
    </div>
  );
};

PostPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      post_id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default PostPage;
