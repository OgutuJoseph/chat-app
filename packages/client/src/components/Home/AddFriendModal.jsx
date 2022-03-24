import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, } from '@chakra-ui/modal';
import { ModalOverlay, Button, Heading } from '@chakra-ui/react';
import TextField from '../Containers/TextField';
import { Formik, Form } from  'formik';
import { friendSchema } from '@chat-app/common';
import socket from '../../socket';
import { useState, useCallback, useContext } from 'react';
import { FriendContext } from './Home';

const AddFriendModal = ({ isOpen, onClose }) => {

    const [error, setError] = useState('');

    const closeModal = useCallback(
        () => {
            setError('');
            onClose();
        },
        [onClose],
    );

    const {setFriendList} = useContext(FriendContext);

    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add New Friend!
                    <ModalCloseButton />
                </ModalHeader>
                <Formik
                    initialValues={{ friendName: '' }}
                    onSubmit={(values, actions) => {
                        socket.emit('add_friend', values.friendName, ({ errorMsg, done, newFriend }) => {
                            if (done) {
                                setFriendList(c => [newFriend, ...c])
                                closeModal();
                                return;
                            }
                            setError(errorMsg);  
                        }); 
                        // alert(JSON.stringify(values, null, 2));
                        // actions.resetForm();
                    }}
                    validationSchema={friendSchema}
                >
                    <Form>
                        <ModalBody> 
                            <Heading as='p' color='red.500' textAlign='center' fontSize='md'>{error}</Heading>
                            <TextField  label="Friend's Name" placeholder="Enter Friend's Name" name='friendName' autocomplete='off' />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue'  type='submit'> Submit</Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    )
}

export default AddFriendModal;