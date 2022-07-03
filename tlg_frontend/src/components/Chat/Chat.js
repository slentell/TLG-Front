// 7/2/2022 Stream Attempt

import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Attachment,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChatContext,
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";

const apiKey = process.env.REACT_APP_STREAM_API_KEY;
const user = {
  id: "melissa",
  name: "Melissa",
  image:
    "https://nintendosoup.com/random-pokemon-sword-shield-art-director-shares-bizarre-fan-art-of-buff-kirby/",
};
// const filters = {type: 'messaging', members: {$in: [user.id]}}
const sort = { last_message_at: -1 };

const CustomChannelPreview = (props) => {
  const { channel, setActiveChannel } = props;
  const { messages } = channel.state;
  const lastMessage = messages[messages.length - 1];

  console.log(lastMessage);

  return (
    <button
      onClick={() => setActiveChannel(channel)}
      style={{ margin: "12px" }}
    >
      <div>{channel.data.name || "Unnamed Channel"}</div>
      <div style={{ fontSize: "14px" }}>{lastMessage.text}</div>
    </button>
  );
};
// function CustomChannelHeader() {
//   const { channel } = useChatContext()
//   const { data }  = channel

//   return (
//     <header
//     style = {{
//       height: '40px',
//       backgroundColor: 'white',
//       marginBottom: '20px',
//       borderRadius: '10px',
//       padding: '10px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       fontSize: '20px',
//       fontWeight: 'bold',
//       color: '#333',
//       fontFamily: 'sans-serif',
//       boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
//       border: '1px solid #ccc',
//     }}>
//       {data.image && (
//       <img
//       src={data.image}
//       alt="channel"
//       style={{
//         width: 20,
//         height: 20,
//         borderRadius: '50%',
//          marginRight: 10
//         }}
//         />)}
//      {data.name}

//     </header>
//   )
// }

