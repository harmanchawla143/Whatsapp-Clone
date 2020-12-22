import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import './Chat.css'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';

function Chat() {
    const[{user},dispatch] = useStateValue();
    const[seed,setseed] = useState('');
    const [input,setinput] = useState('');
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setmessages] = useState([]);

    useEffect(() => {
      if(roomId){
          db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
              setRoomName(snapshot.data().name)
          ))
          db.collection('rooms').doc(roomId)
          .collection('messages')
          .orderBy('timestamp','asc')
          .onSnapshot((snapshot) => 
          setmessages(snapshot.docs.map((doc) =>
          doc.data())))
      }
    },[roomId])



    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000));
    },[]);
    const sendMessage = (e) => {
         e.preventDefault();
         if(input === ""){
         }else{
         db.collection('rooms').doc(roomId).collection('messages').add({
             message: input,
             name: user.displayName,
             timestamp: firebase.firestore.FieldValue.serverTimestamp()

         })
         setinput('');
        }
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleTimeString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
            {messages.map(message => (
                <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                <span className="chat__name">{message.name}</span>{message.message}<span className="chat__timestamp">
                 {new Date(message.timestamp?.toDate()).toLocaleString()}
                </span></p>
            ))}
                
            </div>
            <div className="chat__footer">
            <IconButton>
               <InsertEmoticonIcon/>
               </IconButton>
               <form>
                   <input type="text" placeholder="Type a message" value={input} onChange={e => setinput(e.target.value)}/>
                   <button type="submit" onClick={sendMessage}>Ssshhh</button>
               </form>
               <IconButton>
               <MicIcon/>
               </IconButton>
            </div>
        </div>
    )
}

export default Chat
