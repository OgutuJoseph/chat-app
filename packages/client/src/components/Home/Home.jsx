import { Grid, GridItem, Tabs } from '@chakra-ui/react';
import SideBar from './SideBar';
import Chat from './Chat';
import { createContext, useState } from 'react';
import useSocketSetup from './useSocketSetup';

export const FriendContext = createContext();
export const MessagesContext = createContext();

console.log('fcccc: ', FriendContext);

const Home = () => {

    // const [friendList, setFriendList] = useState([
    //     { username: 'John Doe', connected: false },
    //     { username: 'Bill Gates', connected: true }
    // ]);

    const [friendList, setFriendList] = useState([]);

    const [messages, setMessages] = useState([]);

    const [friendIndex, setFriendIndex] = useState(0);

    useSocketSetup(setFriendList, setMessages);

    return (
        <FriendContext.Provider value={{ friendList, setFriendList}}>
            <Grid templateColumns='repeat(10, 1fr)' h='100vh' as={Tabs} onChange={(index) => setFriendIndex(index)}> 
                <GridItem colSpan='3' borderRight='1px solid grey'>
                    <SideBar />
                </GridItem>
                <GridItem colSpan='7' maxH='100vh'>
                    <MessagesContext.Provider value={{ messages, setMessages }}>
                        <Chat userid={friendList[friendIndex]?.userid}  />
                    </MessagesContext.Provider>
                </GridItem>
            </Grid>
        </FriendContext.Provider>
    )
}

export default Home;