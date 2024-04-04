import React, { useState } from 'react';

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

      const response = await fetch('https://api-co-chat.onrender.com/api/chat',options);
      const data = await response.text();
      console.log(data);
      setchatHistory(oldChatHistory => [...oldChatHistory, { role: "user", parts: [{ text: value }] }, { role: "model", parts: [{ text: data }] }]);
    setValue("");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
const clear = () => {
  setValue("");
  setError("");
  setchatHistory([]);
};

const handleInsertCommand =  (command) => {
  if (tsvscode) {
    tsvscode.postMessage({
      type: 'insertCommand',
      text: command,
    });
  } else {
    console.log('VSCode API not available');
  }
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
  {chatHistory.map((chatItem, index) => (
    <div key={index}>
      <p className='shadow-lg bg-gray-200 text-xl'>
        {chatItem.role} : {chatItem.parts[0].text}
        {chatItem.role === 'model' && (
                <button
                  onClick={() => handleInsertCommand(chatItem.parts[0].text)}
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded-md"
                >
                  Insert Command
                </button>
              )}
      </p>
    </div>
  ))}
</div>
      </div>
  );
};

export default App;