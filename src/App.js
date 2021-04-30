import React, { useEffect, useState } from "react";
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([

    {
      username: "viola ",
      caption: " lets try",
      imageUrl: "http://www.indiapalette.com/wp-content/uploads/2018/05/download-4.jpg"
    },

    {
      username: "viola ",
      caption: " hard",
      imageUrl: "https://glimpsinggrace.files.wordpress.com/2012/12/the-caged-bird-sings-2.jpg"
    }

  ]);

  return (
    //use state = short term memory store like an array
    <div className="App">
      <div className="app__header">
        <img className="app__headerImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFj87v7cdZAMuQzMol5zsNpdwU87kaGE270YOjLf8vIklU9dfvQnZ_yKE5AiLvgttPA&usqp=CAU" />
      </div>
      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div>
  );
}

export default App;
