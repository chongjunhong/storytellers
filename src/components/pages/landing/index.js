import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";
import {Button, Form, Dropdown, Input} from 'semantic-ui-react'
import {Wrapper} from './styles';
import {
    getLanguage,
    getAuthorLimit,
    updateStateByKey,
} from '../../../redux/story';
import InstructionModal from '../instruction';

// @TODO: Update language
const languageNames = [
    {
        text: 'English (UK)',
        key: 'English (UK)',
        value: 'zh_GB',
    },
    {
        text: 'English (US)',
        key: 'English (US)',
        value: 'zh_US',
    },
    {
        text: 'Simplified Chinese 汉语',
        key: 'Simplified Chinese',
        value: 'zh_CN',
    },
    {
        text: 'Traditional Chinese 漢語',
        key: 'Traditional Chinese',
        value: 'zh_TW',
    },
    {
        text: 'Japanese 日本語',
        key: 'Japanese',
        value: 'ja_JP',
    },
];

const Landing = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const language = useSelector(getLanguage);
    const authorLimit = useSelector(getAuthorLimit);

    return (
        <Wrapper>
            <Form onSubmit={() => {
                history.push(`/story`);
            }}>
                <Form.Field>
                    <label>Number of authors</label>
                    <Input
                        type="number"
                        value={authorLimit}
                        placeholder='2'
                        onChange={(_, {value}) => dispatch(updateStateByKey({key: 'authorLimit', value}))}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Written language</label>
                    <Dropdown
                        placeholder='Select Language'
                        fluid
                        search
                        selection
                        onChange={(_, {value}) => dispatch(updateStateByKey({key: 'language', value}))}
                        value={language}
                        options={languageNames}
                    />
                </Form.Field>
                <Button
                    color='teal'
                    type='submit'
                >
                    Start Writing!
                </Button>
                <InstructionModal />
        </Form>
    </Wrapper> 
    );
}

export default Landing;