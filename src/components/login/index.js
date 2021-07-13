import React, {useState, useEffect} from 'react';
import {Auth} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import noop from 'lodash/noop';

import {
    Header,
    SignInBtn,
    Modal,
    Image,
    LoginArea,
    Left, 
    Register, 
    Form, 
    Label, 
    Input, 
    Icon, 
    FieldContainer,
} from './styles';
import {PopUpText, PopUpIcon, PopUp} from '../register/styles';
import loginillustration from '../../assets/images/signup.svg';
import lockIcon from '../../assets/images/lock.svg';
import userIcon from '../../assets/images/user.svg';
import exclamationIcon from '../../assets/images/exclamation.svg';

import {setAuthor} from '../../redux/author';
import getUserDetailsFromAmplify from '../../helpers/users/get-user-details-from-amplify';


const Login = ({
    isModal = false,
    onLoginSuccess = noop,
    redirectAfterSuccess = '/',
    onRegisterClicked = noop,
}) => {
    const POP_UP_TIMEOUT_MS = 5000;
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasError, setHasError] = useState(false);

    const onFormSubmit = async (event) => {
        setIsSubmitting(true);
        event.preventDefault();
        
        try {
            const user = await Auth.signIn(email, password);

            dispatch(setAuthor(getUserDetailsFromAmplify(user)));

            if (isModal) {
                onLoginSuccess();
            } else {
                history.push(redirectAfterSuccess);
            }
        } catch (e) {
            setHasError(true);
        }

        setIsSubmitting(false);
    };

    useEffect(() => {
        let timer;

        if (hasError) {
            timer = setTimeout(() => {
                setHasError(false);
            }, POP_UP_TIMEOUT_MS);
        }

        return () => {
            clearTimeout(timer);
        }
    }, [hasError])

    return (
        <Modal>
            <PopUp isError={true} showPopUp={hasError}>
                <PopUpIcon src={exclamationIcon} />
                <PopUpText>Opps, you might have entered an incorrect email or password.</PopUpText>
            </PopUp>
            {!isModal && <Left>
                <Image src={loginillustration} />
                <Register href="/register">Create an account</Register>
            </Left>}
            <LoginArea isModal={isModal}>
                <Header>Login</Header>
                <Form onSubmit={onFormSubmit}>
                    <FieldContainer>
                        <Label htmlFor="login-email">Email Address</Label>
                        <Icon src={userIcon} />
                        <Input
                            value={email}
                            required
                            type="email"
                            placeholder="Your email"
                            id="login-email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </FieldContainer>
                    <FieldContainer>
                    <Label htmlFor="login-password">Password</Label>
                    <Icon src={lockIcon} />
                    <Input
                        required
                        type="password"
                        placeholder="Password"
                        id="login-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    </FieldContainer>
                    <SignInBtn disabled={isSubmitting} type="submit">Log in</SignInBtn>
                </Form>
                {isModal && <Register href={isModal ? '' : '/register'} onClick={onRegisterClicked}>
                    Create an account
                </Register>}
            </LoginArea>
        </Modal>
    );
};

export default Login;