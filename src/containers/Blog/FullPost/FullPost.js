import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
    }

    componentDidMount () {
        console.log(this.props);
        this.loadedData();
    }

    componentDidUpdate () {
        this.loadedData();
    } 
    //handle changes after mounting, router will not unmount for you, it will reuse the old one and adjust the route parameter

    loadedData () {
        //for the 1st it is because of null, for the 2nd because true and with diff id
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || 
                (this.state.loadedPost && this.state.loadedPost.id !==
                +this.props.match.params.id)
            ) {
            axios
                .get("/posts/" + this.props.match.params.id)
                .then(response => {
                this.setState({ loadedPost: response.data }); //infinite loop
                //Hence, to send Http request if only we loaded a new post
                //then when do we make new http request? only when the id of the post is different
                // console.log(response)
                });
            }
        }
    }

    deletePostHandler =() => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response=> {
                console.log(response)
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.match.params.id){
            <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                        onClick={this.deletePostHandler}
                        className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;