import * as React from 'react';
import style from '../styles/chatbot.module.css';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

function Chatbot() {
  const [message, setMessage] = React.useState('');
  const [isMsgVisible, setIsMsgVisible] = React.useState(false);
  const [isBotVisible, setIsBotVisible] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  // Initial bot messages with delays
  React.useEffect(() => {
    const initialMessages = [
      { msg: 'Hi there! 👋', tag: 'bot' },
      { msg: "I'm CartMate, your virtual assistant.", tag: 'bot', delay: 1000 },
      {
        msg: 'I can help you with queries related to products, orders, delivery, payment methods, etc.',
        tag: 'bot',
        delay: 2000
      },
      { msg: 'How may I assist you today?', tag: 'bot', delay: 3000 }
    ];

    let isMounted = true;

    initialMessages.forEach((message, index) => {
      setTimeout(() => {
        if (isMounted) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      }, message.delay || 0);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-scroll to the latest message
  React.useEffect(() => {
    const scrollToLatestMessage = () => {
      const elem = document.getElementById('body');
      if (elem && elem.scrollHeight > elem.offsetHeight) {
        elem.scrollTop = elem.scrollHeight;
      }
    };

    return scrollToLatestMessage();
  }, [messages, isMsgVisible]);

  // Handle sending a message
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message || message.length < 2) return;
    setIsMsgVisible(() => false);

    const res = await axios.post(
      `${process.env.REACT_APP_CHATBOT_API}/${message}`
    );

    setMessages(() => [
      ...messages,
      { msg: message, tag: 'user' },
      { msg: res.data.message || 'bye!', tag: 'bot' }
    ]);
    setMessage(() => '');

    setTimeout(() => {
      setIsMsgVisible(() => true);
    }, 1000);
  };

  return (
    <>
      <div
        className={style.chatbot}
        data-tooltip="Chat with CartMate"
        onClick={() => setIsBotVisible(() => true)}
      >
        <MarkChatUnreadIcon />
      </div>

      {isBotVisible && (
        <div className={style.container}>
          <div className={style.header}>
            <span>CartMate</span>
            <span>
              <CancelIcon
                onClick={() => setIsBotVisible(() => false)}
                sx={{ cursor: 'pointer' }}
              />
            </span>
          </div>
          <div className={style.body} id="body">
            {messages.map(({ msg, tag }, index) => (
              tag === 'bot' ? (
                <div key={index} className={style.bot_msg}>
                  {!isMsgVisible && index === messages.length - 1 ? (
                    <div className={style.chatbot_ticontainer}>
                      <div className={style.chatbot_tiblock}>
                        <div className={style.chatbot_tidot} />
                        <div className={style.chatbot_tidot} />
                        <div className={style.chatbot_tidot} />
                      </div>
                    </div>
                  ) : (
                    msg
                  )}
                </div>
              ) : (
                <div key={index} className={style.user_msg}>
                  {msg}
                </div>
              )
            ))}
          </div>
          <form className={style.textbox} onSubmit={handleSubmit}>
            <div className={style.msgBox}>
              <input
                autoFocus={true}
                placeholder="Type your message here..."
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className={style.sendButton} onClick={handleSubmit}>
              <IconButton>
                <SendIcon sx={{ color: '#071c29' }} />
              </IconButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;