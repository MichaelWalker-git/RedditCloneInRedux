import React, { Component } from 'react';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import UpVote from 'material-ui-icons/KeyboardArrowUp';
import DownVote from 'material-ui-icons/KeyboardArrowDown';

import Avatar from 'material-ui/Avatar';
import {downVoteForPostId, upVoteForPostId} from "./PostAction";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class PostContainer extends Component {

	/**
	 *
	 */
	upVotePost = () => {
		this.props.dispatch(upVoteForPostId(this.props.post));
	};

	/**
	 *
	 */
	downVotePost = () => {
		this.props.dispatch(downVoteForPostId(this.props.post));
	};

	/**
	 *
	 */
	editPost = () => {

	};

	/**
	 *
	 */
	deletePost = () => {
	};

	render() {
		const {voteScore, author, timestamp, title, body, commentCount, id } = this.props.post;
		return (
			<div>
				<Card className='card'>
					<div className='cardHeader'>
						<div className='voteArea'>
							<div className='arrow-up'>
								<UpVote onClick={this.upVotePost} className='voteCursor'/>
							</div>
							<div className='totalscore'>
								{voteScore}
							</div>
							<div className='arrow-down'>
								<DownVote onClick={this.downVotePost} className='voteCursor'/>
							</div>
						</div>
						<CardHeader
							avatar={
								<Avatar className='avatar' aria-label="Recipe">
									R
								</Avatar>
							}
							title={author}
							subheader={timestamp}
						/>
					</div>
					<CardContent>
						<Typography type="headline" component="h2">
							<Link to={`/category/${id}`} className='navigationLinks'>
							{title}
							</Link>
						</Typography>
						<Typography component="p">
							{body}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton aria-label="Add to favorites">
							<FavoriteIcon/>
						</IconButton>
						<Button dense color="primary">
							<Link to={`/category/${id}`} className='navigationLinks'>
							{commentCount} Comments
							</Link>
						</Button>
						<Button dense color="primary">
							<Link to={`/category/${id}/edit`} className='navigationLinks'>
							Edit
							</Link>
						</Button>
						<Button dense color="primary">
							Share
						</Button>
						<Button dense color="primary" onClick={this.deletePost}>
							Delete
						</Button>
					</CardActions>
				</Card>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {post: state.singlePostDetails.singlePost};
}

export default connect(
	mapStateToProps,
)(PostContainer);
