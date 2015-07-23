var game;
var mainMenu = {
    preload : function() {},
    create : function() {},
    update: function() {}
};
var mainState = {};



//initializing the game
game = new Phaser.Game(800,600, Phaser.AUTO,'gameDiv');

//gamestates
game.state.add('main', mainState);
game.state.add('mainMenu', mainState);

//start game
game.state.start('mainMenu');