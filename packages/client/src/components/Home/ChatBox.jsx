import { Formik, Form, Field } from 'formik';
import { HStack } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input'; 
import { Button } from '@chakra-ui/button' 
import * as Yup from 'yup';
import socket from '../../socket';
import { MessagesContext } from './Home';
import { useContext } from 'react';

const ChatBox = ({userid}) => {

    const { setMessages } = useContext(MessagesContext);

    return (
        <Formik
            initialValues={{ message: '' }}
            validationSchema={Yup.object({
                message: Yup.string().min(1).max(255),
            })}
            onSubmit={(values, actions) => {
                const message = {to: userid, from: null, content: values.message}
                socket.emit('dm', message);
                setMessages(prevMsgs => [message, ...prevMsgs])
                // console.log('messagee: ', values.message)
                console.log(JSON.stringify(message));
                actions.resetForm();
            }}
        >
            <HStack as={Form} w='100%' pb='1.4rem' px='1.4rem'>
                <Input as={Field} name='message' placeholder='Type Message Here' size='lg' autoComplete='off' /> 
                <Button type='submit' size='lg' colorScheme='teal'>Send</Button>
            </HStack>
        </Formik>
    )
}

export default ChatBox