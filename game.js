var game;
var mainMenu = {
    preload : function() {},
    create : function() {},
    update: function() {}
};
var mainState = {
    //loads all the assets
    preload : function() {
        game.load.image('player', 'images/tempPlatform.png');
    },
    
    //adds it to the game
    create : function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //platforms
        this.player = game.add.sprite(100, 500 ,'player');
        this.player.scale.x = 0.3; 
        this.player.scale.y = 0.5;
        game.physics.arcade.enable(this.player);
        this.player.body.colliderWorldBounds = true;
        
        //controls
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            up.onDown.add(this.jump,this);
        
    },
    update: function() {
        if (this.player.body.y >= game.world.height- this.player.height ) {
            this.player.body.velocity.y = 0;
            this.player.body.gravity.y = 0;
        } else {
            this.player.body.gravity.y = 800;

        }
    },
    
    jump: function() {
        var consecutiveJumps = 2;
        if (consecutiveJumps > 0) {
            this.player.body.velocity.y = -300;
            consecutiveJumps --;
        } else if (consecutiveJumps === 0) {
            
        }
        
    }
};



//initializing the game
game = new Phaser.Game(800,600, Phaser.AUTO,'gameDiv');

//gamestates
game.state.add('main', mainState);
game.state.add('mainMenu', mainMenu);

//start game
game.state.start('main');