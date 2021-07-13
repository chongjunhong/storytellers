import React, {useState, useEffect, useRef} from 'react';
import {TextArea,
    ParagraphContainer,
    Label,
    WordCount,
    ParagraphTopContainer,
} from './styles';

const SINGLE_PARAGRAPH_HEIGHT = 28;
const INIT_NUMBER_OF_PARAGRAPH = 5;

const removeNewLine = (paragraph) => paragraph.replace('\n', ' ');

const countEnglishWords = (paragraph) => paragraph
    .split(' ')
    .filter(Boolean)
    .length;

const resizeTextArea = (element) => {
    const {clientHeight, scrollHeight} = element;

    const neededCol = scrollHeight > clientHeight
        ? Math.ceil((scrollHeight - SINGLE_PARAGRAPH_HEIGHT) / SINGLE_PARAGRAPH_HEIGHT)
        : 0;
  
    element.rows += neededCol;
};

const Paragraph = ({
    editable = false,
    content = "",
    maxNumOfWords = 200,
    wordCountFn = countEnglishWords,
    onChangeFn,
    paragraphNumber,
}) => {
    const [paragraph, updateParagraph] = useState(content);
    const [wordCount, updateWordCount] = useState(0);
    const isOverWordLimit = wordCount > maxNumOfWords;
    const textAreaRef = useRef();

    const onParagraphChange = (event) => {
        const textAreaElement = event.target;
        const currentParagraph = removeNewLine(textAreaElement.value);

        updateParagraph(currentParagraph);
        updateWordCount(wordCountFn(currentParagraph));

        resizeTextArea(textAreaElement);
        onChangeFn(currentParagraph);
    }
    
    useEffect(() => {
        if (textAreaRef.current) {
            resizeTextArea(textAreaRef.current);
            updateWordCount(wordCountFn(paragraph));
        }
    }, []);

    return !editable
        ? <ParagraphContainer lineHeight={SINGLE_PARAGRAPH_HEIGHT}>{content}</ParagraphContainer>
        : (
            <ParagraphContainer>
                <ParagraphTopContainer>
                    <Label>Paragraph {paragraphNumber}</Label>
                    <WordCount isOverLimit={isOverWordLimit}> {wordCount} / 200 </WordCount>
                </ParagraphTopContainer>
                <TextArea
                    ref={textAreaRef}
                    lineHeight={SINGLE_PARAGRAPH_HEIGHT}
                    rows={INIT_NUMBER_OF_PARAGRAPH}
                    placeholder="What happens next?"
                    value={paragraph}
                    onInput={onParagraphChange}
                    onChange={onParagraphChange}
                />
            </ParagraphContainer>
        )
}

export default Paragraph;