import React,{useEffect} from 'react';
import socketIO from 'socket.io-client'
import './App.css';

const WS="http://localhost:3000"
function App() {
  useEffect(()=>{
    socketIO(WS)
  },[])
  return (
    <div className="App">
    <button> conect to room</button>
    </div>
  );
}

export default App;
