/// <reference types="Cypress" />

describe('The Checkers Game', () => 
{
    const METHOD = 'GET';
    let firstPlayerDeckId;
    let secondPlayerDeckId;
    
    //actally its not required to open site because its api, without open browser we can call endpoints
    before('', ()=>{
      cy.visit('https://deckofcardsapi.com/');  
      
    })

it('Verify The Card Game steps', () => {
    //verify site up
    verifyGameLoaded();

    //create new deck
    cy.request({
        method: METHOD,
        url:'https://deckofcardsapi.com/api/deck/new/?deck_count=2'
    }).then((response)=>{
        expect(200).eq(response.status);
        firstPlayerDeckId = response.body.deck_id;
        
        //verifying player has blackJack or not
        if(response.body.remaining === 312) {
            cy.log('Player 1 has BlackJack==>' + firstPlayerDeckId);
        }
    
    //Shuffle 
    cy.request({
        method:METHOD,
        url:"https://deckofcardsapi.com/api/deck/"+firstPlayerDeckId+"/shuffle/?remaining=true"
    }).then((response)=>{
        expect(200).eq(response.status);
        expect(true).to.equal(response.body.shuffled);
    })
    
    // add card the each deck
    cy.request({
        method:METHOD,
        url:"https://deckofcardsapi.com/api/deck/"+firstPlayerDeckId+"/draw/?count=3"
    }).then((response)=>{
        expect(200).eq(response.status);
        expect(3).to.equal(response.body.cards.length);
    })

    })
    
     cy.request({
        method:METHOD,
        url:"https://deckofcardsapi.com/api/deck/new/?deck_count=6"
    }).then((response)=>{
        expect(200).eq(response.status);
        secondPlayerDeckId = response.body.deck_id;
        
        //verifying player has blackJack or not
        if(response.body.remaining === 312) {
            cy.log('Player 2 has BlackJack==>' + secondPlayerDeckId);
        }
    
    cy.request({
            method:METHOD,
            url:"https://deckofcardsapi.com/api/deck/"+secondPlayerDeckId+"/draw/?count=3"
        }).then((response)=>{
            expect(200).eq(response.status);
            expect(3).to.equal(response.body.cards.length);
        })
    })
    
})
});

const verifyGameLoaded = () =>
{
    cy.get("h1[class='title']").contains('Deck of Cards');
}