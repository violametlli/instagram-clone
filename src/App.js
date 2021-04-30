import React, { useEffect, useState } from "react";
import './App.css';
import Post from './Post';
import { storage, db } from "./firebase";
import { Button, makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";




function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");





  useEffect(() => {
    // This is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
      // every time a new post is added, this code fires up
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);



  const signUp = (event) => {

  }



  return (
    //use state = short term memory store like an array
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}  >

        < div style={modalStyle} className={classes.paper}>

          <center>
            <img className="app__headerImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU" />

            {/* 
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleLogin}> Login </Button> */}

          </center>
        </  div>
      </Modal>
      <div className="app__header">
        <img className="app__headerImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU" />
      </div>

      <Button onClick={() => setOpen(true)}> Sign Up </Button>

      {
        posts.map(({ id, post }) => (
          <Post key={id} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div>
  );
}

export default App;
