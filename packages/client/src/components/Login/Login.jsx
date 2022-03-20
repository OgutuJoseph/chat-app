import { VStack, ButtonGroup, Button, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { useNavigate } from 'react-router';

const Login = () => {

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
                <Heading>Log In</Heading>
                {/* <FormControl isInvalid={formik.errors.username && formik.touched.username}>
                <FormLabel fontSize='lg'>Username</FormLabel>
                <Input name='username' placeholder='Enter Username' autoComplete='off' size='lg' type='text' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <Input name='username' placeholder='Enter Username' autoComplete='off' size='lg' type='text' {...formik.getFieldProps('username')} />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                </FormControl> */}

                <TextField label='Username' name='username' type='text' placeholder='Enter Username' autoComplete='off' />
                
                <TextField label='Password' name='password' type='password' placeholder='Enter Password' autoComplete='off' />

                <ButtonGroup pt='1rem'>
                    <Button onClick={() => navigate('/register')}>Create Account</Button>
                    <Button colorScheme='teal' type='submit'>Log In</Button>
                </ButtonGroup>
            </VStack>   
        </Formik>
    )
}

export default Login;