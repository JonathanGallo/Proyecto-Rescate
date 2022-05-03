import Phaser from 'phaser'
import { getPhrase } from '~/services/translation'
export default class creditosMusica extends Phaser.Scene
{
  private estadoMusica:any;
  private fuenteTexto = {
    fontFamily: 'Viga',
    fontSize: '18pt',
    color: '#000000',
    align: 'justify',
    lineSpacing: 1
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
    super('creditosMusica');
  }

  create()
  {
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    this.sonidoButton = this.sound.add('sonidoBoton');
    const fondoMenu = this.add.image(683, 384, 'fondoLimpio').setScale(0.72);
    this.add.text(200,50, 'Rite of Passage by Kevin MacLeod\nLink:https://incompetech.filmmusic.io/song/4291-rite-of-passage\nLicense: https://filmmusic.io/standard-license\n  \nRound Drums by Kevin Macleod from Filmmusic io\n Link:https://incompetech.filmmusic.io/song/4308-round-drums\nLicense: https://filmmusic.io/standard-license\n  \nFirebrand by Kevin Macleod from Filmmusic io\nLink: https://incompetech.filmmusic.io/song/3757-firebrand\nLicense: https://filmmusic.io/standard-license\n \nSeven Seas by Alexander Nakarada\nLink: https://filmmusic.io/song/7540-seven-seas\nLicense: https://filmmusic.io/standard-license\n \nBassa Island Game Loop by Kevin MacLeod\nLink: https://incompetech.filmmusic.io/song/3424-bassa-island-game-loop\nLicense: https://filmmusic.io/standard-license\n \nLotus by Kevin Macleod from Filmmusic io\nLink: https://incompetech.filmmusic.io/song/5046-lotus\nLicense: https://filmmusic.io/standard-license\n \nhttps://www.kenney.nl/assets/interface-sounds', this.fuenteTexto)

    const buttonAtras = this.add.image(1260, 105, 'botonatras')
    .setInteractive()
    .on('pointerover', () => buttonAtras.setScale(1.1))
    .on('pointerout', () => buttonAtras.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('credit2')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    }) 
  }
}