import React, {useState, useEffect} from 'react';
import Paragraph from '../paragraph';
import {Container, TopContainer, Label, Icon, Delete, Roll, InnerContainer} from './styles';
import diceIcon from '../../assets/images/dice.svg';
import crossIcon from '../../assets/images/cross.svg';
import plusIcon from '../../assets/images/plus.svg';

const DICE_SPIN_SPEED_MS = 400;

const RandomParagraph = ({
   paragraphs = [],     
   selectedParagraphIndex = 0,

   onParagraphRandomised, 
   onParagraphDeleted,
   onParagraphAdded,
}) => {
    const [isDiceRolling, updateIsDiceRolling] = useState(false);
    const isDeleted = selectedParagraphIndex === -1;
    const onDiceClicked = () => {
        onParagraphRandomised();
        updateIsDiceRolling(true);
    };

    useEffect(() => {
        let timeout;

        if (isDiceRolling) {
            timeout = setTimeout(() => {
                updateIsDiceRolling(false);
            }, DICE_SPIN_SPEED_MS);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isDiceRolling]);


    return (
        <Container>
             <TopContainer>
                <Label>{isDeleted ? 'Add a random introduction': 'Suggested Introduction'}</Label>
                {!isDeleted && <Roll tabIndex="0" onClick={onDiceClicked}>
                    <Icon src={diceIcon} isDiceRolling={isDiceRolling} speed={DICE_SPIN_SPEED_MS}/>
                </Roll>}
            </TopContainer>
            <InnerContainer>
                <Delete onClick={isDeleted ? onParagraphAdded : onParagraphDeleted}>
                    <Icon src={isDeleted ? plusIcon : crossIcon} />
                </Delete>
                <Paragraph
                    editable={false}
                    content={paragraphs[selectedParagraphIndex]}
                />
            </InnerContainer>
        </Container>
    );
}

export default RandomParagraph;