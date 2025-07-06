// @ts-nocheck
import React from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies'
import PostInline from './PostInline';
import PostCreate from './PostCreate';

class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.togglePostListClass = this.togglePostListClass.bind(this)
  }
  state = {
    posts: [],
    postsListClass: "card"
  }
  loadPosts() {
    let thisComp = this
    const endpoint = "/api/posts/"
    let lookupOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response) {
        return response.json()
      }).then(function (responseData) {
        console.log(responseData)
        thisComp.setState({
          posts: responseData
        })
      }).catch(function (error) {
        console.log("error", error)
      })
  }


  togglePostListClass(event) {
    event.preventDefault()
    let currentLIstClass = this.state.postsListClass
    if (currentLIstClass === "") {
      this.setState({
        postsListClass: "card"
      })
    } else {
      this.setState({
        postsListClass: ""
      })
    }
  }

  componentDidMount() {
    this.setState({
      posts: [],
      postsListClass: "card"
    })
    this.loadPosts()
  }
  render() {
    const { posts } = this.state
    const { postsListClass } = this.state
    const csrfToken = cookie.load("csrftoken")
    return (
      <div>
        <h1>Hello world</h1>
        <button onClick={this.togglePostListClass}>Toggle class</button>
        {posts.length > 0 ? posts.map((postItem, index) => {
          return (
            <PostInline key={index} post={postItem} elClass={postsListClass} />
          )
        }) : <p>No posts found</p>}
        {(csrfToken !== undefined && csrfToken !== null) ?
          <div className='my-5'>
            <PostCreate />
          </div>
          : ""
        }

      </div>
    );
  }
}

export default Posts;
