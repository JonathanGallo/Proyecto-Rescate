import Phaser from 'phaser'
import { getPhrase } from '~/services/translation';

export default class info extends Phaser.Scene
{
  private estadoMusica:any;
  private fuenteTexto = 
  {
    fontFamily: 'Titan One',
    fontSize: '50pt',
    color: '#FFBD0D',
    stroke: '#00572f',
    strokeThickness: 6,
  } 
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
    super('informacion');
  }
  
  preload()
  {  
  }

  create()
  {
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    this.sonidoButton = this.sound.add('sonidoBoton');    
    const fondoMenu = this.add.image(683, 384, 'menuInfo').setScale(0.72);
    this.add.text(380, 100, getPhrase('INFORMACIÓN'), {
      fontFamily: 'Titan One',
      fontSize: '60pt',
      color: '#FFBD0D',
      stroke: '#00572f',
      strokeThickness: 6,
    })

    const teclaAyuda = this.add.text(250, 350, getPhrase('AYUDA'), this.fuenteTexto)
    .setInteractive()
    .on('pointerover', () => teclaAyuda.setScale(1.1))    
    .on('pointerout', () => teclaAyuda.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('ayuda')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });

    const teclaCreditos = this.add.text(800, 350, getPhrase('CRÉDITOS'), this.fuenteTexto )
    .setInteractive()
    .on('pointerover', () => teclaCreditos.setScale(1.1))
    .on('pointerout', () => teclaCreditos.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('credit2')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });

    const teclaIdioma = this.add.text(500, 550, getPhrase('IDIOMAS'), this.fuenteTexto)
    .setInteractive()
    .on('pointerover', () => teclaIdioma.setScale(1.1))    
    .on('pointerout', () => teclaIdioma.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('idioma')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });

    const buttonAtras = this.add.image(1260, 105, 'botonatras')
    .setInteractive()
    .on('pointerover', () => buttonAtras.setScale(1.1))
    .on('pointerout', () => buttonAtras.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('menuPpal')
      this.scene.get('menuPpal').detenerMusica()
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    })
  }
}