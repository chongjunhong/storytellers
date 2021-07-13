import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    HeaderContainer,
    Title,
    Login,
    Logout,
} from './styles';
import {reset, isAuthorLoggedIn} from '../../redux/author';
import {Auth} from 'aws-amplify';

const Header = () => {
    const isLoggedIn = useSelector(isAuthorLoggedIn);
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await Auth.signOut();
            dispatch(reset());
        } catch {}
    };

    return (
        <HeaderContainer>
            <Title href="/">Storytellers</Title>
            {!isLoggedIn &&<Login href="/login">Login</Login>}
            {isLoggedIn &&<Logout onClick={logout}>Logout</Logout>}
        </HeaderContainer>
    );
}

export default Header