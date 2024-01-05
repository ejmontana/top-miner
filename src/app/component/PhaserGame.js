// PhaserGame.js
import React, { useEffect } from 'react';
import Phaser from 'phaser';

const PhaserGame = () => {
  useEffect(() => {
    // Lógica de inicialización de Phaser aquí

    // Ejemplo básico para crear un juego
    var platforms;
    var player;



    const config = {
      type: Phaser.AUTO,
      width: 1200,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
      scene: {
        
        preload: function () {
          // Lógica de precarga de recursos
          this.load.image('sky', 'assets/sky.png');
          this.load.image('ground', 'assets/platform.png');
          this.load.image('star', 'assets/star.png');
          this.load.image('bomb', 'assets/bomb.png');
          this.load.spritesheet('dude', 
              'assets/dude.png',
              { frameWidth: 32, frameHeight: 48 }
          );
        },
        create: function () {
          // Lógica de creación del juego
          this.add.image(400, 300, 'sky');
          this.add.image(400, 300, 'star');

         

          platforms = this.physics.add.staticGroup();
      
          platforms.create(400, 568, 'ground').setScale(2).refreshBody();
      
          platforms.create(600, 400, 'ground');
          platforms.create(20, 100, 'ground');

          platforms.create(50, 250, 'ground');
          platforms.create(750, 220, 'ground');


          //player 
          player = this.physics.add.sprite(100, 450, 'dude');

          player.setBounce(0.2);
          player.setCollideWorldBounds(true);

          
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: [ { key: 'dude', frame: 4 } ],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });
      

        },
        update: function () {
          // Lógica de actualización del juego
        },
      },
    };

    const game = new Phaser.Game(config);

    // Limpieza al desmontar el componente
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-container"></div>;
};

export default PhaserGame;
