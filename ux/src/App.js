import React,{useCallback,useMemo,useRef,useState} from 'react';
import './App.css';
import useWebSocket,{ReadyState} from "react-use-websocket";

function App() {
  const [socketURL, setSocketURL] = useState('ws://localhost:3000/timestamp')
  const messageHistory = useRef([]);
 
  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketURL);
 
  messageHistory.current = useMemo(() =>
    messageHistory.current.concat(lastMessage),[lastMessage]);
 
  const handleClickChangeSocketURL = useCallback(() =>
    setSocketURL('wss://demos.kaazing.com/echo'), [setSocketURL]);
 
  const handleClickSendMessage = useCallback(() =>
    sendMessage('Hello'), [sendMessage]);
 
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  function LastMessage({msg}) {
    if (msg && msg.data) {
      return <span>Last message: {msg.data}</span>
    } else {
      return <></>
    }
  }

  function MessageHistory({msgRef}) {
    if (msgRef && msgRef.current) {
      return msgRef.current.map((message, idx)=>{
        if (message && message.data) return <span key={idx}>{message.data}</span>
      })
    } else {
      return <></>
    }
  }
 
  return (
    <div>
      <button
        onClick={handleClickChangeSocketURL}
      >
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      <LastMessage msg={lastMessage} />
      <ul>
        <MessageHistory msgRef={messageHistory} />
      </ul>
    </div>
  );
}

export default App;