// @ts-nocheck
import React, { Component } from 'react';

class PostCreate extends Component {
    constructor(props) {
        super(props)
        //this -> referring to the current component and not to other possible objects
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

        // Initialize state
        this.state = {
            title: '',
            content: '',
            draft: false,
            publish: ''
        }
    }
    handleSubmit(event) {
        event.preventDefault()
        console.log("this state", this.state)
        let data = this.state
        // if (data['draft'] === "on") {
        //     data['draft'] = true
        // } else {
        //     data['draft'] = false
        // }
        console.log("data after draft check", data)
    }
    handleInputChange(event) {
        const target = event.target
        // preventDefault (as per tutorial) causing double click problem to the checkbox
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        if (name === 'title') {
            if (value.length > 15) {
                alert("This title is too long. More than 15 chars.")
            }
        }

        console.log(name, value)
        this.setState({
            [name]: value
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
