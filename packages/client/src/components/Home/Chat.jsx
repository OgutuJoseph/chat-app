import { VStack, Text } from '@chakra-ui/layout'; 
import { TabPanels, TabPanel } from '@chakra-ui/tabs';
import { useContext } from 'react';
import { FriendContext } from './Home';

const Chat = () => {

    const { friendList } = useContext(FriendContext)

    return friendList.length > 0 ? (
        <VStack py='1.4rem'>
            <TabPanels>
                <TabPanel>Friend One</TabPanel>
                <TabPanel>Friend Two</TabPanel>
            </TabPanels>
        </VStack>
    ) 
    :
    (
        <VStack justify='center' pt='2rem' w='100vw' textAlign='center' fontSize='lg'>
            <TabPanels> 
                <Text>No Friend :( Click 'Add Friend' to start chatting.</Text>
            </TabPanels>
        </VStack>
    );
}

export default Chat;