import { VStack, Text } from '@chakra-ui/layout'; 
import { TabPanels, TabPanel } from '@chakra-ui/tabs';
import { useContext, useEffect, useRef } from 'react';
import ChatBox from './ChatBox';
import { FriendContext, MessagesContext } from './Home';

const Chat = ({userid}) => {

    const { friendList } = useContext(FriendContext);
    // console.log('ffff: ', friendList);

    const { messages } = useContext(MessagesContext);

    const bottomDiv  = useRef(null);

    useEffect(() => {
        bottomDiv.current?.scrollIntoView();
    });

    return friendList.length > 0 ? (
        <VStack h='100%' justify='end'>
            {/* <TabPanels>
                <TabPanel>Friend One</TabPanel>
                <TabPanel>Friend Two</TabPanel>
            </TabPanels> */}
            <TabPanels overflowY='scroll'> 
                {friendList.map(friend => (
                    <VStack flexDir='column-reverse' as={TabPanel} key={`chat:${friend.username}`} w='100%'>
                        <div ref={bottomDiv} />
                        {messages.filter(
                            msg => msg.to === friend.userid || msg.from === friend.userid
                        ).map((message, idx) => (
                            <Text 
                                key={`msg:${friend.username}.${idx}`} 
                                fontSize='lg' 
                                bg={message.to === friend.userid ? 'blue.100' : 'gray.100'} 
                                color='gray.800' borderRadius='10px' 
                                p='0.5rem 1rem'
                                m={message.to === friend.userid ? '1rem 0 0 auto !important' : '1rem auto 0 0 !important'}
                                maxW='50%'
                            >
                                {message.content}
                            </Text>
                        ))}
                    </VStack>
                ))}
            </TabPanels>
            <ChatBox userid={userid} />
        </VStack>
    ) 
    :
    (
        <VStack justify='center' pt='2rem' w='60vw' textAlign='center' fontSize='lg'>
            <TabPanels> 
                <TabPanel>
                    <Text>No Friend :( Click 'Add Friend' to start chatting.</Text>
                </TabPanel>
            </TabPanels>
        </VStack>
    );
}

export default Chat;