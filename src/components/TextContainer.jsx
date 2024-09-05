import React, { useState, useEffect, useRef } from 'react';


import sendbutton from "../assets/img/send-icon.png";
import oemIcon from "../assets/img/oemServicesIcon.png"
import userIcon from "../assets/img/userIcon.jpg"




const TextContainer = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef(null);

    
    useEffect(() => {
        const adjustTextareaHeight = () => {
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        };

        adjustTextareaHeight();
    }, [inputValue]);

    const sendMessage = async () => {
        if (inputValue.trim() !== "") {
            const newMessage = { sender: "You", text: inputValue.trim() };
            setMessages([...messages, newMessage]);
            setInputValue("");
            try {
                const response = await fetch('http://localhost:3000/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: inputValue.trim() })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const oemMessage = { sender: "OEM", text: data.message };
                setMessages([...messages, newMessage, oemMessage]);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }

          //  scrap();
        }
    };

    // const scrap = () => {
    //     chrome.tabs.getSelected(null, function(tab) {
    //         var url = tab.url;
    //         console.log(url);
    //     });
    // };

    return (
        <div className="flex-col h-screen pb-2">
            <div className="flex-1 overflow-auto">
                {messages.map((message, index) => (
                    <div key={index} className="flex items my-2">
                        <img
                            src={message.sender === "OEM" ? oemIcon : userIcon}
                            alt={message.sender === "OEM" ? 'Oem Icon' : 'User Icon'}
                            className="h-10 w-10 mr-2 rounded-lg"
                        />
                        <p className="bg-gray-700 p-2 rounded-lg text-white max-w-[450px] break-words overflow-hidden">
                            {message.text}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex items fixed bottom-2 left-10" >
                <textarea
                    ref={textareaRef}
                    className="w-[436px] h-[39px] rounded-[21px] bg-[#393939] border-2 px-3 py-1 text-white"
                    style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
                    placeholder="Enter text here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={sendMessage} className="rounded-[21px] object-contain h-11 w-11 ml-2 px-2 border-2">
                    <img src={sendbutton} alt="Envoyez" />
                </button>
            </div>
        </div>
    );
};

export default TextContainer;