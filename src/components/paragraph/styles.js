import styled from 'styled-components';

export const ParagraphContainer = styled.div`
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    width: 100%;
    position: relative;
    line-height: ${({lineHeight}) => lineHeight}px;
`;

export const TextArea = styled.textarea`
    width: 100%;
    border: none;
    resize: none;
    outline: none;
    padding: 0;
    line-height: ${({lineHeight}) => lineHeight}px;
`;

export const Label = styled.span`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 18px;
    font-weight: bold;
`;

export const WordCount = styled.span`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 18px;
    font-weight: bold;
    color: ${({isOverLimit}) => isOverLimit ? 'red' : 'black'};
`;

export const ParagraphTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;