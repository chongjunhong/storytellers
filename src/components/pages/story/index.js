import React, {useState, useRef, useEffect} from 'react';
import uniq from 'lodash/uniq';
import {Progress, TextArea, Form, Button, Icon} from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from "react-router-dom";
import {
    getStoryByIds,
    getIntroParagraphsByLanguage,
    getCurrentParagraph,
    updateStateByKey,
    getIntroParagraphIndex,
    getIntroParagraphs,
    upsertStory,
    getAuthorLimit,
    getLanguage,
} from '../../../redux/story';
import {
    isAuthorLoggedIn,
    getAuthor,
    getName,
    getUserId,
    getEmail,
    getIdToken,
} from '../../../redux/author';
import {
    StoryConfig,
    Option,
    OptionInput,
    OptionLabel,
    Header,
    Container,
    CheckBoxWrapper,
    SelectionWrapper,
    OptionTitle,
    LongCheckBoxWrapper,
    SubmitButton,
    Modal,
    ModalWrapper,
} from './styles';

import Paragraph from '../../paragraph';
import RandomParagraph from '../../random-paragraph';
import SignIn from '../../login';
import Register from '../../register';

const MODAL_TYPES = {
    REGISTER: 'REGISTER',
    SIGN_IN: 'SIGN_IN',
    VERIFY_EMAIL: 'VERIFY_EMAIL',
};

