import styled from 'styled-components';
import {fontM} from '../styles/constant';

export const HeaderContainer = styled.header`
    background-color: #db6400;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 15px 15px 15px;
    color: #fff;
    font-family: 'Pacifico', cursive;
    justify-content: space-between;
`;

export const Title = styled.a`
    font-size: 2em;
    line-height: 1.2em;
    text-decoration: none;
    color: #fff;
    display: inline-block;

    &:hover {
        color: #fff;
    }
`;

export const Login = styled.a`
    font: ${fontM};
    padding: 5px 10px;
    background-color: #f8f1f1;
    color: #000;
    border-radius: 5px;
`;

export const Logout = styled.button`
    font: ${fontM};
    padding: 5px 10px;
    background-color: #C2C2C2;
    color: #fff;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;
