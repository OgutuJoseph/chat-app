import { VStack, HStack, Heading, Divider, Text, Circle } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ChatIcon } from '@chakra-ui/icons';
import { TabList, Tab } from '@chakra-ui/tabs';
import { useContext } from 'react';
import { FriendContext } from './Home';

const SideBar = () => {

    const { friendList, setFriendList } = useContext(FriendContext);

    return (
        <VStack py='1.4rem'>
            <HStack justify='space-evenly' w='100%'>
                <Heading size='md'>Add Friend</Heading>
                <Button>
                    <ChatIcon />
                </Button>
            </HStack>
            <Divider />
            <VStack as={TabList}>
                {/* <HStack as={Tab}>
                    <Circle bg='red.500' w='10px' h='10px' />
                    <Text>John Doe</Text>
                </HStack>
                <HStack as={Tab}>
                    <Circle bg='green.500' w='10px' h='10px' />
                    <Text>Bill Gates</Text>
                </HStack> */}
                {friendList.map(friend => (
                    <HStack as={Tab}>
                        <Circle bg={friend.connected ? 'green.500' : 'red.500'} w='10px' h='10px' />
                        <Text>{friend.username}</Text>
                    </HStack>
                ))}
            </VStack>
        </VStack>
    )
}

export default SideBar;