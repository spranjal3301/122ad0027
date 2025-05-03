"use client"

import { useState, useEffect } from "react"
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
} from "@mui/material"
import { fetchTopUsers, type User, getRandomImageUrl } from "@/lib/socialApi"

export default function TopUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getTopUsers = async () => {
      setLoading(true)
      try {
        const topUsers = await fetchTopUsers(5)
        setUsers(topUsers)
      } catch (error) {
        console.error("Failed to fetch top users:", error)
      } finally {
        setLoading(false)
      }
    }

    getTopUsers()
  }, [])

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Top Users
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(5)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Skeleton variant="circular" width={60} height={60} />
                    <Box sx={{ ml: 2, width: "100%" }}>
                      <Skeleton variant="text" width="40%" height={30} />
                      <Skeleton variant="text" width="60%" height={20} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {users.map((user, index) => (
              <Grid item xs={12} md={6} lg={4} key={user.id}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        src={getRandomImageUrl(Number.parseInt(user.id), "user")}
                        sx={{ width: 60, height: 60 }}
                      />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" component="div">
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Rank #{index + 1}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h6" component="div">
                          {user.commentCount || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Comments
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h6" component="div">
                          {user.postCount || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Posts
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell align="right">Posts</TableCell>
                  <TableCell align="right">Total Comments</TableCell>
                  <TableCell align="right">Avg. Comments/Post</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={getRandomImageUrl(Number.parseInt(user.id), "user")}
                          sx={{ width: 30, height: 30, mr: 1 }}
                        />
                        {user.name}
                      </Box>
                    </TableCell>
                    <TableCell align="right">{user.postCount || 0}</TableCell>
                    <TableCell align="right">{user.commentCount || 0}</TableCell>
                    <TableCell align="right">
                      {user.postCount && user.commentCount ? (user.commentCount / user.postCount).toFixed(1) : "0"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  )
}
