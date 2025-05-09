"use client"

import { useState, useEffect } from "react"
import { Typography, Card, CardContent, CardMedia, Grid, Box, Avatar, Chip, Skeleton, Divider } from "@mui/material"
import { Comment as CommentIcon } from "@mui/icons-material"
import { fetchTrendingPosts, type Post } from "@/lib/socialApi"


//- Show the post(s) that have the maximum number of comments.
export default function TrendingPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getTrendingPosts = async () => {
      setLoading(true)
      try {
        const trendingPosts = await fetchTrendingPosts()
        setPosts(trendingPosts)
      } catch (error) {
        console.error("Failed to fetch trending posts:", error)
      } finally {
        setLoading(false)
      }
    }

    getTrendingPosts()
  }, [])

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Trending Posts
        </Typography>
        {!loading && posts.length > 0 && (
          <Chip label={`${posts[0].commentCount} comments`} color="primary" icon={<CommentIcon />} sx={{ ml: 2 }} />
        )}
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(3)].map((_, index) => (
            //@ts-ignore
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box sx={{ ml: 2, width: "60%" }}>
                      <Skeleton variant="text" height={24} />
                    </Box>
                  </Box>
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} width="80%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : posts.length === 0 ? (
        <Typography variant="body1">No trending posts found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            //@ts-ignore
            <Grid item xs={12} md={6} lg={4} key={post.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" height="200" image={post.imageUrl} alt={`Post ${post.id}`} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={`https://picsum.photos/seed/${post.userid}/100/100`}
                      alt={post.userName || `User ${post.userid}`}
                    />
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                      {post.userName || `User ${post.userid}`}
                    </Typography>
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    {post.content}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CommentIcon color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {post.commentCount} comments
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}
