import {TIMEOUTTHRESHOLD} from '../support/constants'

export const performAction = () =>{
    performFirstStep(22,33);
    makeAMove(42, 53);
    makeAMove(31, 42);
    makeAMove(11, 22);
    makeAMove(20, 31);
    makeAMove(33, 44);
    makeAMove(22, 33);
    makeAMove('00', 11);
    makeAMove(33, 15);
    makeAMove(11, 33);
} 

export const makeAMove = (selectBlockNumber, destinationBlockNumber) =>
{
    cy.wait(TIMEOUTTHRESHOLD.TWO_SECOND);
    cy.get('#message').then((text)=>{
        const makeAMoveText = text.text();
        if(makeAMoveText === 'Make a move.')
        {
            cy.get("img[name='space"+selectBlockNumber+"']").click();
            cy.get("img[name='space"+destinationBlockNumber+"']").click();
        }
    })
}

export const performFirstStep = (selectBlockNumber, destinationBlockNumber) =>{
    cy.get("img[name='space"+selectBlockNumber+"']").click();
    cy.get("img[name='space"+destinationBlockNumber+"']").click();
}

export const restartGame = (restart, initialGameStage) =>{
    cy.get('a').contains(restart).click();
    cy.wait(TIMEOUTTHRESHOLD.TWO_SECOND);
    verifyGameLoaded(initialGameStage);
}

export const verifyGameLoaded = (initialGameStage) =>{
    cy.get('#message').then((messageText)=>{
        const text = messageText.text();
        expect(initialGameStage).eq(text);
    })
}