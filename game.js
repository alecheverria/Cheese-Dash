var game;
var cursors;
var mainMenu = {
    preload : function() {},
    create : function() {},
    update: function() {}
};
var mainState = {
    //loads all the assets
    preload : function() {
        game.load.image('player', 'images/mouse.png');
        game.load.image('bg', 'images/bkg.png');
        game.load.image('floor', 'images/floor.png');
    },
    
    //adds it to the game
    create : function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //backgrounds and cheating floor
        this.bg = game.add.sprite(0,0, 'bg');
        this.floor = game.add.sprite (0 , game.world.height - 72, 'floor');
        game.physics.arcade.enable(this.floor);
        this.floor.body.immovable = true;
                
        //platforms
        this.player = game.add.sprite(100, 300 ,'player');
        this.player.scale.setTo(0.3,0.3);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        
        //controls
        cursors = game.input.keyboard.createCursorKeys();
        this.consecutiveJumps = 2;
        
        
        
    },
    update: function() {
        this.player.body.velocity.x = 0;
        
        game.physics.arcade.collide(this.player, this.floor);
        game
        
        if (cursors.left.isDown){
            //  Move to the left
            console.log("left pressed");
            this.player.body.velocity.x = -150;

        }
        else if (cursors.right.isDown){
            //  Move to the right
            this.player.body.velocity.x = 150;

        } 
        if (cursors.up.isDown)
            jump();
        
        
        
        
        

   },
       jump: function() {
            if (this.consecutiveJumps > 0 && this.player.body.touching.down) {  
                this.player.body.velocity.y = -350;
                this.consecutiveJumps --;
                if (this.consecutiveJumps = 1) {
                    this.player.body.velocity.y = -350;
                    this.consecutiveJumps = 0;
                }
                

            }
           this.consecutiveJumps = 2;
        }

};



//initializing the game
game = new Phaser.Game(800,600, Phaser.AUTO,'gameDiv');

//gamestates
game.state.add('main', mainState);
game.state.add('mainMenu', mainMenu);

//start game
game.state.start('main');