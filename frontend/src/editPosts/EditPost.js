import React, {useState, useEffect} from 'react';
import {Button, FormControl, Input, InputLabel, MenuItem, Select} from "@material-ui/core";

const defaultPost = {
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

function EditPost (props) {
	const [post, setPost] = useState(defaultPost);

	useEffect(() => {
		props.hideSortDropDown();
		if(props.action === "Edit"){
			const {body, title, author, category, id, timestamp} = props.singlePostDetails.singlePost;
			setPost({body, title, author, category, id, timestamp, authorDisabled: true});
		}
	});

	const handleChange = (e) => {
		const stateProperty = e.target.id ?  e.target.id : e.target.name;
		setPost({[stateProperty]: e.target.value});
	};


	const submitForm = () => {
		props.submitChanges(post);
	};

		const {categories} = props;
		return (
			<div>
				<div>
					<h2>{props.action} Post</h2>
					<FormControl fullWidth className='formControl'>
						<InputLabel htmlFor="title-helper">Title</InputLabel>
						<Input id="title"
									 value={posttitle}
									 onChange={handleChange} />
					</FormControl>
				</div>
				<div>
					<FormControl fullWidth className='formControl'>
						<InputLabel htmlFor="body-helper">Body</InputLabel>
						<Input id="body"
									 value={postbody}
									 onChange={handleChange} />
					</FormControl>
				</div>
				<div>
					<FormControl fullWidth className='formControl'>
						<InputLabel htmlFor="author-helper">Author</InputLabel>
						<Input id="author"
									 value={post.author}
									 disabled = {post.authorDisabled}
									 onChange={handleChange} />
					</FormControl>
				</div>
				<div className='categoryDropDown'>
					<FormControl fullWidth className='formControl'>
						<InputLabel htmlFor="category-helper">Category</InputLabel>
						<Select
							id='category'
							value={post.category}
							onChange={handleChange}
							required
							input={<Input name="category" id="category" />}
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
					<Button raised color="primary" onClick={submitForm}>
						{props.action}
					</Button>
				</div>
			</div>
		);
}

export default EditPost;
