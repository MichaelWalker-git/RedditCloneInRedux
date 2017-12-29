import fetch from 'cross-fetch';

export const CREATE_POST = 'CREATE_POST';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const DELETE_POST = 'DELETE_POST';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST';
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';

function upVotePost(postId){
	console.error(postId,"!!");
	debugger;
	// return {
	// 	type: UPVOTE_POST,
	// 	postId,
	// }
}

function downVote(postId){
	return {
		type: DOWNVOTE_POST,
		postId
	}
}

export function createPost(postDetails){
	return {
		type: CREATE_POST,
		postDetails
	}
}

export function deletePost(postId){
	return {
		type: DELETE_POST,
		postId
	}
}

/**
 *
 * @param subreddit
 * @returns {{type: string, subreddit: *}}
 */
export function invalidateSubreddit(subreddit) {
	return {
		type: INVALIDATE_SUBREDDIT,
		subreddit
	}
}

/**
 *
 * @param subreddit
 * @returns {{type: string, subreddit: *}}
 */
function requestPosts(subreddit) {
	return {
		type: REQUEST_POSTS,
		subreddit
	}
}

/**
 *
 * @param subreddit
 * @param json
 * @returns {{type: string, category: *, posts: *, receivedAt: number}}
 */
function receivePosts(category, json) {
	return {
		type: RECEIVE_POSTS,
		category,
		posts: json,
		receivedAt: Date.now()
	}
}

function requestComments(postId){
	return {
		type: REQUEST_COMMENTS,
		postId
	}
}

function receiveComments(postId, json){
	return {
		type: RECEIVE_COMMENTS,
		postId,
		comments: json
	}
}

function requestSinglePost(postId){
	return {
		type: REQUEST_SINGLE_POST,
		postId
	}
}

function receiveSinglePost(postId, json){
	return {
		type: RECEIVE_SINGLE_POST,
		postId,
		singlePost: json,
	}
}

/**
 * Fetch posts for a specific category.
 * @param subreddit
 * @returns {function(*)}
 */
export function fetchPostsForCategory(category) {
	return dispatch => {
		dispatch(requestPosts(category));
		return fetch(`http://localhost:3001/${category}/posts`, {headers: { 'Authorization': 'whatever-you-want'}})
			.then(response => response.json())
			.then(json => dispatch(receivePosts(category, json)))
	}
}


export function upVoteForPostId(postId){
	return dispatch => {
		dispatch(upVotePost(postId));
		return fetch(`http://localhost:3001/posts/${postId}`, {
			headers: { 'Authorization': 'whatever-you-want'},
			method: 'post',
			body: JSON.stringify({"option": "upVote"})
		})
			.then(response => {
				console.error(response.json());
				return response.json();
			})
			.then(json => console.log("JSON", json))
	}
}

/**
 *
 * @param subreddit
 * @returns {function(*)}
 */
export function fetchAllPosts() {
	return dispatch => {
		dispatch(requestPosts());
		return fetch(`http://localhost:3001/posts`, {headers: { 'Authorization': 'whatever-you-want'}} )
			.then(response => response.json())
			.then(json => dispatch(receivePosts('all', json)))
	}
}

export function deletePostAction(postId){
	return dispatch => {
		dispatch(deletePost(postId));
		return fetch(`http://localhost:3001/posts/${postId}`, {headers: { 'Authorization': 'whatever-you-want'}} )
			.then(response => response.json())
			//TODO(michaelhuy): receivePosts of last category, so "selectedCategory"??
			.then(json => dispatch(receivePosts('all', json)))
	}
}

export function fetchSinglePost(postId){
	return dispatch => {
		dispatch(requestSinglePost(postId));
		return fetch(`http://localhost:3001/posts/${postId}`, {headers: { 'Authorization': 'whatever-you-want'}} )
			.then(response => response.json())
			.then(json => dispatch(receiveSinglePost(postId, json)))	}
}


function fetchComments(postId) {
	return dispatch => {
		dispatch(requestComments(postId));
		return fetch(`localhost:3001/posts/${postId}/comments`, {headers: { 'Authorization': 'whatever-you-want'}})
			.then(response => response.json())
			.then(json => dispatch(receiveComments(postId, json)))
	}
}

