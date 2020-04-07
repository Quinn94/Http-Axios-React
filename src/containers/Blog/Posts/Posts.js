import React , {Component} from 'react';
import axios from 'axios';

import './Posts.css';
import Post from '../../../components/Post/Post';



class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post, //distribute the property that we got from posts
            author: "Quinn" //then add a new property hard-code
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log(response)
      })
      .catch(error => {
        // this.setState({ error: true });
        console.log(error);
      });
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}> Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            title={post.title}
            key={post.id}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }

    return (
        <section className="Posts">
            {posts}
        </section>
    )
  }
}

export default Posts;


