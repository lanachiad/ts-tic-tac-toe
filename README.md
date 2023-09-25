# Tic Tac Toe Challenge
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## How To Run
`yarn install`
- Install node dependencies, including `axios`.

`yarn run`
- Run the program locally in your preferred browser at `http://localhost:3000/`.


## Approach
This project was broken down to two major criteria: Login and Game. 

The Login portion handle email validation from a HTML usability level, ensuring only emails can be submitted in the Login screen. Email validation can be handled by ensuring an `@` symbol requirement. Upon API success, the response token is stored in the session storage. 

A validation handler I would've liked to implement was to also include a timestamp of when the token is created and have a validation "timer" so to ensure the token is valid only for X amount of time. In its current state, the login validation persists until the user logs out. 

The Game portion handles the array of arrays of which our board is comprised (and the data format that is consumed by the Game API). The board is made up of buttons that represent each square of the tic-tac-toe board. Upon user input and AI response, the button values update to reflect the current state of the game. 

I ran out of time solidifying the game logic that lives in the game component. In retrospect, I could've pulled that logic out into a separate Game Logic file that runs game validations and returns a `true` or `false` boolean response to the Game component. Regardless, there is an async issue with the game response and validation -- I think leveraging `useEffect()` here would help catch the Draw state before thrown back through the Game API and thus resulting in a React error. The Draw check would be done before any other game validation is done so to stop the game from continuing (and well before we send data to the Game API again).

I also ran out of time implementing the hover state where hovering over a cell would highlight the row and column that cell belonged to. The way I could think of implementing this would be to target the value/Ids of each cell and add a CSS class that would bold the buttons above, around, and below any particular cell in the hover state. So each row has a row ID identified as the parent node, and each cell above and below that cell ID would have that CSS class added and removed (toggled) on hover.

Thank you for the opportunity to work on this challenge! It was really fun and was a great refresher in algorithms! :) 