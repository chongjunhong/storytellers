import React, {useEffect, useState} from 'react';
import {Auth} from 'aws-amplify';
import {Header, SignInBtn,
    Modal, Image, LoginArea, Left, Register, Form, Label, Input, Icon, FieldContainer, PopUp, PopUpIcon, PopUpText} from './styles';
import maleImage from '../../assets/images/male.svg';
import lockIcon from '../../assets/images/lock.svg';
import userIcon from '../../assets/images/user.svg';
import badgeIcon from '../../assets/images/badge.svg';
import sendIcon from '../../assets/images/send.svg';
import errorIcon from '../../assets/images/exclamation.svg';
import noop from 'lodash/noop';

const InputErrorTypes = {
    PASSWORD: 'PASSWORD',
};

const DefaultInputMessages = {
    REQUIRED: 'Please fill in this field.',
    FORMAT: 'Please match the format requested.',
}

const CustomInputMessages = {
    [InputErrorTypes.PASSWORD]: 'Your password should AT LEAST be 8 characters long and include UPPERCASE letters, LOWERCASE letters and NUMBERS.',
};

const PopUpTypes = {
    GENERAL: 'GENERAL',
    VERIFICATION_EMAIL: 'VERIFICATION_EMAIL',
};

const PopUpMessage = {
    [PopUpTypes.VERIFICATION_EMAIL]: {
        message: "We've sent you a verification email. Please login after you have verified your email.",
        isError: false,
    },
    [PopUpTypes.GENERAL]: {
        message: 'Opps, something went wrong, please try again later.',
        isError: true,
    }
}

const Registration = ({
    isModal = false,
    onRegisterSuccess = noop,
    onSignInClicked = noop,
}) => {
    const POP_UP_TIMEOUT_MS = 15000;
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState({message: '', isError: false});

    const onFormSubmit = async (event) => {
        setIsSubmitting(true);
        event.preventDefault();

        try {
            const {user} = await Auth.signUp({
                username: email,
                password,
                attributes: {
                    given_name: firstName,
                    family_name: lastName,
                }

            });

            if (!!user && !isModal) {
                setShowPopUp(true);
                setPopUpMessage(PopUpMessage[PopUpTypes.VERIFICATION_EMAIL]);
            }

            if (!!user && isModal) {
                onRegisterSuccess(); 
            }

            // TODO: set state
        } catch (e) {
            setShowPopUp(true);
            setPopUpMessage(PopUpMessage[PopUpTypes.GENERAL]);
        }
        setIsSubmitting(false);
    }

    const onInputError = (type) => (event) => {
        const element = event.target;

        if (type === InputErrorTypes.PASSWORD
            && element.validationMessage === DefaultInputMessages.FORMAT) {
                element.setCustomValidity(CustomInputMessages[InputErrorTypes.PASSWORD]);
            }
    }

    useEffect(() => {
        let timer;

        if (showPopUp) {
            timer = setTimeout(() => {
                setShowPopUp(false);
                setPopUpMessage('');
            }, POP_UP_TIMEOUT_MS);
        }

        return () => {
            clearTimeout(timer);
        }
    }, [showPopUp])

    return (
        <Modal>
            {!isModal && <Left>
                <Image src={maleImage} />
                <Register href="/login">Login with your existing account</Register>
            </Left>}
            <LoginArea isModal={isModal}>
                <Header>Register</Header>
                <Form onSubmit={onFormSubmit}>
                    <FieldContainer>
                        <Label htmlFor="register-email">Email Address</Label>
                        <Icon src={userIcon} />
                        <Input
                            value={email}
                            required
                            type="email"
                            placeholder="Your email"
                            id="register-email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Label htmlFor="register-firstname">First Name</Label>
                        <Icon src={badgeIcon} />
                        <Input
                            required
                            value={firstName}
                            type="text"
                            placeholder="First Name"
                            id="register-firstname"
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Label htmlFor="register-lastname">Last Name</Label>
                        <Icon src={badgeIcon} />
                        <Input
                            required
                            value={lastName}
                            type="text"
                            placeholder="Last Name"
                            id="register-lastname"
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </FieldContainer>
                    <FieldContainer>
                    <Label htmlFor="register-password">Password</Label>
                    <Icon src={lockIcon} />
                    <Input
                            required
                            type="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            placeholder="Password"
                            id="register-password"
                            value={password}
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            onInvalid={onInputError(InputErrorTypes.PASSWORD)}
                            onChange={(event) => setPassword(event.target.value)}
                    />
                    </FieldContainer>
                    <SignInBtn disabled={isSubmitting} type="submit">Log in</SignInBtn>
                </Form>
                {isModal && <Register href={isModal ? '' : '/login'} onClick={onSignInClicked}>
                        Login to an existing account
                </Register>}
            </LoginArea>
            <PopUp isError={popUpMessage.isError} showPopUp={showPopUp}>
                <PopUpIcon src={popUpMessage.isError ? errorIcon : sendIcon} />
                <PopUpText>{popUpMessage.message}</PopUpText>
            </PopUp>
        </Modal>
    );
};

export default Registration;