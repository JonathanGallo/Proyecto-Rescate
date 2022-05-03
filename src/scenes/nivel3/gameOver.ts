import Phaser from 'phaser'
import { getPhrase } from '~/services/translation';

export default class gameOverCondor extends Phaser.Scene{
  private fuenteTexto =  {
    fontFamily: 'Titan One',
    fontSize: '50pt',
    color: '#FFBD0D',
    stroke: '#00572f',
    strokeThickness: 6,
  }
  private estadoMusica:any;
  private sonidoButton:any;
  public sfxDetenido()
  {
    this.sonidoButton.stop()
  }
  public sfxPlay()
  {
    this.sonidoButton.play({volume:0.5})
  }
  
  private musicaLose:any
  public musicaPlay()
  {
    this.musicaLose.play({volume:0.2})
  } 
  
  public detenerMusica()
  {  
    this.musicaLose.stop()            
  }
  constructor()
  {
    super('gameOverCondor');
  }

  preload(){
    this.load.image('loseCondor', 'assets/GameWinLose/loseCondor.png');
  }
  
  create()
  {
    this.sonidoButton = this.sound.add('sonidoBoton');
    this.musicaLose= this.sound.add('lose')
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    if (this.estadoMusica=='1') 
    {
      this.musicaPlay()
    }
      
    const gameLose = this.add.image(683, 384, 'loseCondor')
    
    this.add.text(550, 150, getPhrase('Derrota'), this.fuenteTexto)

    const buttonRestart = this.add.image(800, 520,  'botonReset')
    .setInteractive()
    .on('pointerover', () => buttonRestart.setScale(1.1))
    .on('pointerout', () => buttonRestart.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.stop('nivelCondor')
      this.scene.start('nivelCondor')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });

    const buttonMapa = this.add.image(600, 520, 'botonMapa')
    .setInteractive()
    .on('pointerover', () => buttonMapa.setScale(1.1))
    .on('pointerout', () => buttonMapa.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.stop('nivelCondor')
      this.scene.start('menuMapa')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });
  }

  update(){
  }
}

