import React from 'react';


const TextContainer = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ flex: 1 }}>
            </div>
            <textarea
            className="w-[436px] h-[39px] rounded-[21px] bg-[#393939]"
            style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
            placeholder="Enter text here..."
            />
        </div>
    );
};

export default TextContainer;