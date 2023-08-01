/// <reference types="Cypress" />

import {verifyGameLoaded, performAction, restartGame} from '../support/checkersGameUtil'
 
describe('The Checkers Game', () => 
{
    const METHOD = 'GET';
    const END_POINT = "**/ppub_config?ippd=www.gamesforthebrain.com";
    let data;
    
    before('setup',()=>{
        cy.visit('https://www.gamesforthebrain.com/game/checkers/');
        
        cy.intercept({
            method:METHOD,
            url:END_POINT
        }).as('gameLoaded');
        cy.fixture('checkersGame.json').then(jsonData=>{
            data = jsonData;
        })
    })
it('Verify The Checkers Game steps', () => {
    //verify site up
    verifyGameLoaded(data.initialGameStage);

    performAction();
    restartGame(data.restart, data.initialGameStage);
})
});


