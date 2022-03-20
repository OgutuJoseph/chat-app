import { Grid, GridItem, Tabs } from '@chakra-ui/react';
import SideBar from './SideBar';
import Chat from './Chat';
import { createContext, useState } from 'react';

export const FriendContext = createContext();

const Home = () => {

    // const [friendList, setFriendList] = useState([
    //     { username: 'John Doe', connected: false },
    //     { username: 'Bill Gates', connected: true }
    // ]);

    const [friendList, setFriendList] = useState([ 
        
    ]);

    return (
        <FriendContext.Provider value={{ friendList, setFriendList}}>
            <Grid templateColumns='repeat(10, 1fr)' h='100vh' as={Tabs}>
                <GridItem colSpan='3' borderRight='1px solid grey'>
                    <SideBar />
                </GridItem>
                <GridItem colSpan='7'>
                    <Chat />
                </GridItem>
            </Grid>
        </FriendContext.Provider>
    )
}

export default Home;