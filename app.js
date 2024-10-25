// game has been wrapped in a function for restart functionality
const tmGame = () => {
	/*---------------------- Constants ----------------------*/
	const raceElement = document.querySelector("#race");
	const lootElement = document.querySelector("#loot");
	const promptElement = document.querySelector(".prompt");
	const reactionElement = document.querySelector("#reaction");
	const buttonsElement = document.querySelector("#buttons-box");
	const button1Element = document.querySelector(".choice1");
	const button2Element = document.querySelector(".choice2");
	const button3Element = document.querySelector(".choice3");

	/*---------------------- Variables ----------------------*/
	let loot = 0,
		eventNumber = 0;
	let race, decision;
	// array of arrays of strings to hold all of the prompt text, choice text, reaction text, and effect function
	// [prompt, choice1, choice2, choice3, reaction1, reaction2, reaction3, effect1, effect2, effect3]
	let texts = [
		[
			"Select a race.",
			"Dwarf.",
			"Elf.",
			"Human.",
			"You have selected Dwarf.",
			"You have selected Elf... nah you a tall dwarf.",
			"You have selected Human... BORRRRIING you are actually a sneaky dwarf.",
			"Dwarf",
			"Elf",
			"Human",
		],
		[
			"As you are meandering down your path, you encounter a traveler.",
			"Ignore.",
			"Help.",
			"Fight!",
			"Ignore them. You are very shy after all… best not to make eye contact. You and the traveler give each other an up-nod as you pass. Nice.",
			"You ask the traveler if they need help. It would be nice to have a companion if things go well.Hello friend, how are your travels? Need any help?” You say. “Well yes actually I was looking for a companion to help me find the nearest village. In fact, I`ll pay you! I`m very desperate. Take these 20 coins.” They give you 20 coins and you move along to the nearest village together.",
			"Fight them! You could use some extra loot. You leap in front of the traveler and brandish your weapon. “Fight me you bastard!” You yell. They leap back at you with their weapon. It`s a struggle, and the two of you are unevenly matched! You`re too short! The traveler sees an opening in your armor and slashes at it. It is a deep wound. You fall back, dazed! They have bested you! The traveler laughs and walks off. You see a bright light… it`s all over.",
			null,
			"loot",
			"death",
		],
		[
			'Thundering hooves signal approach; a sharp cry warns, "Bandits! You’ve got a choice, lad, and listen up closely, because I like repeating myself. Do you join these here bandits and increase your chances of loot or would you rather play it safe?"',
			"Get out my way, choice giver, I’m taking this loot while I can!",
			"I am carrying enough weight, I don’t need this on my conscience, I am going to move on.",
			"I am going to wait it out here and see what happens.",
			"You're natural, kid! Ever thought of running for office?",
			"I am going to wait it out here and see what happens.",
			"Nothing good can come of waiting’ ya gotta go out and take it! Caught between advancing forces and escaping raiders, you are killed in the collision.",
			"loot",
			"loot",
			"death",
		],
		[
			"As you walk along, the woods around you become thicker and thicker. The sky darkens... it appears you have entered the Woods of Darkness.",
			"Turn around.",
			"Go to southern part of woods.",
			"Go to northern part of woods.",
			"'Fuck that.' You say. You decide to turn around and not risk it. You hurry back to the main path.",
			"You decide to head south further into the woods. As you walk along, you come across a rusted old chest! You open it to find a glowing pair of boots. They look powerful. Nice loot acquiring!",
			"You decide to head north further into the woods. As you walk along, you find a hole in the ground. There's a bunch of gold in it.",
			null,
			"loot",
			"loot",
		],
		[
			"A wild snorlax appears on your adventure, blocking the entrance path to the mystical shop.",
			"Poke him with your weapon.",
			"Tell him a funny joke.",
			"Squeeze past him!",
			"You poke him with his mighty sword but all the snorlax sees is a tiny dude with a toothpick stabbing him and rolls on top of you going back to sleep.",
			'"A high elf, a wood elf, and a dark elf walked into a bar, BANG! A dwarf walks under it." Snorlax jolts up laughing and hands you a gold rock as tip for that wonderful joke.',
			"You narrowly slip past the snorlax when they exhale, successfully making it to the shop.",
			"death",
			"loot",
			null,
		],
		[
			"You enter the mystical shop. The hooded snakeshaped shop keeper asks, 'What do you want to purchase?' (If you do not have enough loot, you cannot see all three options)",
			"Take the free handout. (0 loot price)",
			"Purchase a mystery item. (2 loot price).",
			"Hand over all 4 adventure loot items to shop keeper.",
			"You pick up a binding slave contract. You are now a slave to capitalism and are forced to work for the shop owner for the rest of your life.",
			"You open a mystery box that contains an SSS rank item! You are now an SSS rank adventurer and can take on any challenge in your future!",
			"You buy the whole shop and become the shopkeeper, the final boss of this adventure. Your final act is to raise the loot prices for any future wanderers to meet a pitiful end.",
			"victory1",
			"victory2",
			"victory3",
		],
	];

	/*------------------- Event Listeners -------------------*/
	buttonsElement.addEventListener("click", (event) => {
		// Grabs choice and stores it in decision
		decision = choiceHandler(event);
		// Grabs correct response from text array
		reactionElement.innerText =
			"Consequence of previous choice: " +
			texts[eventNumber][decision + 3];

		// Handles effects of user's choices
		reactionHandler();

		// Transition to next event
		if (
			texts[eventNumber][decision + 6] !== "death" &&
			texts[eventNumber][decision + 6] !== "victory" &&
			eventNumber < texts.length - 2
		) {
			nextScene();
		}
		// Final boss code to show only the options the user has enough loot for
		else if (
			texts[eventNumber][decision + 6] !== "death" &&
			texts[eventNumber][decision + 6] !== "victory" &&
			eventNumber >= texts.length - 2
		) {
			nextScene();
			if (loot < 2) {
				button2Element.remove();
				button3Element.remove();
			} else if (loot < 4) {
				button3Element.remove();
			}
		}
	});

	/*---------------------- Functions ----------------------*/
	// Transistions through text array and assigns button text
	function nextScene() {
		eventNumber++;
		promptElement.innerText = texts[eventNumber][0];
		button1Element.innerText = texts[eventNumber][1];
		button2Element.innerText = texts[eventNumber][2];
		button3Element.innerText = texts[eventNumber][3];
	}
	// returns chosen button
	function choiceHandler(event) {
		if (event.target.classList.contains("choice1")) {
			return 1;
		} else if (event.target.classList.contains("choice2")) {
			return 2;
		} else {
			return 3;
		}
	}
	// Takes the appropriate reaction and handles that function
	function reactionHandler() {
		switch (texts[eventNumber][decision + 6]) {
			// Increases loot
			case "loot":
				loot++;
				lootElement.innerText = "Loot: " + loot;
				break;
			// Shows death screen
			case "death":
				promptElement.style.backgroundColor = "red";
				promptElement.innerText = "You died.";
				gameRestart();
				break;
			// Slave victory screen
			case "victory1":
				promptElement.style.backgroundColor = "lightgrey";
				promptElement.innerText = "Get back to work slave!";
				gameRestart();
				break;
			// Adventurer victory screen
			case "victory2":
				promptElement.style.backgroundColor = "gold";
				promptElement.innerText = "All bow down to your might!";
				gameRestart();
				break;
			// Final boss victory screen
			case "victory3":
				promptElement.style.color = "white";
				promptElement.style.backgroundColor = "black";
				promptElement.innerText = "You are now the final boss";
				gameRestart();
				break;
			// Chose Dwarf race
			case "Dwarf":
				raceElement.innerText = "Race: Dwarf";
				break;
			// Chose Elf race
			case "Elf":
				raceElement.innerText = "Race: Tall Dwarf";
				break;
			// Chose Human race
			case "Human":
				raceElement.innerText = "Race: Sneaky Dwarf";
				break;
		}
	}

	// game restart function
	const gameRestart = () => {
		// method learned from MDN weddocs: removeChild()
		while (buttonsElement.firstChild) {
			buttonsElement.removeChild(buttonsElement.firstChild);
		}
		const retryButton = document.createElement("button");
		retryButton.classList.add("btn");
		retryButton.innerText = "Try again?";
		buttonsElement.appendChild(retryButton);
        // location.reload must be wrapped in a single-instance function (https://stackoverflow.com/questions/67328296/)
		retryButton.onclick = function() {location.reload()};
	};
};

tmGame();

/*---------------------- Notes ----------------------*/
// read me page - not copied over yet
