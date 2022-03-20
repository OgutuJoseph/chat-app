import { VStack, ButtonGroup, Button, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { useNavigate } from 'react-router';

const SignUp = () => {

    const navigate = useNavigate();

    return (
        <Formik
            initialValues= {{username: '', password: ''}}
            validationSchema= {Yup.object({
                username: Yup.string().required('Username required.').min(6, 'Username must be six characters or more.').max(28, 'Username too long.'),
                password: Yup.string().required('Password required.').min(6,  'Password must be six characters or more.').max(28, 'Password too long.'),
            })}
            onSubmit= {(values, actions) => {
                alert(JSON.stringify(values, null, 2));
                actions.resetForm();
            }}
            > 
            <VStack as={Form} w={{ base: '90%', md: '500px' }} m='auto' justify='center' h='100vh' spacing='1rem'>
                <Heading>Sign Up</Heading> 

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