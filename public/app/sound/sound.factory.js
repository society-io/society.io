angular
  .module('app')
  .factory('soundFactory', soundFactory);

  soundFactory.$inject = ['SoundService'];

  function soundFactory(SoundService) {

    var chat = {name: 'chat', src: '../../soundEffects/chat.mp3'};
    var click = {name: 'click', src: '../../soundEffects/click.mp3'};
    var confirm = {name: 'confirm', src: '../../soundEffects/confirm.mp3'};
    var damage = {name: "damage", src: '../../soundEffects/damage.mp3'};
    var death = {name: "death", src: '../../soundEffects/death.mp3'};

    return {
      loadSounds: loadSounds,
      playChat: playChat,
      playClick: playClick,
      playConfirm: playConfirm,
      playDamage: playDamage,
      playDeath: playDeath
    };

    function loadSounds() {
      SoundService.loadSound(chat);
      SoundService.loadSound(click);
      SoundService.loadSound(confirm);
      SoundService.loadSound(damage);
      SoundService.loadSound(death);
    }

    function playChat() {
      console.log('message sent!');
      SoundService.getSound(chat.name).start();
    }

    function playClick() {
      console.log('something clicked!');
      SoundService.getSound(click.name).start();
    }

    function playConfirm() {
      console.log('user confirmed!');
      SoundService.getSound(confirm.name).start();
    }

    function playDamage() {
      console.log('opponent choice took damage!');
      SoundService.getSound(damage.name).start();
    }

    function playDeath() {
      console.log('opponent choice died!');
      SoundService.getSound(death.name).start();
    }

  }