const ChatComp = () => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function init() {
      const chatClient = new StreamChat.getInstance(apiKey);
      await chatClient.connectUser(user, chatClient.devToken(user.id));
      const channel = chatClient.channel(
        "team",
        "b57e4c7a-3f32-4fa3-8cd1-44bc66b64663t",
        {
          image:
            "https://cdn.myminifactory.com/assets/object-assets/5e980b0d9169f/images/720X720-img-0353.JPG",
          name: "Team Chat",
          members: [user.id],
        }
      );
      await channel.watch();
      setChannel(channel);
      setClient(chatClient);
    }
    init();

    if (client) return () => client.disconnectUser();
  }, []);
  if (!channel || !client) return <LoadingIndicator />;

  return (
    <div>
      <Chat client={client} theme="messaging light">
        <ChannelList
          // filters={filters}
          sort={sort}
          Preview={CustomChannelPreview}
        />
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatComp;
// const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidGhyb2JiaW5nLW1vdXNlLTkiLCJleHAiOjE2NTYyODkyMzd9.GBpoaH-UPl35QnL4s1WnTSmajgDf_swTWlpH_38OZb4';

// const filters = { type: 'messaging', members: { $in: ['throbbing-mouse-9'] } };
// const sort = { last_message_at: -1 };

// const attachments = [
//   {
//     image: 'https://images-na.ssl-images-amazon.com/images/I/71k0cry-ceL._SL1500_.jpg',
//     name: 'iPhone',
//     type: 'product',
//     url: 'https://goo.gl/ppFmcR',
//   },
// ];

// const CustomAttachment = (props) => {
//   const { attachments } = props;
//   const [attachment] = attachments || [];

//   if (attachment?.type === 'product') {
//     return (
//       <div>
//         Product:
//         <a href={attachment.url} rel='noreferrer'>
//           <img alt='custom-attachment' height='100px' src={attachment.image} />
//           <br />
//           {attachment.name}
//         </a>
//       </div>
//     );
//   }

//   return <Attachment {...props} />;
// };

// const ChatComp = () => {
//   const [chatClient, setChatClient] = useState(null);

//   useEffect(() => {
//     const initChat = async () => {
//       const client = StreamChat.getInstance('dz5f4d5kzrue');

//       await client.connectUser(
//         {
//           id: 'throbbing-mouse-9',
//           name: 'throbbing',
//           image: 'https://getstream.io/random_png/?id=throbbing-mouse-9&name=throbbing',
//         },
//         userToken,
//       );

//       const [channelResponse] = await client.queryChannels(filters, sort);

//       await channelResponse.sendMessage({
//         text: 'Your selected product is out of stock, would you like to select one of these alternatives?',
//         attachments,
//       });

//       setChatClient(client);
//     };

//     initChat();
//   }, []);

//   if (!chatClient) {
//     return <LoadingIndicator />;
//   }

//   return (
//     <Chat client={chatClient} theme='messaging light'>
//       <ChannelList filters={filters} sort={sort} />
//       <Channel Attachment={CustomAttachment}>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   );
// };

// export default ChatComp;

// live stream option

// import { Container, Box, Typography } from '@mui/material';
// import React from 'react';
// import { StreamChat } from 'stream-chat';
// import { Chat, Channel, ChannelHeader, MessageInput, MessageInputSmall, VirtualizedMessageList, Window } from 'stream-chat-react';

// import 'stream-chat-react/dist/css/index.css';

// const chatClient = StreamChat.getInstance('');
// const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidGhyb2JiaW5nLW1vdXNlLTkiLCJleHAiOjE2NTYyODkyMzd9.GBpoaH-UPl35QnL4s1WnTSmajgDf_swTWlpH_38OZb4';

// chatClient.connectUser(
//   {
//     id: 'throbbing-mouse-9',
//     name: 'throbbing',
//     image: 'https://getstream.io/random_png/?id=throbbing-mouse-9&name=throbbing',
//   },
//   userToken,
//   // chatClient.devToken('john'),
// );

// const channel = chatClient.channel('livestream', 'liftChat', {
//   image: 'https://cdn.myminifactory.com/assets/object-assets/5e980b0d9169f/images/720X720-img-0353.JPG',
//   name: 'Lift Chat',
// });

// const ChatComp = () => {
//   return (
//     <Box>
//       <Container sx={{justify:'center', backgroundColor:'grey'}}>
//       <Typography variant='h4' style={{color:"pink"}}>Lift Chat</Typography>
//       </Container>
//     <Container>
//     <Chat client={chatClient} theme='livestream light'>
//       <Channel channel={channel}>
//         <Window>
//           <ChannelHeader live />
//           <VirtualizedMessageList />
//           <MessageInput Input={MessageInputSmall} focus />
//         </Window>
//       </Channel>
//     </Chat>
//     </Container>
//     </Box>
//   )
// };

// export default ChatComp;

// first attempt

// import React, { Component, useState } from "react";
// import {
//   Chat,
//   Channel,
//   ChannelHeader,
//   Thread,
//   Window
// } from "stream-chat-react";
// import { MessageList, MessageInput } from "stream-chat-react";
// import { StreamChat } from "stream-chat";

// import "stream-chat-react/dist/css/index.css";

// const ChatComp = (props) => {

//     const client = new StreamChat("<YOUR_STREAM_APP_ID>");
//     client.connectUser(
//     {
//         id: "cool-sky-9",
//         name: "Cool Sky",
//         image: "https://getstream.io/random_svg/?id=cool-sky-9&name=Cool+sky"
//     },
//     localStorage.getItem("token")
//     );

//     const channel = client.channel("messaging", "godevs", {
//         image:
//             "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
//         name: "Talk about Go"
//     });

//     return (
//         <Chat client={client} theme={"messaging light"}>
//             <Channel channel={channel}>
//             <Window>
//                 <ChannelHeader />
//                 <MessageList />
//                 <MessageInput />
//             </Window>
//             <Thread />
//             </Channel>
//         </Chat>
//     );
// }

// export default ChatComp;
