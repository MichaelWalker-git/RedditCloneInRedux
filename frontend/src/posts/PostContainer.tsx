import React from 'react';
import * as PostAction from "./PostAction";
import {connect} from "react-redux";
import Post from "./Post";
import {PostDetails} from "../typedef";

function PostContainer (
	{voteForPostId, deleteSinglePost, selectedCategory, comeHome, posts, sortOrder} :
		{
			voteForPostId: any,
			deleteSinglePost: any,
			selectedCategory: any,
			comeHome: any,
			posts: Array<PostDetails>,
			sortOrder: string
		}
	){
	/**
	 * Votes the post's vote score.
	 * @param {{id: number}} postDetails
	 * @param {string} voteDirection
	 */
	const voteForPost = (postDetails: PostDetails, voteDirection: string) => {
		voteForPostId(postDetails, voteDirection, selectedCategory);
	};

	/**
	 * Sets the property (Deleted) on the post to true. Then, re-routes to home page.
	 */
	const deletePost = (postDetails: PostDetails) => {
		deleteSinglePost(postDetails, selectedCategory);
		comeHome();
	};

	return (
		<div>
			{posts.length === 0 && <div><p>Loading</p></div>}
			{posts.length > 0 && posts
				// @ts-ignore
				.sort((a, b) => b[sortOrder] - a[sortOrder])
				.map((item) => item.deleted ?
					"" :
					<Post key={item.id}
								deletePost={deletePost}
								post={item}
								votePostWithId={voteForPost}/>)
			}
		</div>
	)
}

function mapStateToProps(state: any) {
	return {
		sortOrder: state.postSortReducer.sortOrder,
		selectedCategory: state.selectedCategory
	};
}

export default connect(
	mapStateToProps, PostAction
)(PostContainer);
