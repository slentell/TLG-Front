// import React, { useEffect, useState } from 'react';
// import { StreamChat } from 'stream-chat';
// import {
//   Attachment,
//   Chat,
//   Channel,
//   ChannelHeader,
//   ChannelList,
//   LoadingIndicator,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
// } from 'stream-chat-react';

// import 'stream-chat-react/dist/css/index.css';

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

import { Container, Box, Typography } from '@mui/material';
import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageInputSmall, VirtualizedMessageList, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

const chatClient = StreamChat.getInstance('pf2tqhes9zqv');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidGhyb2JiaW5nLW1vdXNlLTkiLCJleHAiOjE2NTYyODkyMzd9.GBpoaH-UPl35QnL4s1WnTSmajgDf_swTWlpH_38OZb4';

chatClient.connectUser(
  {
    id: 'throbbing-mouse-9',
    name: 'throbbing',
    image: 'https://getstream.io/random_png/?id=throbbing-mouse-9&name=throbbing',
  },
  userToken,
  // chatClient.devToken('john'),
);

const channel = chatClient.channel('livestream', 'liftChat', {
  image: 'https://cdn.myminifactory.com/assets/object-assets/5e980b0d9169f/images/720X720-img-0353.JPG',
  name: 'Lift Chat',
});

const ChatComp = () => {
  return (
    <Box>
      <Container sx={{justify:'center', backgroundColor:'grey'}}>
      <Typography variant='h4' style={{color:"pink"}}>Lift Chat</Typography>
      </Container>
    <Container>
    <Chat client={chatClient} theme='livestream light'>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader live />
          <VirtualizedMessageList />
          <MessageInput Input={MessageInputSmall} focus />
        </Window>
      </Channel>
    </Chat>
    </Container>
    </Box>
  )
};

export default ChatComp;

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