import { VStack, ButtonGroup, Button, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik'; 
import TextField from '../Containers/TextField';
import { useNavigate } from 'react-router';
import { formSchema } from '@chat-app/common';
import { useContext, useState } from 'react';
import { AccountContext } from '../AccountContext';

const SignUp = () => {

    const {setUser} = useContext(AccountContext);

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    return (
        <Formik
            initialValues= {{username: '', password: ''}}
            validationSchema = { formSchema }
            onSubmit= {(values, actions) => {
                // alert(JSON.stringify(values, null, 2));
                const vals = {...values}
                actions.resetForm();
                fetch('http://localhost:4000/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vals),
                }).catch(err => {
                return;
                }).then(res => {
                if(!res || !res.ok || !res.status >= 400){
                    return;
                }
                return res.json();
                }).then(data => {
                if(!data) return; 
                setUser({...data});
                if(data.status)
                {
                    setError(data.status);
                }
                else if(data.loggedIn)
                {
                    navigate('/home');
                }
                })
            }}
            > 
            <VStack as={Form} w={{ base: '90%', md: '500px' }} m='auto' justify='center' h='100vh' spacing='1rem'>
                <Heading>Sign Up</Heading> 

                <Text as='p' color='red.500'>{error}</Text>

                <TextField label='Username' name='username' type='text' placeholder='Enter Username' autoComplete='off' />
                
                <TextField label='Password' name='password' type='password' placeholder='Enter Password' autoComplete='off' />

                <ButtonGroup pt='1rem'>
                    <Button onClick={() => navigate('/')}>Sign In</Button>
                    <Button colorScheme='teal' type='submit'>Create Account</Button>
                </ButtonGroup>
            </VStack>   
        </Formik>
    )
}

export default SignUp;