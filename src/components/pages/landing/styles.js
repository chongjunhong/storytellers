import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 30px 20px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;

    > form {
        width: 500px;
    }
`;

export const ErrorText = styled.div`
    color: red;
    font-size: 1em;
`