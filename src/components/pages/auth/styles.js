import styled from 'styled-components';
import {fontXL, marginL, marginM} from '../../styles/constant';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #fbfbfb;

    @media (min-width: 768px) {
        padding: 50px;
    }
`;

export const Modal = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    height: 600px;
    background-color: #fff;
    flex-wrap: wrap;
    position: relative;

    @media (min-width: 768px) {
        max-width: 900px;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: rgb(0 0 0 / 10%) 0 4px 12px;
    }
`;

export const Image = styled.img`
    display: none;

    @media (min-width: 768px) {
        display: inline-block;
        max-width: 100%;
    }
`;

export const LoginArea = styled.div`
    order: 1;
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    padding: 30px;
    justify-content: flex-start; 
    
    ${props => !props.isModal
        ? `@media (min-width: 768px) {
            max-width: 400px;
            order: 2;
            justify-content: center; 
        }`
        : ''
    };
`;

export const Left = styled.div`
    order: 2;
    display: flex;
    width: 100%;
    justify-content: center;


    @media (min-width: 768px) {
        flex-direction: column;
        justify-content: center;
        flex-basis: auto;
        flex: 1;
        order: 1;
    }
`;

export const Register = styled.a`
    text-decoration: underline;
    color: #000;
    cursor: pointer;
    text-align: center;
    margin-top: ${marginM}px;
`

export const Header = styled.h2`
    margin-bottom: ${marginL}px;
    font: ${fontXL};
`;

export const Form = styled.form``;

export const Label = styled.label`
    display: inline-block;
    position: absolute;
    height: 0;
    visibility: hidden;
`

export const Input = styled.input`
    border: none;
    width: 100%;
    border-bottom: 2px solid #dedede;
    height: 50px;
    padding-left: 25px;
`;

export const SignInBtn = styled.button`
    border: none;
    cursor: pointer;
    background-color: #6363E5;
    padding: 15px 30px;
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
    margin-top: ${marginL}px;
`

export const Icon = styled.img`
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
`;

export const FieldContainer = styled.div`
    position: relative;
    margin-bottom: ${marginM}px;
`;
