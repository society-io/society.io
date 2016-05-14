angular
  .module('app')
  .factory('soundFactory', soundFactory);

  soundFactory.$inject = [];

  function soundFactory() {

    var chat = "chat";
    var click = "click";
    var confirm = "confirm";
    var damage = "damage";
    var death = "death";

    return {
      loadSound: loadSound,
      playChat: playChat,
      playClick: playClick,
      playConfirm: playConfirm,
      playDamage: playDamage,
      playDeath: playDeath
    };

    function loadSound() {
      createjs.Sound.registerSound({src:"../../soundEffects/chat.mp3", id:chat});
      createjs.Sound.registerSound({src:"../../soundEffects/click.mp3", id:click});
      createjs.Sound.registerSound({src:"../../soundEffects/confirm.mp3", id:confirm});
      createjs.Sound.registerSound({src:"../../soundEffects/damage.mp3", id:damage});
      createjs.Sound.registerSound({src:"../../soundEffects/death.mp3", id:death});
    }

    function playChat() {
      console.log('message sent!');
      createjs.Sound.play(chat);
    }

    function playClick() {
      console.log('something clicked!');
      createjs.Sound.play(click);
    }

    function playConfirm() {
      console.log('user confirmed!');
      createjs.Sound.play(confirm);
    }

    function playDamage() {
      console.log('opponent choice took damage!');
      createjs.Sound.play(damage);
    }

    function playDeath() {
      console.log('opponent choice died!');
      createjs.Sound.play(death);
    }

  }
