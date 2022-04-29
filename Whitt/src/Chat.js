import { useEffect, useState } from 'react';
import App from './components/App.js';
import Chatbox from './components/Chatbox.js';
import Titlebar from './components/Titlebar.js';
import Userlist from './components/Userlist.js';
import Inputbox from './components/Inputbox.js';
import './Chat.css';
import { useChatStateContext } from './context/FirebaseChatContextProvider';
import { useAuthStateContext } from './context/FirebaseAuthContextProvider';

function Chat() {
  const { sendMsg, listenToChatroom, imageDict, userDict } = useChatStateContext();
  const { authState } = useAuthStateContext();

  const [chatData, setChatData] = useState([]);


  function onMsg(msg) {
    setChatData(oldChat => [msg, ...oldChat]);
  }

  function transformChatData(item) {
    let displayName = "Unknown(Offline)";
    if (item.user in userDict && userDict[item.user].displayName){
      displayName = userDict[item.user].displayName;
    } else if (item.user === authState.user.uid) {
      displayName = authState.user.displayName;
    }
    
    return ({
      ...item,
      key: item.timestamp || Date.now(),
      displayName: displayName,
      image: imageDict[item.user] || "",
      position: item.user === authState.user.uid ? "right" : "left"
    });
  }

  useEffect(() => {
    const unsubscribeChatroom = listenToChatroom('mainhall', onMsg);

    return () => {
      unsubscribeChatroom();
    }
  }, []);


  return (
    <App>
      
      <div className="chat">
        <Titlebar value="Chat"/>        
        <Chatbox data={chatData.map(transformChatData).sort((a,b)=>a.timestamp - b.timestamp)}/>
        <Inputbox onEnter={x=>sendMsg(x,"mainhall")}/>
      </div>
    </App>
  );
}

export default Chat;




{/*function Chat() {
  const [chatData, setChatData] = useState([]);

  const [user, setUser] = useState("Me") 
  const [position, setPosition] = useState("right")
const send = (msg) => {
  chatData.push({user: user, msg: msg, position: position})
  user === "Me"? setUser("Larppawat"): setUser("Me")
  position === "right"? setPosition("left"): setPosition("right")
setChatData([...chatData])
}
  return (
    <App>
      <div className="chat">
        <Userlist/>
        <Chatbox data={chatData}/>
        <Inputbox onClick = {send}/>
      </div>
    </App>
  );
}

export default Chat;*/}