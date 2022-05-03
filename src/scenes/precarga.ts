import Phaser from 'phaser'
import { EN_US, ES_AR, PT_BR } from '~/enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '~/enums/status'
import { getTranslations, getPhrase } from '~/services/translation'
import WebFontFile from './webFontLoader'

export default class precarga extends Phaser.Scene{
    private updatedText
    private updatedString = 'JUGAR'
    private wasChangedLanguage = TODO
    
    constructor () {
      super('precarga');
    }
    preload()
    {  
             //Botones de desbloqueables
      this.load.image('botonYaguarete', 'assets/MenuPrincipal/Botones/Extras/1erDesbloqueable.png');
      this.load.image('botonMono', 'assets/MenuPrincipal/Botones/Extras/2doDesbloqueable.png');
      this.load.image('botonCondor', 'assets/MenuPrincipal/Botones/Extras/3erDesbloqueable.png');
      this.load.image('botonBallena', 'assets/MenuPrincipal/Botones/Extras/4toDesbloqueable.png');
      this.load.image('botonPinguino', 'assets/MenuPrincipal/Botones/Extras/5toDesbloqueable.png');
      this.load.image('infoYaguarete', 'assets/MenuPrincipal/Botones/Extras/infoYaguarete1.png');
      this.load.image('infoMono', 'assets/MenuPrincipal/Botones/Extras/infoMono1.png');
      this.load.image('infoCondor', 'assets/MenuPrincipal/Botones/Extras/infoCondor1.png');
      this.load.image('infoBallena', 'assets/MenuPrincipal/Botones/Extras/infoBallena1.png');
      this.load.image('infoPinguino', 'assets/MenuPrincipal/Botones/Extras/infoPinguino1.png');
      //EXTRAS
      this.load.image('popUpExtras', 'assets/MenuPrincipal/popUp2.png');
      //PRECARGA
      this.load.image('banderaArg', 'assets/Precarga/Bandera_Arg.png');
      this.load.image('banderaBr', 'assets/Precarga/Bandera_Bra.png');
      this.load.image('banderaEu', 'assets/Precarga/Bandera_EU.png');
      ///////////////////////////////////////////////////MUSICA DE NIVELES
      ///////////Musica Yaguarete
      this.load.audio('musicaYaguarete', 'audio/Yaguarete/musicaYaguarete.mp3');
      ///////////Musica Mono
      this.load.audio('musicaMono', 'audio/Mono/musicaMono.mp3');
      ///////////Musica Condor
      this.load.audio('musicaCondor', 'audio/Condor/musicaCondor.mp3')
      ///////////Musica Ballena
      this.load.audio('musicaBallena', 'audio/Ballena/musicaBallena.mp3')
      ///////////Musica Pinguino
      this.load.audio('musicaPinguino', 'audio/Pinguino/musicaPinguino.mp3');
      ///////////Menu Principal    
      this.load.audio('musicaMP', 'audio/musicaMP.mp3');
      //////////// Musica Bonus
      this.load.audio('Bonus', 'audio/musicaBonus.mp3');
      this.load.image('botonNivel', 'assets/Mapa/botonMapa.png');
      this.load.image('botonGris', 'assets/Mapa/respuestaBonus1.png');
      this.load.image('botonCorrecto', 'assets/Mapa/respuestaBonus2.png');
      this.load.image('botonIncorrecto', 'assets/Mapa/respuestaBonus3.png');
      //////////// Botones sonido
      this.load.audio('sonidoBoton', 'audio/sfx/boton.mp3');
      this.load.audio('win', 'audio/sfx/Musica_Victoria.ogg');
      this.load.audio('lose', 'audio/sfx/Musica_Derrota.ogg');
      

      this.load.addFile(new WebFontFile(this.load, [
        'Titan One',
        'Viga'
      ])) 
    }
    create() 
    {
      this.add.image(683, 384, 'fondoLimpio').setScale(0.72);

      const banderaArg = this.add.image(300, 400, 'banderaArg')
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => 
      {
        this.getTranslations(ES_AR)
      })
      .on('pointerover', () => banderaArg.setScale(1.1))
      .on('pointerout', () => banderaArg.setScale(1))
      .on('pointerdown', () => banderaArg.setScale(0.9) && setTimeout(() => {			
        this.scene.start('menuPpal')
        }, 2500))

      const banderaEu = this.add.image(700, 400, 'banderaEu')
			.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => 
      {
				this.getTranslations(EN_US)
			})
      .on('pointerover', () => banderaEu.setScale(1.1))
      .on('pointerout', () => banderaEu.setScale(1))
      .on('pointerdown', () => banderaEu.setScale(0.9) && setTimeout(() => {			
        this.scene.start('menuPpal')
        }, 2500))

      const banderaBr = this.add.image(1100, 400, 'banderaBr')
			.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>
      {
				this.getTranslations(PT_BR)
			})
      .on('pointerover', () => banderaBr.setScale(1.1))
      .on('pointerout', () => banderaBr.setScale(1))
      .on('pointerdown', () => banderaBr.setScale(0.9) && setTimeout(() => {			
        this.scene.start('menuPpal')
        }, 2500))
    }

    async getTranslations(language){
        this.wasChangedLanguage = FETCHING
        await getTranslations(language)
        this.wasChangedLanguage = FETCHED
    }

}  