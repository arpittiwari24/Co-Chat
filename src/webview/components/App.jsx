import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setchatHistory] = useState([]);

  const getResponse = async (e ) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          "Content-Type" : "application/json"
        }
      };

      const response = await fetch('http://localhost:5000/api/chat',options);
      const data = await response.text();
      console.log(data);
      setchatHistory(oldChatHistory => [...oldChatHistory, {
        role: "user",
        parts: value
      },
    {
      role: "model",
      parts: data
    }
    ])
    setValue("")
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
const clear = () => {
  setValue("")
  setError("")
  setchatHistory([])
};
  return (
    <div className="h-screen p-3">
        <form action="">
          <input type="text" value={value} 
          onChange={(e) => setValue(e.target.value)}
          />
          {!error && <button onClick={getResponse}>Ask</button>}
          {error && <button onClick={clear}>Clear</button>}
        </form>
        {error && <p>{error}</p>}
        <div>
          {chatHistory.map((chatItem, _index) => 
          <div key={_index}>
            <p>{chatItem.role} : {chatItem.parts}</p>
          </div>)}
        </div>
      </div>
  );
};

export default App;