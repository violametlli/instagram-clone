import React, { useEffect, useState } from "react";
import './App.css';
import Post from './Post';
import { storage, db, auth } from "./firebase";
import { Button,Input, makeStyles } from "@material-ui/core";
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
  const [user, setUser] = useState(null);


  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
       //user has logged in
     if(authUser){
      console.log(authUser);
      setUser(authUser);

    if (authUser.displayName){

    }
    else{
      //if we create a user
      return authUser.updateProfile({
        displayName:username,
      });
    }
     }
     
     
     else{
//user has logged out
    setUser(null);
     }


    })
  }, [user, username])


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
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))

  }
  



  return (
    //use state = short term memory store like an array
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}  >

        < div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
            <center>
            <img className="app__headerImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU" />
            </center>
            
            <Input
              placeholder="username"
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}/>
            
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
           
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            

            <Button onClick={signUp}> Login </Button>
          
         
          </form>
        </  div>
      </Modal>
      <div className="app__header">
        <img className="app__headerImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU" />
      </div>

      <Button type="submit" onClick={() => setOpen(true)}> Sign Up </Button>

      {
        posts.map(({ id, post }) => (
          <Post key={id} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div>
  );
}

export default App;
