// SOCKET EVENTS -
// --------------
// FEATURE: Rooms
// --------------
// CLIENT
// FOLDERS: /loading, /lobby
//
//  EMITTERS: ['crete room', 'join room']
//   emit('create room', {auth-token, joinCode}
//   emit('join room', {auth-token, joinCode}
//
//  LISTENERS: ['waiting room', 'match ready']
// 	on('waiting room', function(res, err) {state.go('/loading')});
// 	socket.once('match ready', function (res, err) {state.go('/battlefield')});
//
// SERVER
// FOLDERS:server/lobby/privateRoom.js
//
// 	EMITTERS: ['waiting room', 'match ready']
//     emit ('waiting room', {socketAPI.userModel})
//     emit('match ready')
//
// 	LISTENERS: ['create room', 'join room']
//     on('create room', function(res, err) {
//       // get auth-token and associate user with socket
//     })
//
//     on('join room', function(res, err) {
//       // get auth-token
//       // go to database and get user model
//       // store user property in socketAPI
//       // associate socket property with user and add join code value to socketAPI user object
//       // look up all 'create room' join codes and find match based on 'create room' events emitted from client
//       // .then emit('match ready, {join-code creator details: {name, picture}}
//       //  and associate user with socket and match join code with other user socket
//       // then when matched with other socket user emit 'match ready'
//     })
//
// ---------------
// FEATURE: Queue
// ---------------
// SERVER
// FOLDERS: server/server.js (!change), server/lobby/queue.js
//
// EMITTERS: ['added to queue', 'match ready']
//   emit('added to queue')
//   emit('match ready')
//
// LISTENERS: ['queue']
// 	on('queue', function(res, error) {
//     // associate user with socket
//     // attach userModel to SocketAPI
//     // match based on  mmr
//     // after matched emit('match ready')
// 	});
//
// CLIENT
// FOLDERS: /lobby, /loading
//
// EMITTERS: ['queue']
// 	emit('queue', {user-token})
//
// LISTENERS: ['added to queue', 'match ready']
// 	on('added to queue', function() { state.go('/loading') });
// 	on('match ready', function() { state.go('/battlefield') });
//
//
//


CREATE
createRoom



