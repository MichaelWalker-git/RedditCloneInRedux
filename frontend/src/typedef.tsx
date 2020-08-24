// const Comment = readable.Comment
//
// /**
//  * @typedef {{
//  * parentId: string,
//  * timestamp: number,
//  * body: string,
//  * author: string,
//  * voteScore: number,
//  * deleted: boolean,
//  * parentDeleted: boolean,
//  * }}
//  */
// export default readable.Comment;


export interface PostDetails {
	id: number;
	parentId: string;
	timestamp: number;
	body: string;
	author: string;
	voteScore: number;
	deleted: boolean;
	parentDeleted: boolean;
}
