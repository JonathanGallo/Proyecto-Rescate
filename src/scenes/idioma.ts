import Phaser from 'phaser'
import { EN_US, ES_AR, PT_BR } from '~/enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '~/enums/status'
import { getTranslations, getPhrase } from '~/services/translation'
import WebFontFile from './webFontLoader'

export default class idioma extends Phaser.Scene{
    private updatedText
    private updatedString = 'JUGAR'
    private wasChangedLanguage = TODO
    
    constructor () {
      super('idioma');
    }

    preload()
    {  
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
        this.scene.start('informacion')
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
        this.scene.start('informacion')
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
        this.scene.start('informacion')
        }, 2500))
    }

    async getTranslations(language){
        this.wasChangedLanguage = FETCHING
        await getTranslations(language)
        this.wasChangedLanguage = FETCHED
    }

}  