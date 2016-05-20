# Society: The Game

# Table of Contents

## Overview

**_Society_** is a fun multiplayer experience for all ages that brings the childhood concept of "Rock, Paper, Scissors" to a whole *new* level.

Built upon the [**iteration**](http://www.samkass.com/theories/RPSSL.html) of the "Rock, Paper, Scissors" by software development leader **Sam Kass**, which was featured in the CBS hit-comedy [**"The Big Bang Theory"**](https://www.youtube.com/watch?v=x5Q6-wMx-K8), the game adds a satirical theme with familiar elements from our society: “**Rich**”, “**Bum**”, “**Cop**”, “**Tax**”, & “**Jail**”.

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

### Explanation of files:

The majority of the front-end files 

#### Front-End (AngularJS):
The game's Front-End implements the Angular.js Framework in accordance to John Papa's style guide. Thus, the file structure is organized as such:

```
app
├── about
|   ├── about.controller.js
|   ├── about.html
|
├── auth
|   ├── auth.conroller.js
|   ├── auth.factory.js
|   ├── auth.html
|   
├── battlefield
|   ├── battlefield.controller.js
|   ├── battlefield.factory.js
|   ├── battlefield.html
|   ├── battlefieldLogic.factory.js
|   ├── battlefieldTimer.factory.js
| 
├── lobby
|   ├── chat.factory.js
|   ├── lobby.controller.js
|   ├── lobby.factory.js
|   ├── lobby.html
|   ├── lobbyListeners.factory.js
|   ├── stats.factory.js
| 
├── shared
|   ├── socket.factory.js
| 
├── sound
|   ├── sound.factory.js
| 
├── ui-router
|   ├── app.config.js
| 
├── waiting
|   ├── waiting.controller.js
|   ├── waiting.factory.js
|   ├── waiting.html
|   ├── waitingListeners.factory.js
| 
├── app.controller.js
└── app.module.js
```

##### App Config
---

##### Views
---

##### Controllers
---

##### Factories
---


#### Back-End:
The game's RESTful API is built with Node.js, Express, MongoDB, & Mongoose.

Data is transferred between the client & server using Socket.io.

##### Server
---

##### Database
---


## Founding Team
* [Austin Kim](https://github.com/austinyearlykim) (**Product Owner**)
* [Kan Adachi](https://github.com/obber) (**Scrum Master**)
* [Ben Richter](https://github.com/bjr22) (**Front-End**)
* [Patrice Sandhu](https://github.com/pmsandhu) (**Back-End**)
* [Neil Agarwal](https://github.com/neilDeep) (**Back-End**)
