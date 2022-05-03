
import Phaser from 'phaser'
import { getPhrase } from '~/services/translation';

export default class pauseMono extends Phaser.Scene
{
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
    super('pauseMono');
  }

  preload(){
    this.load.image('pause', 'assets/Nivel1/popUpPause.png');
  }
  
  create()
  {
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    this.sonidoButton = this.sound.add('sonidoBoton');
    this.scene.get('nivelMono').musicaPause()
    const gamePause = this.add.image(683, 384, 'pause')
    this.add.text(580, 250, getPhrase('Pausa'), {
      fontFamily: 'Titan One',
      fontSize: '50pt',
      color: '#FFBD0D',
      stroke: '#00572f',
      strokeThickness: 6,
    })

    const buttonMapa = this.add.image(490, 440, 'botonMapa')
    .setInteractive()
    .on('pointerover', () => buttonMapa.setScale(1.1))
    .on('pointerout', () => buttonMapa.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.stop('nivelMono')
      this.scene.stop('uiMono')
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
      this.scene.stop('nivelMono')
      this.scene.start('nivelMono')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });  

    const buttonVolverJugar = this.add.image(890, 440, 'botonPlay')
    .setInteractive()
    .on('pointerover', () => buttonVolverJugar.setScale(1.1))
    .on('pointerout', () => buttonVolverJugar.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    {
      this.scene.stop()
      this.scene.resume('nivelMono')
      this.scene.resume('uiMono')
      this.scene.get('nivelMono').musicaResume()
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    })
    
  }

  update(){

  }
}