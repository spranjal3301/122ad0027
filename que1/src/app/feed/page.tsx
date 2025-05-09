"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Avatar,
  Button,
  Skeleton,
  Divider,
  IconButton,
  Collapse,
  TextField,
  Paper,
} from "@mui/material"
import {
  Comment as CommentIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material"
import { fetchAllPostsWithComments, fetchPostComments, type Post, type Comment } from "@/lib/socialApi"


//- Show a real-time feed of posts, newest at the top.
export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedPost, setExpandedPost] = useState<number | null>(null)
  const [comments, setComments] = useState<{ [postId: number]: Comment[] }>({})
  const [loadingComments, setLoadingComments] = useState<{ [postId: number]: boolean }>({})




  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const allPosts = await fetchAllPostsWithComments()
       // Sort by newest first (assuming higher IDs are newer posts)
      const sortedPosts = [...allPosts].sort((a, b) => b.id - a.id)
      setPosts(sortedPosts)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }, [])



  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleRefresh = () => {
    fetchPosts()
  }

  const handleExpandComments = async (postId: number) => {
    if (expandedPost === postId) {
      setExpandedPost(null)
      return
    }

    setExpandedPost(postId)

    if (!comments[postId]) {
      setLoadingComments((prev) => ({ ...prev, [postId]: true }))
      try {
        const postComments = await fetchPostComments(postId)
        setComments((prev) => ({ ...prev, [postId]: postComments }))
      } catch (error) {
        console.error(`Failed to fetch comments for post ${postId}:`, error)
      } finally {
        setLoadingComments((prev) => ({ ...prev, [postId]: false }))
      }
    }
  }

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Feed
        </Typography>
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={handleRefresh} disabled={loading}>
          Refresh
        </Button>
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            //@ts-ignore
            <Grid item xs={12} key={index}>
              <Card>
                <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box sx={{ ml: 2, width: "60%" }}>
                    <Skeleton variant="text" height={24} />
                  </Box>
                </Box>
                <Skeleton variant="rectangular" height={300} />
                <CardContent>
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} width="80%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : posts.length === 0 ? (
        <Typography variant="body1">No posts found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            //@ts-ignore
            <Grid item xs={12} key={post.id}>
              <Card>
                <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={`https://picsum.photos/seed/${post.userid}/100/100`}
                    alt={post.userName || `User ${post.userid}`}
                  />
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    {post.userName || `User ${post.userid}`}
                  </Typography>
                </Box>
                <CardMedia component="img" height="300" image={post.imageUrl} alt={`Post ${post.id}`} />
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    {post.content}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CommentIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {post.commentCount} comments
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => handleExpandComments(post.id)}
                      aria-expanded={expandedPost === post.id}
                      aria-label="show comments"
                    >
                      {expandedPost === post.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>

                  <Collapse in={expandedPost === post.id} timeout="auto" unmountOnExit>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Comments
                      </Typography>

                      {loadingComments[post.id] ? (
                        [...Array(3)].map((_, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <Skeleton variant="circular" width={32} height={32} />
                              <Box sx={{ ml: 1, width: "40%" }}>
                                <Skeleton variant="text" height={20} />
                              </Box>
                            </Box>
                            <Skeleton variant="text" height={16} />
                            <Skeleton variant="text" height={16} width="80%" />
                          </Box>
                        ))
                      ) : comments[post.id]?.length ? (
                        comments[post.id].map((comment) => (
                          <Paper key={comment.id} sx={{ p: 2, mb: 2, bgcolor: "background.default" }}>
                            <Typography variant="body2">{comment.content}</Typography>
                          </Paper>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No comments yet.
                        </Typography>
                      )}

                      <TextField
                        fullWidth
                        placeholder="Add a comment..."
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2 }}
                      />
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}
