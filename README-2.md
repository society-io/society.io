### Back-End:
The game's RESTful API is built with Node.js, Express, MongoDB, & Mongoose. Data is transferred between the client & server using Socket.io. The file structure for the back-end is as follows:

```
server
├── chat
|   ├── chat.js
|   ├── chatAPI.js
|
├── config
|   ├── config.js
|
├── db
|   ├── userModel.js
|
├── game
|   ├── config.js
|   ├── evalRound.js
|   ├── game.js
|   ├── listeners.js
|   ├── logic.js
|   ├── player.js
|
├── lobby
|   ├── lobby.js
|   ├── privateGame.js
|   ├── queue.js

├── profile
|   ├── updateProfile.js
|
├── routes
|   ├── leaderboard.js
|   ├── signin.js
|   ├── signup.js
|
├── socket
|   ├── socketAPI.js
|   ├── socketHelpers.js
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
    |── forfeit
	* EMITTERS
		|── game ready
		|── choices
  	|── newRound
    |── forfeitedResults
  	|── matchTerminated

logic.js
	* EMITTERS
		|── opponentPlayed
		|── roundResults
	  |── matchOver
    |── gameOver
```

#####/chat

```
chat.js
 * LISTENERS
   ├── chatAPI.js
 * EMITTERS
	 |── user joined
	 |── user left
   |── updated user list
   |── message
```

#####/lobby

```
lobby.js
	* LISTENERS
		|── who am i
	* EMITTERS
		|── you are
		|── avatar updated
  	|── avatar no updated

privateGame.js
	* LISTENERS
	  |── create private game
	  |── join private game
	  |── initialize battlefield
	  |── cancel private game
	* EMITTERS
	  |── join code valid
	  |── join code invalid
	  |── join code found
	  |── join code not found
    |── join code to initialize battlefield
    |── profile
    |── match ready

queue.js
	* LISTENERS
		|── queue
	* EMITTERS
		|── player already in queue
		|── added to queue
		|── profile
  	|── match ready
```
