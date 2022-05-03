import Phaser from "phaser"
import {sharedInstance as events} from '../eventCenter'
export default class UI extends Phaser.Scene
{	
  //Texto para corroborar
  private criasLabel!: Phaser.GameObjects.Text
  private comidaLabel!: Phaser.GameObjects.Text
  
	private criasCollected = 0
  private comidaCollected = 0
	

	//Totales del nivel
	private criasTotales = 3
	private comidaTotales = 50
	
	//Estrellas totales [0 a 3]
	private estrellasNivel1 = 0
	
	private fuenteTexto = {
    fontFamily: 'Titan One',
    fontSize: '40pt',
    color: '#FFBD0D',
    stroke: '#00572f',
    strokeThickness: 6,
  }

	constructor()
	{
		super({
			key: 'ui'
		})

	}

	init()
	{
		this.criasCollected = 0
    this.comidaCollected = 0

		this.criasTotales = 3
		this.comidaTotales = 50

	}
	preload(){
		this.load.image('criaYaguarete', 'assets/Nivel1/criaYagua.png');
		this.load.image('comidaYaguarete', 'assets/Nivel1/carne.png');
	}

	create()
	{
		const botonPausa = this.add.image(100, 100, 'botonPausa');
		botonPausa.setInteractive()
		.on('pointerover', () => botonPausa.setScale(1.1))
    	.on('pointerout', () => botonPausa.setScale(1))
    
		botonPausa.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
		{
			this.scene.pause('nivelYaguarete');
			this.scene.pause('ui');
			this.scene.launch('pause');

        });
		

		events.on('crias-collected', this.handleCriasCollected, this)
    events.on('comida-collected', this.handleComidaCollected, this)

		this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			events.off('crias-collected', this.handleCriasCollected, this)
		})
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			events.off('comida-collected', this.handleComidaCollected, this)
		})

    //TEXTO PARA CORROBORAR
		this.add.image(1140 ,80, 'criaYaguarete');
    this.criasLabel = this.add.text(1200, 50, '0/3', this.fuenteTexto)
    this.add.image(1140 ,180, 'comidaYaguarete').setScale(1.3);
    this.comidaLabel = this.add.text(1200, 150, '0/50', this.fuenteTexto)		
	}
	
	private handleCriasCollected()
	{
		++this.criasCollected
    this.criasLabel.text = this.criasCollected + '/3'
		
		if (this.criasCollected == this.criasTotales) 
		{
			events.emit('sumaEstrella')
		}
	}

  private handleComidaCollected()
	{
		++this.comidaCollected
    this.comidaLabel.text = `${this.comidaCollected}`+ '/50'
		
		if (this.comidaCollected == this.comidaTotales) 
		{			
			events.emit('sumaEstrella')
		}
	}
}