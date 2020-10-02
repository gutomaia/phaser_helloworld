import * as Phaser from 'phaser';
import { uiWidgets } from 'phaser-ui-tools';


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};
  

  
  
  class Button {
    private scene: Phaser.Scene;
    private name: string;
    private button: Phaser.GameObjects.Image;
    private highlight: Phaser.GameObjects.Image;
    private selected: Phaser.GameObjects.Image;
  
    constructor(scene: Phaser.Scene, name: string) {
      this.scene = scene;
      this.name = name
    }
  
    public loader() {
      this.scene.load.image(this.name, 'assets/UI/General/${this.name}.png')
      this.scene.load.image('${this.name}_highlighted', 'assets/UI/General/${this.name}_Highlighted.png')
      this.scene.load.image('${this.name}_selected', 'assets/UI/General/${this.name}_Selected.png')
  
    }
  
    public creator(x: integer, y:integer) {
      this.button = this.scene.add.image(x, y, '${this.name}').setOrigin(0,0).setDepth(10);
      this.selected = this.scene.add.image(x, y, '${this.name}_selected').setOrigin(0,0).setDepth(8);
      this.highlight = this.scene.add.image(x, y, '${this.name}_highlighted').setOrigin(0,0).setDepth(8);
    }
  
  }
  
  
  export class GameScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    private menuGrey: Phaser.GameObjects.Image;
    private button: Phaser.GameObjects.Image;
    private button_selected: Phaser.GameObjects.Image;
    private b2: Button;
  
    private textSprite: uiWidgets.TextSprite;
    private particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    private menu: uiWidgets.ViewPort;
    // private button:
  
    constructor() {
      super(sceneConfig);
    }
  
    public preload() {
      this.load.image('button_blue', 'assets/UI/General/Button_Blue.png')
      this.load.image('button_blue_highlighted', 'assets/UI/General/Button_Blue_Highlighted.png')
      this.load.image('button_blue_selected', 'assets/UI/General/Button_Blue_Selected.png')
      this.load.image('menu_grey', 'assets/UI/General/Menu_Grey.png')
  
      this.b2 = new Button(this, 'Button_Blue');
      this.b2.loader();
      this.textSprite = new uiWidgets.TextSprite(this.game, 100, 100, sceneConfig.key);
    }
  
    public createMenu() {
      // var viewport = new uiWidgets.Viewport(this.game, 75, 75, 600, 260);
      // this.menu = new uiWidgets.ViewPort(this, 75, 75, 600, 200);
    }
  
  
    public create() {
      this.createMenu();
      this.scale.scaleMode = Phaser.Scale.FIT;
  
      // this.scale.setUserScale(scaleFactor,scaleFactor);
      // // Set the callback for size changes
      // game.scale.setResizeCallback(function(scale,parentrectangle){
  
      //         // On resize event I calc the new scaleFactor
      //         scaleFactor = box.clientHeight / game.height;
  
      //         //Applying the same scale to the height and width the proportion is
      //         //maintained
      //         game.scale.setUserScale(scaleFactor, scaleFactor);
  
      //         //This can happen with orientation changes
      //         if (windowWidth > game.width*scaleFactor) {
      //             game.scale.pageAlignHorizontally = true;
      //         }
      // },this);
  
  
      this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
      this.physics.add.existing(this.square);
      this.add.image(100, 100, 'button_blue_highlighted').setOrigin(0,0);
      // this.add.image(100, 100, 'button_blue_selected').setOrigin(0,0);
      // this.menuGrey = this.add.image(100, 100, 'menu_grey').setOrigin(0,0).setDepth(1);
      this.button = this.add.image(100, 100, 'button_blue').setOrigin(0,0).setDepth(10);
  
      this.b2.creator(100, 200);
  
  
      this.button.setInteractive();
  
      this.button.on("pointerover", () => {
        console.log("pointer over");
        this.button.setDepth(9);
        // this.button.visible = false;
      })
  
      this.button.on("pointerout", () => {
        // this.button.visible = true;
        console.log("pointer out");
      })
  
      this.button.on("pointerup", () => {
        console.log("pointer up")
      })
  
  
      this.particles = this.add.particles('button_blue');
      this.emitter = this.particles.createEmitter(
        {
          speed: 100,
          scale: {start: 1, end: 0},
          blendMode: 'ADD'
        }
      )
  
      let loadingBar = this.add.graphics({
        fillStyle: {
          color:0xffffff
        }
      })
      console.log('start');
      this.load.on("progress", (percent) => {
        console.log('percent');
      })
  
      // this.load.on("progress", (percent)=>{
      //   loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50 );
      //   console.log(percent);
  
      // })
    }
  
    public update() {
      const cursorKeys = this.input.keyboard.createCursorKeys();
      if (cursorKeys.up.isDown) {
        this.square.body.setVelocityY(-500);
      } else if (cursorKeys.down.isDown) {
        this.square.body.setVelocityY(500);
      } else {
        this.square.body.setVelocityY(0);
      }
  
      if (cursorKeys.right.isDown) {
        this.square.body.setVelocityX(500);
      } else if (cursorKeys.left.isDown) {
        this.square.body.setVelocityX(-500);
      } else {
        this.square.body.setVelocityX(0);
      }
    }
  }
  
  export class TitleScene extends Phaser.Scene {
    public preload() {
  
    }
  
    public create() {
  
    }
  
    public update() {
  
    }
  
  }
  