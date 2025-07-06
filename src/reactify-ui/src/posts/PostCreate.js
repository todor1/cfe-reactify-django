// @ts-nocheck
import React, { Component } from 'react';
import cookie from 'react-cookies'
import 'whatwg-fetch'

class PostCreate extends Component {
    constructor(props) {
        super(props)
        //this -> referring to the current component and not to other possible objects
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

        // Initialize state
        this.state = {
            draft: false,
            title: null,
            content: null,
            publish: null,
            errors: {}
        }
    }

    createPost(data) {
        const endpoint = "/api/posts/"
        const csrfToken = cookie.load("csrftoken")
        // let thisComp = this
        if (csrfToken !== undefined) {
            let lookupOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken
                },
                body: JSON.stringify(data),
                credentials: "include"
            }

            fetch(endpoint, lookupOptions)
                .then(function (response) {
                    return response.json()
                }).then(function (responseData) {
                    console.log(responseData)
                }).catch(function (error) {
                    console.log("error", error)
                    alert("An error occurred. Please try again later.")
                })
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        // console.log("this state", this.state)
        let data = this.state
        // if (data['draft'] === "on") {
        //     data['draft'] = true
        // } else {
        //     data['draft'] = false
        // }
        // console.log("data from state", data)
        this.createPost(data)
    }
    handleInputChange(event) {
        const target = event.target
        // preventDefault (as per tutorial) causing double click problem to the checkbox
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        if (name === 'title') {
            if (value.length > 100) {
                alert("This title is too long. More than 100 chars.")
            }
        }

        console.log(name, value)
        this.setState({
            [name]: value
        })
    }
    componentDidMount() {
        this.setState({
            draft: false,
            title: null,
            content: null,
            publish: null,
            errors: {}
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="title">Post title</label>
                    <input type='text' id='title' name='title' className='form-control' placeholder='Blog post title' value={this.state.title} onChange={this.handleInputChange} required='required' />
                </div>
                <div className='form-group'>
                    <label htmlFor="content">Content</label>
                    <textarea name="content" id="content" className='form-control' placeholder='Post content' value={this.state.content} onChange={this.handleInputChange} required='required' />
                </div>
                <div className='form-group'>
                    <label htmlFor="draft">
                        <input type='checkbox' id='draft' name='draft' className='mr-2' checked={this.state.draft} onChange={this.handleInputChange} />
                        Draft
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor="publish">Publish date</label>
                    <input type='date' id='publish' name='publish' className='form-control' value={this.state.publish} onChange={this.handleInputChange} required='required' />
                </div>
                <button className='btn btn-primary'>Save</button>
            </form>
        );
    }
}

export default PostCreate;
