# The Kitchen Table  

## Introduction  

The Kitchen Table is a React app that helps users schedule and join board game events as well as track their own collection of games.  
Users can also cancel events if they are the host for that event. They can also click on other user's names to their collections and bio.  
Users can also add new games to the database.

## Purpose and motivation for project  

The purpose of The Kitchen Table is to make it easier for people to schedule and play board games with friends.  
The motivation behind this project is the love of playing board games with friends, but finding it difficult to schedule events at times.  

## How does this application work?  

The Kitchen Table app has several features that make scheduling and tracking board game events easier:  

- Schedule events: Users can schedule board game events by selecting a date, time, location, and game to play. It will then be visible to other users.  
- Join events: Users can search all active events by date, by game played, or by weight/complexity. They can join any event that is not full and they are not already involed in.  
- Track game collection: Users can add board games to their personal collection and keep track of which games they own.  
- Users can add new games to the database  

## How was this application developed?  

The Kitchen Table app was developed using React. The app uses a JSON server to store data, and it communicates with the server using the Fetch API.  

## How to install and run the application

1. Download and install the latest version of node.js from nodejs.org.  
2. Clone the repository to your local machine.  
3. Clone the companion JSON server repository to your local machine from https://github.com/Nic-Lahde/nic-lahde-front-end-capstone-API
3. Open a terminal window and navigate to the server directory.  
4. Run the server using the command 'json-server database.json -p 8088 -w' and leave it running as long as the app is active. It can be closed with Ctrl+c.
5. Open a second new terminal and navigate to the project directory.  
6. Install the dependencies by running the command 'npm install'  
7. Start the app using the command 'npm start' and a new browser window with the app will open. It can be closed with Ctrl+c in the terminal.  

## Testing the functionality of the app  
1. Run the app and server as directed in the previous section. Click "Not a member yet?". Enter a name, email, and bio information and click register.  
   If you see a message that says "Welcome to the Kitchen Table" then move on to step 2.  
2. Click "Profile" on the top left of the app. If the user's name, email, and About Me are displayed then move on to step 3.  
3. In the box labeled "Edit about me:" Change the text to something else and then click the "Update Profile" button below.  
   Click "My Games" and then click "Profile" again. If the "About Me:" text has the changes you made, move on to step 4.  
4. Click the "Delete My Account" button. When the dialogue box pops up, click Delete My Account.  
   If you are returned to the login page and your login no longer works(you deleted it) move on to step 5.  
5. Repeat step 1 to create a new account and then click "MyGames". Click "Select a Game". If a list of games appears, move on to step 6.  
6. Choose any game from "Select a game" and then click "Add to Collection". Do this several times. If each game you add appears in the "My Collection" box, move on to step 7.  
7. Click any game in the "My Collection" box. If a pop up appears with a larger image and a brief description of the game, move on to step 8.  
8. Click the "Delete" button next to any game in the "My Collection" box. If it's removed from "My Collection" move on to step 9.
9. Above the "My Collection" box, click "Game not listed here? Add it!" and then fill out the form.  
   NOTICE: It is recommended to input real game information, as it cannot be removed from the server through the app.  
   Click "Create game and add to my collection". If you are navigated back to "My Games" and the new game is in your collection, move on to step 10.  
10. Click "Host Event" and enter a date and time after todays date, any location, and select a game. The game choices should only be those in your collection.  
    Click the "Host this Event" button. If you are navigated to "Find Event" And see your newly created event in the "My Events" box under the "Hosting" header, go to step 11.  
    


## Difficulties & challenges during this project  

- Learning React routing and when to use Outlet
- Grouping fetch calls together to avoid async issues
- Refraining from interacting with the window object
