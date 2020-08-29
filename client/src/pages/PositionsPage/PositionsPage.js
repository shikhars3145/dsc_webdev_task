import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Container, Grid, InputBase } from '@material-ui/core';
import Card from '../../components/CustomCard/CustomCard';

import SearchIcon from '@material-ui/icons/Search';
import { UserContext } from '../../contexts';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  page: {
    marginTop: '3rem',
  },
  searchbox: {
    width: '60%',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid grey',
    color: 'grey',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '60%',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      width: '40%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

export default function PositionsPage() {
  const classes = useStyles();

  const [search, setsearch] = useState('');
  const { user, setUser } = useContext(UserContext);
  const [posts, setposts] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await axios.get('http://localhost:3000/api/posts/');
      console.log(res);
      const postsArr = res.data.data.posts;
      if (!user) setposts(postsArr);
      else {
        console.log('user found');
        const postsDisabled = postsArr.map((post) => {
          if (
            user.applications.some(
              (application) => application.post === post._id
            )
          )
            post.disabled = true;
          return post;
        });
        setposts(postsDisabled);
      }
    }
    load();
  }, [user]);

  const filteredPosts = posts.filter((post) => {
    return (
      post.position.toLowerCase().includes(search.toLowerCase()) ||
      post.technologies.some((tech) =>
        tech.toLowerCase().includes(search.toLowerCase())
      ) ||
      post.team.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <Container fixed>
      <Grid container className={classes.page} spacing={3}>
        <Grid container justify="center" item xs={12}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search position, tech or team"
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Grid>
        {filteredPosts.map((post) => {
          return (
            <Grid key={post._id} item xs={12} sm={6} md={4}>
              <Card
                postId={post._id}
                position={post.position}
                team={post.team}
                desc={post.description}
                techs={post.technologies}
                img={post.image}
                disabled={post.disabled}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
