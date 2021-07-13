import styled from 'styled-components';
import {fontM, fontXL} from '../styles/constant';

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
        max-width: 250px;
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
    align-items: center;


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
    margin-top: 30px;
    text-align: center;
`

export const Header = styled.h2`
    margin-bottom: 50px;
    font: ${fontXL};
`;

export const Form = styled.form`
`;

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
    margin-top: 35px;
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
    margin-bottom: 25px;
`;

export const PopUp = styled.div`
    max-width: 500px;
    width: 100%;
    color: #fff;
    background-color: ${({isError}) => isError ? '#ff5959' : '00cc00'};
    position: absolute;
    top: 0;
    left: 50%;
    transform: ${({showPopUp}) => showPopUp ? 'translateY(10px)' :  'translateY(-100%)'} translateX(-50%);
    opacity: ${({showPopUp}) => showPopUp ? 1 :  0};
    transition-property: transform, opacity;
    transition-duration: 0.6s; 
    border-radius: 10px;
    padding: 10px 15px;
    display: flex;
    font: ${fontM};
`;

export const PopUpIcon = styled.img`
    width: 20px;
    height: 20px;
    flex-basis: 30px;
    align-self: center;
`

export const PopUpText = styled.div`
    flex: 1;
    padding-left: 10px;
`;