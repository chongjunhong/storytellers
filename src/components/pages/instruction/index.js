import React, {useState} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {Text} from './styles';

const InstructionModal = () => {
    const [open, setOpen] = useState(false)

    return (
        <Modal
            size='tiny'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button type="button" color='blue'>What is Storytellers?</Button>}
        >
            <Modal.Header>Introduction</Modal.Header>
            <Modal.Content>
                <Text>Storytellers allows you to express your creativity and writing skills by completing a story with your friends and family.</Text>
                <Text>The story is completed by relaying partially-written story from the most recent author to a friend or family, the cycle continues until the final paragraph is finished.</Text>
                <Text>You can start a story by setting the rules and writing the first paragraph or you can be invited by your friend or family to finish the next paragraph.</Text>
                <Text>Every authors has to finish a paragraph before inviting another person. After a story is fully completed, you will be notified to enjoy the final version of the story you have contributed.</Text>
                <Text>Have fun!</Text>
            </Modal.Content>
            <Modal.Actions>
                <Button type="button" color='blue' onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default InstructionModal;