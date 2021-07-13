import React from 'react';

import {
    Container,
} from './styles';

const Auth = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    );
};

export default Auth;