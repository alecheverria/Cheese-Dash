var game;
var cursors;
var cheeses;
var score = 0;
var scoreText;

var mainMenu = {
    preload : function() {},
    create : function() {},
    update: function() {},
    render: function () {}
};
var mainState = {
    //loads all the assets
    preload : function() {
        game.load.image('player', 'images/mouse.png');
        game.load.image('bg', 'images/bkg.png');
        game.load.image('floor', 'images/floor.png');
		game.load.image('cheese', 'images/sexy-cheese2.png');
		game.load.image('ground', 'images/platform.png');
    },
    
	
	
    //adds it to the game
    create : function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //backgrounds and cheating floor
        this.bg = game.add.sprite(0,0, 'bg');
        this.floor = game.add.sprite (0 , game.world.height - 72, 'floor');
        game.physics.arcade.enable(this.floor);
        this.floor.body.immovable = true;
		this.floor.enableBody = true;
		
		//  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
		
		//  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;
                
        //player
        this.player = game.add.sprite(100, 300 ,'player');
        this.player.scale.setTo(0.3,0.3);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 600;
        this.player.body.collideWorldBounds = true;
        
        //controls
        cursors = game.input.keyboard.createCursorKeys();
        this.consecutiveJumps = 2;
        
		// cheeses
		//  Finally some cheeses to collect
		cheeses = game.add.group();

		//  We will enable physics for any cheese that is created in this group
		cheeses.enableBody = true;

		//  Here we'll create 12 of them evenly spaced apart
		for (var i = 0; i < 5; i++)
		{
			//  Create a cheese inside of the 'cheeses' group
			var cheese = cheeses.create(Math.floor((Math.random() * 800) + 1), 0, 'cheese');

			//  Let gravity do its thing
			cheese.body.gravity.y = 300;

			//  This just gives each cheese a slightly random bounce value
			cheese.body.bounce.y = 0.3 + Math.random() * 0.2;
		}
    // World Bounds
    game.world.setBounds(0, 0, 800, 600);
    
		
    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    
		// Game Camera
	    game.camera.follow(this.player);	
    },
    update: function() {
        
		function collectCheese (player, cheese) {
    
			// Removes the cheese from the screen
			cheese.kill();

			//  Add and update the score
			score += 1;
			scoreText.text = 'Score: ' + score;

		}
		
		this.player.body.velocity.x = 0;
        
        game.physics.arcade.collide(this.player, this.floor);
         //  Collide the player and the cheeses with the platforms
		game.physics.arcade.collide(this.player, platforms);
		game.physics.arcade.collide(cheeses, platforms);
		game.physics.arcade.collide(cheeses, this.floor);
		
		//  Checks to see if the player overlaps with any of the cheeses, if he does call the collectCheese function
		game.physics.arcade.overlap(this.player, cheeses, collectCheese, null, this);
 
        
        if (cursors.left.isDown){
            //  Move to the left
            console.log("left pressed");
            this.player.body.velocity.x = -650;

        }
        else if (cursors.right.isDown){
            //  Move to the right
            this.player.body.velocity.x = 150;

        } 
        if (cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -450;
        
        }
		
        
  
   },
	render: function () {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(this.player, 32, 500);

}
};

	
//initializing the game
game = new Phaser.Game(800,600, Phaser.AUTO,'gameDiv');

//gamestates
game.state.add('main', mainState);
game.state.add('mainMenu', mainMenu);

//start game
game.state.start('main');