const Story = ({inviteId}) => {
    const dispatch = useDispatch();
    const {storyId: storyIdFromPath} = useParams();
    const [activeModal, updateModal] = useState(null);

    const intros = useSelector(getIntroParagraphs);
    const currentParagraph = useSelector(getCurrentParagraph);
    const numOfIntros = intros.length;
    const selectedIntroIndex = useSelector(getIntroParagraphIndex);
    const isLoggedIn = useSelector(isAuthorLoggedIn);
    const author = useSelector(getAuthor);
    const name = useSelector(getName);
    const userId = useSelector(getUserId);
    const email = useSelector(getEmail);
    const idToken = useSelector(getIdToken);

    const authorLimit = useSelector(getAuthorLimit);
    const is3AuthorChecked = authorLimit === 3;
    const is5AuthorChecked = authorLimit === 5;
    const is8AuthorChecked = authorLimit === 8;
    const is13AuthorChecked = authorLimit === 13;
    const is21AuthorChecked = authorLimit === 21;
    
    const language = useSelector(getLanguage);
    const isLanguageEnglish = language === 'zh';

    console.log(name, userId);

    // TODO: remove
    // const isNewStory = story.canEdit && story.inviteId === null && story.storyId === null;
    const isNewStory = true;
    const headerContent = isNewStory
        ? 'A new story begins'
        : 'The story continues' 

    const languageNames = [
        {
            text: 'English',
            key: 'zh',
            value: 'zh',
        },
    ];

    const canSubmit = !!language
        && authorLimit >= 3
        && !!currentParagraph;

    useEffect(() => {
        dispatch(getStoryByIds({inviteId, storyId: storyIdFromPath}))
        
    }, [inviteId, storyIdFromPath, dispatch]);

    useEffect(() => {
        if (isNewStory) {
            dispatch(getIntroParagraphsByLanguage(language));
        }
    }, [language, dispatch, isNewStory]);

    const onParagraphRandomised = () => {
        dispatch(updateStateByKey({
            key: 'selectedIntroParagraphIndex',
            value: (selectedIntroIndex + 1) % numOfIntros,
        })); 
    };

    const onParagraphDelete = () => {
        dispatch(updateStateByKey({
            key: 'selectedIntroParagraphIndex',
            value: -1,
        }));  
    }

    const onParagraphAdded = () => {
        dispatch(updateStateByKey({
            key: 'selectedIntroParagraphIndex',
            value: 0,
        }));   
    }

    const updateAuthorLimitByValue = (event) => {
        dispatch(updateStateByKey({key: 'authorLimit', value: +event.target.value}));
    }

    const updateLanguage = (event) => {
        dispatch(updateStateByKey({key: 'language', value: event.target.value}));
    }

    const updateParagraph = (paragraph) => {
        dispatch(updateStateByKey({
            key: 'currentParagraph',
            value: paragraph,
        }))
    };

    const onSubmit = () => {
        if (!isLoggedIn) {
            // openLogin modal
            updateModal(MODAL_TYPES.SIGN_IN);
            console.log('nee');
        } else {
            console.log('call an api to add story');
            // call api
        }
    };

    const onRegisterSuccess = () => {
        updateModal(MODAL_TYPES.VERIFY_EMAIL);
    };

    const onSignInClicked = (event) => {
        event.preventDefault();

        updateModal(MODAL_TYPES.SIGN_IN);
    }

    const onLoginSuccess = () => {
        const introParagraphs = intros[selectedIntroIndex];
        const wordCount = currentParagraph.split(' ').length;
        console.log(name, language);

        dispatch(upsertStory({
            userId,
            storyId: storyIdFromPath,
            inviteId,
            paragraph: currentParagraph,
            introParagraphs,
            authorLimit,
            language,
            wordCount,
            email,
            authorName: name,
            token: idToken,
        }))
    };

    const onRegisterClicked = (event) => {
        event.preventDefault();

        updateModal(MODAL_TYPES.REGISTER);
    };

    const MODAL_COMPONENTS = {
        [MODAL_TYPES.REGISTER]: {
            component: Register,
            props: {
                onRegisterSuccess, 
                onSignInClicked,
                isModal: true,
            }
        },
        [MODAL_TYPES.SIGN_IN]: {
            component: SignIn,
            props: {
                isModal: true,
                onLoginSuccess,
                onRegisterClicked,
            }
        },
        [MODAL_TYPES.VERIFY_EMAIL]: null, // TODO: add verify modal
    };

    const ActiveModal = activeModal !== null ? MODAL_COMPONENTS[activeModal].component : () => null;
    const activeModalProps = activeModal !== null ? MODAL_COMPONENTS[activeModal].props : {};

    return (
        <Container>
            <Header>{headerContent}</Header>
            <StoryConfig>
                <Option>
                    <OptionTitle>Select a maximum number of authors</OptionTitle>
                    <SelectionWrapper>
                        <CheckBoxWrapper isChecked={is3AuthorChecked}>
                            <OptionLabel tabIndex="0" htmlFor='numberOfAuthors-3'>3</OptionLabel>
                            <OptionInput
                                type='checkbox'
                                id='numberOfAuthors-3'
                                onChange={updateAuthorLimitByValue}
                                value={3}
                                checked={is3AuthorChecked}
                            ></OptionInput>
                        </CheckBoxWrapper>  
                        <CheckBoxWrapper isChecked={is5AuthorChecked}>
                            <OptionLabel tabIndex="0" htmlFor='numberOfAuthors-5'>5</OptionLabel>
                            <OptionInput
                                type='checkbox'
                                id='numberOfAuthors-5'
                                value={5}
                                onChange={updateAuthorLimitByValue}
                                checked={is5AuthorChecked}
                            ></OptionInput>
                        </CheckBoxWrapper>
                        <CheckBoxWrapper isChecked={is8AuthorChecked}>
                            <OptionLabel tabIndex="0" htmlFor='numberOfAuthors-8'>8</OptionLabel>
                            <OptionInput
                                type='checkbox'
                                id='numberOfAuthors-8'
                                value={8}
                                onChange={updateAuthorLimitByValue}
                                checked={is8AuthorChecked}
                            ></OptionInput>
                        </CheckBoxWrapper>
                        <CheckBoxWrapper isChecked={is13AuthorChecked}>
                            <OptionLabel tabIndex="0" htmlFor='numberOfAuthors-13'>13</OptionLabel>
                            <OptionInput
                                type='checkbox'
                                id='numberOfAuthors-13'
                                value={13}
                                onChange={updateAuthorLimitByValue}
                                checked={is13AuthorChecked} 
                            ></OptionInput>
                        </CheckBoxWrapper>
                        <CheckBoxWrapper isChecked={is21AuthorChecked}>
                            <OptionLabel tabIndex="0" htmlFor='numberOfAuthors-21'>21</OptionLabel>
                            <OptionInput
                                type='checkbox'
                                id='numberOfAuthors-21'
                                value={21}
                                onChange={updateAuthorLimitByValue}
                                checked={is21AuthorChecked} 
                            ></OptionInput>
                        </CheckBoxWrapper>
                    </SelectionWrapper>
                    </Option>
                    <Option>
                       <OptionTitle>This story is written in what language?</OptionTitle>
                       <SelectionWrapper>
                        {languageNames.map(({text, value, key}) => (
                            <LongCheckBoxWrapper key={key} isChecked={isLanguageEnglish}>
                                <OptionLabel tabIndex="0" htmlFor={`language-${key}`}>{text}</OptionLabel>
                                <OptionInput
                                    type='checkbox'
                                    id={`language-${key}`}
                                    value={value}
                                    onChange={updateLanguage}
                                    checked={isLanguageEnglish} 
                                />
                            </LongCheckBoxWrapper> 
                        ))}                          
                       </SelectionWrapper>
                    </Option>
            </StoryConfig>
            <RandomParagraph 
                paragraphs={intros}
                selectedParagraphIndex={selectedIntroIndex}
                onParagraphRandomised={onParagraphRandomised} 
                onParagraphDeleted={onParagraphDelete}
                onParagraphAdded={onParagraphAdded}
            />
            <Paragraph
                editable={true}
                content={currentParagraph}
                onChangeFn={updateParagraph}
            />
            <SubmitButton
                disabled={!canSubmit}
                onClick={onSubmit}
            >
                Done
            </SubmitButton>

            {/* <Container>
                <ProgressContainer>
                    <ProgressLabel>Story progress:</ProgressLabel>
                    <Progress color="olive" value={numberOfAuthors} total={participantsLimit} indicating />
                </ProgressContainer>
                {!!paragraph && paragraph.map((text, index) => (
                    <Paragraph key={`${index}-${text.length}`}>{text}</Paragraph>
                ))}
                {canAccess && (
                    <>
                        <Form>
                        <h3 htmlFor={`paragraph-${currentParagraphNumber}`}>{isLastParagraph ? 'Last Paragraph' :`Paragraph ${currentParagraphNumber}`}</h3>
                        <TextArea
                            id={`paragraph-${currentParagraphNumber}`}
                            ref={editorRef}
                            value={currentParagraph}
                            onChange={(e) => void(setCurrentParagraph(e.target.value))}
                            placeholder={placeholder}
                            rows="15"
                        />
                        </Form>
                        <Button
                            attached="bottom"
                            type="submit"
                            disabled={!currentParagraph}
                            color="teal"
                            onClick={() => dispatch(setModal(MODEL_TYPES.REGISTRATION))}
                        >
                            Submit
                        </Button>
                    </>
                )}
            </Container>
            <RegistrationModal currentParagraph={currentParagraph} />
            <SignInModal currentParagraph={currentParagraph} />
            <InviteModal /> */}
            { activeModal !== null && (
                <ModalWrapper>
                    <Modal>
                        <ActiveModal {...activeModalProps} />
                    </Modal>
                </ModalWrapper>
            )}
        </Container>
    );
}

export default Story;