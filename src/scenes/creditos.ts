import Phaser from 'phaser'
import { getPhrase } from '~/services/translation'
export default class creditos extends Phaser.Scene
{
  private estadoMusica:any;
  private fuenteTexto = {
    fontFamily: 'Titan One',
    fontSize: '30pt',
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
    super('credit2');
  }

  preload(){ }

  create()
  {
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    this.sonidoButton = this.sound.add('sonidoBoton');
    const fondoMenu = this.add.image(683, 384, 'menuCreditos').setScale(0.72);

    const buttonAtras = this.add.image(1260, 105, 'botonatras')
    .setInteractive()
    .on('pointerover', () => buttonAtras.setScale(1.1))
    .on('pointerout', () => buttonAtras.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('informacion')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    })    

    this.add.text(500, 50, getPhrase('CRÉDITOS'), {
      fontFamily: 'Titan One',
      fontSize: '60pt',
      color: '#FFBD0D',
      stroke: '#00572f',
      strokeThickness: 6,
    })

    this.add.text(520, 610 , 'Gallo, Jonathan', this.fuenteTexto)
    this.add.text(95, 400, 'Castelnovo, Renzo', this.fuenteTexto)
    this.add.text(935, 400, 'Baldi, Santiago', this.fuenteTexto)

    const musicaCreditos = this.add.image(1260, 650, 'creditosMusica').setScale(0.8)
    .setInteractive()
    .on('pointerover', () => musicaCreditos.setScale(0.85))
    .on('pointerout', () => musicaCreditos.setScale(0.8))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('creditosMusica')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });
    
  }
}