
import Phaser from 'phaser'
import { getPhrase } from '~/services/translation';

export default class pause extends Phaser.Scene{
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
  
  constructor()
  {
    super('pause');
  }

  preload()
  {
    this.load.image('pause', 'assets/Nivel1/popUpPause.png');
  }
  
  create()
  {
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    this.sonidoButton = this.sound.add('sonidoBoton');
    this.scene.get('nivelYaguarete').musicaPause()

    const gamePause = this.add.image(683, 384, 'pause')
    this.add.text(580, 250, getPhrase('Pausa'), this.fuenteTexto)

    const buttonMapa = this.add.image(490, 440, 'botonMapa')
    .setInteractive()
    .on('pointerover', () => buttonMapa.setScale(1.1))
    .on('pointerout', () => buttonMapa.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.stop('nivelYaguarete')
      this.scene.stop('ui')
      this.scene.start('menuMapa')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });

    const buttonRestart = this.add.image(690, 440,  'botonReset')
    .setInteractive()
    .on('pointerover', () => buttonRestart.setScale(1.1))
    .on('pointerout', () => buttonRestart.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.stop()
      this.scene.stop('nivelYaguarete')
      this.scene.start('nivelYaguarete')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });  

    const buttonVolverJugar = this.add.image(890, 440, 'botonPlay')
    .setInteractive()
    .on('pointerover', () => buttonVolverJugar.setScale(1.1))
    .on('pointerout', () => buttonVolverJugar.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
      this.scene.stop()
      this.scene.resume('nivelYaguarete')
      this.scene.resume('ui')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.get('nivelYaguarete').musicaResume()
    })
    
  }

  update(){

  }
}