# The Kitchen Table  

## Introduction  

The Kitchen Table is a React app that helps users schedule and join board game events as well as track their own collection of games.  
Users can also cancel events if they are the host for that event. They can also click on other user's names to their collections and bio.  
Users can also add new games to the database.

## Video Overview
<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/1a20de329d664f1bba4103551e421707" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

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

The Kitchen Table app was developed using these technologies:  

![HTML5](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Git](https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white) ![JSON Server](https://img.shields.io/badge/JSON_Server%20-%232a2e2a.svg?&style=for-the-badge&logo=JSON&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/VSCode%20-%23007ACC.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white)


## How to install and run the application

*First, a note about authentication...*
This application uses mock authentication which is purely for demonstration purposes. Therefore the login code written here is completely insecure and would never be implemented in a professional application.  

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
    Click the "Host this Event" button. If you are navigated to "Find Event" and see your newly created event in the "My Events" box under the "Hosting" header, go to step 11.  
11. Click "Logout" and create another user as outlined in Step 1. Then click "Find Event". "My Events" should say "No scheduled events". Under "Search for Events" you should  
    see the event you created in Step 10. Click the "Event Details" button attached to that event. Verify that you can click the game box or the any user's name for more details. 
    Available seats should equal the maximum players for the game selected, minus the number of players that have joined the event(host joins automatically). 
    If all the information is correct, click "Join Game". If the player list and number of available seats updated, click "Leave Game". If it updated again go to step 12.  
12. Create several users and add games to their collections. Create multiple events and join other user's events that you have created. Continue doing this until you have 5 - 10  
    events with different dates and playing different games. When you have done this, move to step 13.  
13. Click "Find Event" and use the radio buttons to search by game, date, and weight. Verify your search results. Clicking "Show All Events" should remove all search criteria.  
    Any events with no remaining seats available should have a red "FULL" tag on their listing. If all that works, move on to step 14.  
14. Under "My Events" click "Event Details" on an event you are hosting. On the "Event Details" box, click the "Cancel Event" button. If the event is removed from both "My Events"  
    and removed from "Search for Events" then congratulations, you've tested all features and the app is functioning properly.

## Difficulties & challenges during this project  

- Learning React routing and when to use Outlet
- Grouping fetch calls together to avoid async issues
- Refraining from interacting with the window object

## Project ERD


![The Kitchen Table](https://user-images.githubusercontent.com/114097612/236234366-1f86a599-4b32-44ac-9075-56c2126818f5.png)
