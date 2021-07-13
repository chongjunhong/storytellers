import styled from 'styled-components';

export const Container = styled.div`
    padding: 25px;
`;

export const ProgressContainer = styled.figure`
    margin: 0;
`;

export const ProgressLabel = styled.figcaption`
    font-size: 1em;
    display: inline-block;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const Paragraph = styled.p`
    text-indent: 30px;
    margin-bottom: 30px;
    max-width: 680px;
    align-self: center;
`;

export const Option = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    &:not(:last-child) {
        margin-bottom: 50px;
    }
`;

export const OptionLabel = styled.label`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 18px;
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 38px;
    color: white;
    cursor: pointer;
`;

export const CheckBoxWrapper = styled.div`
    position: relative; 
    display: inline-block;
    border-radius: 8px;
    height: 60px;
    width: 100%;
    background-color: ${({isChecked}) => isChecked ? '#db6400' : '#bababa'};

    @media (min-width: 768px) {
        width: 60px;
        height: 60px;
    }
`;

export const LongCheckBoxWrapper = styled(CheckBoxWrapper)`
    width: 150px;
    height: 60px;

    @media (min-width: 768px) {
        width: 150px
        height: 60px;
    }

    > ${OptionLabel} {
        font-size: 25px;
    }
`

export const OptionTitle = styled.legend`
    width: 100%;
    margin-bottom: 20px;
    font-size: 18px;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: bold;
`;

export const OptionInput = styled.input`
    visibility: hidden;
    height: 0;
`;

export const Header = styled.h1`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 38px;
    margin-bottom: 50px;
`;

export const SelectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 50px;

    & > ${CheckBoxWrapper} {
        margin-bottom: 20px;
    }


    @media (min-width: 768px) {
        justify-content: space-between;
        flex-direction: row;
        max-width: 700px;
        width: 100%;
        margin-bottom: 0;

        & > ${CheckBoxWrapper} {
            margin-bottom: 0;
        }i
    }
`;

export const StoryConfig = styled.fieldset`
    display: flex;
    flex-direction: column;
    border: none;
    margin: 0;
    margin-bottom: 50px;
    padding: 0;
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    font-family: 'Roboto Condensed', sans-serif;
    background-color: #db6400;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
        background-color: #d3d3d3;
        color: #000;
    }
`;

export const Modal = styled.div`
    width: 500px;
`;

export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;