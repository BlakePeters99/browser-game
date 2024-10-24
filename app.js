/*-------------------------------- Constants --------------------------------*/
const raceElement = document.querySelector('#race');
const lootElement = document.querySelector('#loot');
const promptElement = document.querySelector('.prompt');
const plotElement = document.querySelector('#plot');
const buttonsElement = document.querySelector('#buttons-box');
const reactionElement = document.querySelector('#reaction');
/*-------------------------------- Variables --------------------------------*/
let loot = 0, eventNumber = 0;
let race, decision;
let texts = [
    ["As you are meandering down your path, you encounter a traveler.", 'Ignore.', 'Help.', 'Fight!', 'Ignore them. You are very shy after all… best not to make eye contact. You and the traveler give each other an up-nod as you pass. Nice.', 'Ask the traveler if they need help. It would be nice to have a companion if things go well.Hello friend, how are your travels? Need any help?” You say. “Well yes actually I was looking for a companion to help me find the nearest village. In fact, I`ll pay you! I`m very desperate. Take these 20 coins.” They give you 20 coins and you move along to the nearest village together.', 'Fight them! You could use some extra loot.', null, "loot", "death"],
    ['Thundering hooves signal approach; a sharp cry warns, "Bandits! You’ve got a choice, lad, and listen up closely, because I like repeating myself. Do you join these here bandits and increase your chances of loot or would you rather play it safe?"', 'Get out my way, choice giver, I’m taking this loot while I can!', 'I am carrying enough weight, I don’t need this on my conscience, I am going to move on.', 'I am going to wait it out here and see what happens.', "You're natural, kid! Ever thought of running for office?", 'I am going to wait it out here and see what happens.', "Nothing good can come of waiting’ ya gotta go out and take it! Caught between advancing forces and escaping raiders, you are killed in the collision.", "loot", "loot", "death"],
    ["As you walk along, the woods around you become thicker and thicker. The sky darkens... it appears you have entered the Woods of Darkness.", 'Turn around.', 'Go to southern part of woods.', 'Go to northern part of woods.', "'Fuck that.' You say. You decide to turn around and not risk it. You hurry back to the main path.", 'You decide to head south further into the woods. As you walk along, you come across a rusted old chest! You open it to find a glowing pair of boots. They look powerful. Nice loot acquiring!', "You decide to head north further into the woods. As you walk along, you find a hole in the ground. There's a bunch of gold in it.", null, "loot", "loot"],
    ["A wild snorlax appears on your adventure, blocking the entrance path to the mystical shop.", 'Poke him with your weapon.', 'Tell him a funny joke.', 'Squeeze past him!', 'You poke him with his mighty sword but all the snorlax sees is a tiny dude with a toothpick stabbing him and rolls on top of you going back to sleep.', '"A high elf, a wood elf, and a dark elf walked into a bar, BANG! A dwarf walks under it." Snorlax jolts up laughing and hands you a gold rock as tip for that wonderful joke.', 'You narrowly slip past the snorlax when they exhale, successfully making it to the shop.', "death", "loot", null],
    ["You enter the mystical shop. The hooded snakeshaped shop keeper asks, 'What do you want to purchase?", 'Take the free handout. (0 loot price)', 'Purchase a mystery item. (2 loot price).', 'Hand over all 4 adventure loot items to shop keeper.', 'You pick up a binding slave contract. You are now a slave to capitalism and are forced to work for the shop owner for the rest of your life.', 'You open a mystery box that contains an SSS rank item! You are now an SSS rank adventurer and can take on any challenge in your future!', 'You buy the whole shop and become the shopkeeper, the final boss of this adventure. Your final act is to raise the loot prices for any future wanderers to meet a pitiful end.', "victory", "victory", "victory"],
    
]

/*----------------------------- Event Listeners -----------------------------*/

buttonsElement.addEventListener('click', (event) => {
    decision = choiceHandler(event);
    reactionElement.innerText = texts[eventNumber][decision+3]
    
    switch (texts[eventNumber][decision+6]) {
        case "loot":
            loot++;
            lootElement.innerText = "Loot: " + loot;
    }
})

/*-------------------------------- Functions --------------------------------*/

function choiceHandler(event) {
    if (event.target.classList.contains('choice1')) {
        return 1;
    }
    else if (event.target.classList.contains('choice2')) {
        return 2;
    }
    else {
        return 3;
    }
}
function chooseRace(num) {
    if (decision === 1) {
        race = 'Dwarf';
    }
    else if (decision ===2) {
        race = 'Elf';
    }
    else {
        race = 'Human';
    }
        raceElement.innerText = "Race: " + race; 

}


/*-------------------------------- Notes --------------------------------*/
// restart button
// victory screen
// defeat screen
// read me page
// brand name & logo