import axiosClient from "./axiosClient"



export interface User {
  id: string
  name: string
  commentCount?: number
  postCount?: number
}

export interface Post {
  id: number
  userid: number
  content: string
  commentCount?: number
  userName?: string
  imageUrl?: string
}

export interface Comment {
  id: number
  postid: number
  content: string
}


export const getRandomImageUrl = (seed: number, type: "user" | "post") => {
  const width = type === "user" ? 100 : 600
  const height = type === "user" ? 100 : 400
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}


export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await axiosClient.get('/users');
    const data = res.data;

    const users: User[] = Object.entries(data.users || data).map(([id, name]) => ({
      id,
      name: name as string,
    }))

    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}


export const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const response = await axiosClient.get(`/users/${userId}/posts`)
    
    const data = response.data;

    return (data.posts || []).map((post: Post) => ({
      ...post,
      imageUrl: getRandomImageUrl(post.id, "post"),
    }))
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error)
    return []
  }
}


export const fetchPostComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response =  await axiosClient.get(`/posts/${postId}/comments`)
    const data = response.data;

    return data.comments || []
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error)
    return []
  }
}


export const fetchAllPostsWithComments = async (): Promise<Post[]> => {
  try {

    const users = await fetchUsers()

    const postsPromises = users.map(async (user) => {
      const userPosts = await fetchUserPosts(user.id)


      return userPosts.map((post) => ({
        ...post,
        userName: user.name,
      }))
    })

    const userPostsArrays = await Promise.all(postsPromises)
    const allPosts = userPostsArrays.flat()

    const postsWithCommentsPromises = allPosts.map(async (post) => {
      const comments = await fetchPostComments(post.id)
      return {
        ...post,
        commentCount: comments.length,
      }
    })

    return await Promise.all(postsWithCommentsPromises)
  } catch (error) {
    console.error("Error fetching all posts with comments:", error)
    return []
  }
}


export const fetchTopUsers = async (limit = 5): Promise<User[]> => {
  try {
 
    const users = await fetchUsers()

  
    const usersWithCommentCountsPromises = users.map(async (user) => {
      const posts = await fetchUserPosts(user.id)

      const postCommentCountsPromises = posts.map(async (post) => {
        const comments = await fetchPostComments(post.id)
        return comments.length
      })

      const postCommentCounts = await Promise.all(postCommentCountsPromises)
      const totalComments = postCommentCounts.reduce((sum, count) => sum + count, 0)

      return {
        ...user,
        commentCount: totalComments,
        postCount: posts.length,
      }
    })

    const usersWithCommentCounts = await Promise.all(usersWithCommentCountsPromises)

    return usersWithCommentCounts.sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0)).slice(0, limit)
  } catch (error) {
    console.error("Error fetching top users:", error)
    return []
  }
}


export const fetchTrendingPosts = async (): Promise<Post[]> => {
  try {
    const allPosts = await fetchAllPostsWithComments()

    const sortedPosts = [...allPosts].sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0))


    if (sortedPosts.length > 0) {
      const maxCommentCount = sortedPosts[0].commentCount || 0

      return sortedPosts.filter((post) => post.commentCount === maxCommentCount)
    }

    return []
  } catch (error) {
    console.error("Error fetching trending posts:", error)
    return []
  }
}


{
  async function load() {
    let data;
    fetch('/api/data').then(res => res.json()).then(json => {
      data = json;
    });
  
    console.log(data); // logs undefined
  }
}