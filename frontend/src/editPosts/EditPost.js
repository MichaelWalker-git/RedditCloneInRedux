import React, {Component} from 'react';
import {Button, FormControl, Input, InputLabel, MenuItem, Select} from "material-ui";

class EditPost extends Component {
	state = {
		title: '',
		commentScore: 0,
		voteScore: 0,
		body: '',
		id: '',
		timestamp: '',
		author: '',
		deleted: false,
		category: 'react',
		authorDisabled: false,
	};

	componentWillMount(){
		if(this.props.action === "Edit"){
			const {body, title, author, category, id, timestamp} = this.props.singlePostDetails.singlePost;
			this.setState({body, title, author, category, id, timestamp, authorDisabled: true});
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.id]: e.target.value});
	};


	submitForm = () => {
		this.props.submitChanges(this.state);
	};

	render(){
		const {categories} = this.props;
		return (
			<div>
				<div>
					<h2>{this.props.action} Post</h2>
					<FormControl className='formControl'>
						<InputLabel htmlFor="title-helper">Title</InputLabel>
						<Input id="title"
									 value={this.state.title}
									 onChange={this.handleChange} />
					</FormControl>
				</div>
				<div>
					<FormControl className='formControl'>
						<InputLabel htmlFor="body-helper">Body</InputLabel>
						<Input id="body"
									 value={this.state.body}
									 onChange={this.handleChange} />
					</FormControl>
				</div>
				<div>
					<FormControl className='formControl'>
						<InputLabel htmlFor="author-helper">Author</InputLabel>
						<Input id="author"
									 value={this.state.author}
									 disabled = {(this.state.authorDisabled)? "disabled" : ""}
									 onChange={this.handleChange} />
					</FormControl>
				</div>
				<div>
					<FormControl className='formControl'>
						<InputLabel htmlFor="category-helper">Category</InputLabel>
						<Select
							id='category'
							value={this.state.category}
							onChange={this.handleChange}
							input={<Input name="category" id="category-helper" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{categories && categories.map((item, i) => (
									<MenuItem key={i} value={item.name}> {item.name} </MenuItem>
								)
							)}
						</Select>
					</FormControl>
					<br/>
				</div>
				<div>
					<Button raised color="primary" onClick={this.submitForm}>
						{this.props.action}
					</Button>
				</div>
			</div>
		);
	}
}

export default EditPost;
