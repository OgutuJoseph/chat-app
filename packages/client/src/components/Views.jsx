import { Routes, Route } from 'react-router-dom';
import { Text } from '@chakra-ui/layout';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import PrivateRoutes from './PrivateRoutes';
import { useContext } from 'react';
import { AccountContext } from './AccountContext'; 


const Views = () => {

    const { user } = useContext(AccountContext); 

    return user.loggedIn === null ? (<Text>Loading...</Text>) : ( 
        <Routes>
            
            <Route path='/' element={<Login />}/>
            {/* To render login page incase of accessing a non-existing component */}
            <Route path='*' element={<Login />}/>
            <Route path='/register' element={<SignUp />}/> 

            {/* Wrap home component in private route to prevent unauthorized access to resource */}
            <Route element={<PrivateRoutes />}>                
                <Route path='/home' element={<Text>Hi, Welcome Home</Text>}/> 
            </Route>
        </Routes> 
    )
};

export default Views;
