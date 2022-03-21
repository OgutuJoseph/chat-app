import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/modal';
import { ModalOverlay, Button, ModalCloseButton } from '@chakra-ui/react';
import TextField from '../Containers/TextField';
import { Formik, Form } from  'formik';
import { friendSchema } from '@chat-app/common';

const AddFriendModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add New Friend!
                    <ModalCloseButton />
                </ModalHeader>
                <Formik
                    initialValues={{ friendName: '' }}
                    onSubmit={(values, actions) => {
                        onClose();
                        alert(JSON.stringify(values, null, 2));
                        actions.resetForm();
                    }}
                    validationSchema={friendSchema}
                >
                    <Form>
                        <ModalBody> 
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