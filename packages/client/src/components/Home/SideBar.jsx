import { VStack, HStack, Heading, Divider, Text, Circle } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/hooks';
import { Button } from '@chakra-ui/button';
import { ChatIcon } from '@chakra-ui/icons';
import { TabList, Tab } from '@chakra-ui/tabs';
import { useContext } from 'react';
import { FriendContext } from './Home';

import AddFriendModal from './AddFriendModal';

const SideBar = () => {

    const { friendList } = useContext(FriendContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <VStack py='1.4rem'>
                <HStack justify='space-evenly' w='100%'>
                    <Heading size='md'>Add Friend</Heading>
                    <Button onClick={onOpen}>
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
                        <HStack as={Tab} key={`friend:${friend}`}>
                            <Circle bg={friend.connected ? 'green.500' : 'red.500'} w='10px' h='10px' />
                            <Text>{friend}</Text>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
            <AddFriendModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default SideBar;