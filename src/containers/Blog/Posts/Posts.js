import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { Route } from "react-router-dom";

import "./Posts.css";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(props);
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          let author;
          return [
            ...post,
            //distribute the property that we got from posts
            // (author: "Quinn"),
            //then add a new property hard-code
          ];
        });
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  // componentDidMount() {
  //   console.log(this.props);
  //   axios.get("/posts")
  //     .then(response => {
  //       const posts = response.data.slice(0, 4);
  //       const updatedPosts = posts.map(post => {
  //         return {
  //           ...post,
  //           //distribute the property that we got from posts
  //           author: "Quinn"
  //           //then add a new property hard-code
  //         };
  //       });
  //       this.setState({ posts: updatedPosts });
  //       // console.log(response)
  //     })
  //     .catch(error => {
  //       // this.setState({ error: true });
  //       console.log(error);
  //     });
  // }

  const postSelectedHandler = (id) => {
    // this.props.history.push({pathname: '/posts/' + id});
    props.history.push("/posts/" + id);
  };

  let post = <p style={{ textAlign: "center" }}>Something went wrong!</p>;

  if (!error) {
    post = posts.map((post) => {
      return (
        // <Link to={"/posts/" + post.id} key={post.id}>
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
        // </Link>
      );
    });
  }

  return (
    <div>
      <section className="Posts">{posts}</section>
      <Route path={props.match.url + "/:id"} exact component={FullPost} />
    </div>
  );
};

export default Posts;
