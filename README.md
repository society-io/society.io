# Society: The Game

A modern take on rock paper scissors where players battle it out in a game of wits, dashed with a pinch of luck.

## Overview

**_Society_** is a fun multiplayer experience for all ages that brings the childhood concept of "Rock, Paper, Scissors" to a whole *new* level.

Built upon the [**iteration**](http://www.samkass.com/theories/RPSSL.html) of the "Rock, Paper, Scissors" by software developer **Sam Kass**, which was featured in the CBS hit-comedy [**"The Big Bang Theory"**](https://www.youtube.com/watch?v=x5Q6-wMx-K8), the game adds a satirical theme with familiar elements from our society: “**Rich**”, “**Bum**”, “**Cop**”, “**Tax**”, & “**Jail**”.

Players must predict their opponent’s choices based on a Health-Points system attached to each option.

The health-points of an option declines once it is overcome by the opponent's *superior* choice.

As these points reach zero, that option will be disabled, & the player must choose the next option with much more care than before.

Society allows its players to invite friends into **Private Games**, *or*, they may choose to join a **Public Queue**, which matches each player according to their skill level (**Match-Making Rating**).

When a player enters this Public Queue, they must battle opponents & climb to the top of Society's **Leaderboard**.


## Play Online

1. Visit **http://societyapp.io/**

2. Click "**Sign Up**" & Fill In the *Required* Fields

3. When You Enter the Lobby, Click on "**Tutorials**" & Read the Rules

4. **Play S O C I E T Y!**


## Play Locally

1. Fork & Clone This Repo

2. In Your Terminal, Within the Root Directory: Type "**npm install**"

3. In Your Terminal, Within the Root Directory: Type "**bower install**"

4. Open One More Tab in Terminal: Type "**mongod**"

5. In the First Tab: Type "**npm start**"

6. Visit **http://localhost:8080/**

7. Click "**Sign Up**" & Fill in the *Required* Fields

8. When You Enter the Lobby, Click on "**Tutorials**" & Read the Rules

9. **Play S O C I E T Y!**

## Developer Documentation

### Tools Used:

* [**M**ongoDB](https://www.mongodb.org/)
* [**E**xpress](http://expressjs.com/)
* [**A**ngularJS](https://angularjs.org/)
* [**N**ode](https://nodejs.org/)
* [Socket.io](http://socket.io/)

### To Contribute:

* Fork & Locally Clone Repo

* Ensure MongoDB is installed. If not, install Globally: `brew install mongod -g`

* Start a MongoDB instance: `mongod`

* Install Server & Client Dependencies: `npm install` & `bower install`

* Run the App on Local Server: `npm start`

* Visit  http://localhost:8080/

**Explanation of Files**
The front-end files reside inside of the public/ directory inside the project root folder. The `.js` files reside inside of `/app`, and the styles are located inside of `styles`.

The back-end files reside inside of the server/ directory inside the project root folder.

### Front-End (AngularJS):
---
The game's Front-End implements the Angular.js Framework in accordance to John Papa's style guide. Thus, the file structure is organized as such:

```
app
├── about
|   ├── about.controller.js
|   └── about.html
|
├── auth
|   ├── auth.conroller.js
|   ├── auth.factory.js
|   └── auth.html
|   
├── battlefield
|   ├── battlefield.controller.js
|   ├── battlefield.factory.js
|   ├── battlefield.html
|   ├── battlefieldLogic.factory.js
|   └── battlefieldTimer.factory.js
| 
├── lobby
|   ├── chat.factory.js
|   ├── lobby.controller.js
|   ├── lobby.factory.js
|   ├── lobby.html
|   ├── lobbyListeners.factory.js
|   └── stats.factory.js
| 
├── shared
|   └── socket.factory.js
| 
├── sound
|   └── sound.factory.js
| 
├── ui-router
|   └── app.config.js
| 
├── waiting
|   ├── waiting.controller.js
|   ├── waiting.factory.js
|   ├── waiting.html
|   └── waitingListeners.factory.js
| 
├── app.controller.js
└── app.module.js
```

#### Separation of Concerns Across Angular Modules

In general, the angular modules are separated by concern:

* `.html` pages are responsible for rendering the view upon digest  
* Controllers attach and expose functions to be invoked in the view  
* Factories by default act as data stores and the manipulation of the data occurs exclusively through getters and setters  
* Factories that are named with 'Listeners' in the name include socket event listeners that then manipulate the associated data stores
* Other misc. factory names are specific to that particular use case, typically serving a singular purpose.

#### Socket Events

The full spectrum of front-end/back-end socket events are described in the back-end documentation below.

### Front-End (Styles):
---
The front-end styling is written with SASS css-precompiler, using the SCSS syntax. By employing SCSS's @import directive, the code is modularized in the following way:

```
styles
├── dashboard
|   ├── _adminBar.scss
|   ├── _layout.scss
|   ├── _userProfile.scss
|   └── _chat.scss
|
├── game
|   ├── _animations.scss
|   ├── _emotes.scss
|   ├── _layout.scss
|   ├── _overlay.scss
|   ├── _playerStats.scss
|   ├── _playingField.scss
|   ├── _sideControls.scss
|   ├── _spinner.scss
|   └── _tiles.scss
|
├── vendor
|   ├── _bootstrapGrid.scss
|   └── _noramlize.scss
|
├── waiting
|   ├── _layout.scss
|   └── _players.scss
|
├── _about.scss
├── _animations.scss
├── _auth.scss
├── _buttons.scss
├── _globals.scss
├── _layout.scss
├── _mixins.scss
├── _typography.scss
└── style.scss
```

#### Media Queries

Individual media queries are separated and associated only with corresponding components instead of grouping them into big blocks of media query CSS rules for many elements. This way, we are able to achieve a semantic, pragmatic separation of concerns in our stylesheets. For example:

```
.code-input {
  padding: 13px;
  width: 50%;

  @include bp(pawn) {
    width: 60%;
  }

  @include bp(knight) {
    width: 75%;
  }

  @include bp(queen) {
    width: 55%;
  }

  @include bp(king) {
    width: 64%;
  }
}
```

Have a look at the `_mixins.scss` file for further information.

### Back-End:
---
The game's RESTful API is built with Node.js, Express, MongoDB, & Mongoose. Data is transferred between the client & server using Socket.io. The file structure for the back-end is as follows:

```
server
├── chat
|   ├── chat.js
|   └── chatAPI.js
|
├── config
|   └── config.js
|
├── db
|   └── userModel.js
|
├── game
|   ├── config.js
|   ├── evalRound.js
|   ├── game.js
|   ├── listeners.js
|   ├── logic.js
|   └── player.js
|
├── lobby
|   ├── lobby.js
|   ├── privateGame.js
|   └── queue.js
|
├── profile
|   └── updateProfile.js
|
├── routes
|   ├── leaderboard.js
|   ├── signin.js
|   └── signup.js
|
├── socket
|   ├── socketAPI.js
|   └── socketHelpers.js
|
├── common.js
└── server.js
```

#### Server
The server is built using Node.js and Express. The Express server is created first and then passed into Socket.io as parameter. When the application is started the listen() function activates both the Express and socket server. After the player is successfully authenticated the client sends an io.connect() event to the server and upon success the communication protocol is upgraded from http to web sockets and control is passed to the Socket.io server, which is then used to manage all client requests throughout the application there forward.

#### Database
The Mongo database is used to store player profile information (see user model below). Upon game completion the player's MMR is updated to reflect their game result and their position on the leader board.

#### Schema
 Player {
  email: String,
  username: String,
  password: String,
  avatar: String,
  mmr: Number,
  wins: Number,
  losses: Number
 }

### SocketAPI
The SocketAPI constructor is used through the backend code to associate the connection initiated by the user's web browser within the socket's stream. The SocketAPI object extends the Socket.io Socket constructor by providing additional properties and methods to access and update the connected player's profile information and communicate state changes to the Express server and Mongo database.

### EndPoints

#### Express API EndPoints
* /signup - used to store new players in Mongo db, as well as authenticate and authorize them to enter the site
* /signin - used to authenticate and authorize player to enter the game
* /leaderboard - used to get a list of all players from Mongo database and then sort them based on MMR rank to display the
   leader board

#### Socket Connection End Points
* All listeners are initialized upon client connection through the SocketAPI's init() method.

#####/game
```
game.js
  * LISTENERS
    |── client ready
    |── choice
    |── noChoice
    └── forfeit
  * EMITTERS
    |── game ready
    |── choices
    |── newRound
    |── forfeitedResults
    └── matchTerminated

logic.js
  * EMITTERS
    |── opponentPlayed
    |── roundResults
    |── matchOver
    └── gameOver
```

#####/chat

```
chat.js
 * LISTENERS
   └── chatAPI.js
 * EMITTERS
   |── user joined
   |── user left
   |── updated user list
   └── message
```

#####/lobby

```
lobby.js
  * LISTENERS
    └── who am i
  * EMITTERS
    |── you are
    |── avatar updated
    └── avatar no updated

privateGame.js
  * LISTENERS
    |── create private game
    |── join private game
    |── initialize battlefield
    └── cancel private game
  * EMITTERS
    |── join code valid
    |── join code invalid
    |── join code found
    |── join code not found
    |── join code to initialize battlefield
    |── profile
    └── match ready

queue.js
  * LISTENERS
    └── queue
  * EMITTERS
    |── player already in queue
    |── added to queue
    |── profile
    └── match ready
```

## Founding Team
* [Austin Kim](https://github.com/austinyearlykim) (**Product Owner**)
* [Kan Adachi](https://github.com/obber) (**Scrum Master**)
* [Ben Richter](https://github.com/bjr22) (**Front-End**)
* [Patrice Sandhu](https://github.com/pmsandhu) (**Full-Stack**)
* [Neil Agarwal](https://github.com/neilDeep) (**Back-End**)
