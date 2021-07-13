import styled, {css} from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 15px;
    margin-bottom: 50px;i
`;

export const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Roboto Condensed', sans-serif
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const Icon = styled.img`
    width: 25px;

    ${({isDiceRolling, speed}) => isDiceRolling && css`
        @keyframes rotation {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(359deg);
            }
        }

        animation: rotation ${speed}ms infinite linear;
    `}
`;

export const Label = styled.span`
    font-size: 18px;
`;

export const Roll = styled.button`
    display: inline-block;
    border: none;
    background: transparent;
    cursor: pointer;
    width: 30px;
    height: 30px;
    padding: 0;
    outline: none;
`;

export const Delete = styled.button`
    display: inline-block;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0 15px 0 0;
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
`;