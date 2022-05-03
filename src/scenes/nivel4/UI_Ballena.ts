import Phaser from "phaser"
import {sharedInstance as events} from '../eventCenter'

export default class UI_Ballena extends Phaser.Scene
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
			key: 'uiBallena'
		})

	}

	init()
	{
		this.criasCollected = 0
    	this.comidaCollected = 0
		this.estrellasNivel1 = 0
	}
	preload(){
		this.load.image('criaBallena', 'assets/Nivel4/criaBallena1.png');
		this.load.image('comidaBallena', 'assets/Nivel4/krill1.png');
	}

	create()
	{	
		const botonPausa = this.add.image(100, 100, 'botonPausa');
		botonPausa.setInteractive()
		.on('pointerover', () => botonPausa.setScale(1.1))
    	.on('pointerout', () => botonPausa.setScale(1))
		botonPausa.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
		{
			this.scene.pause('nivelBallena_2');
			this.scene.pause('uiBallena');
			this.scene.launch('pauseBallena');
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
	this.add.image(1140 ,70, 'criaBallena');
    this.criasLabel = this.add.text(1200, 30, '0/3', this.fuenteTexto)
    this.add.image(1140 ,190, 'comidaBallena');
    this.comidaLabel = this.add.text(1200, 150, '0/50', this.fuenteTexto)	
	}
	
	private handleCriasCollected()
	{
		++this.criasCollected
   		this.criasLabel.text = this.criasCollected + '/3'
		
		if (this.criasCollected == this.criasTotales) 
		{			
			events.emit('sumaEstrellaBallena')
		}
	}

    private handleComidaCollected()
	{
		++this.comidaCollected
    	this.comidaLabel.text = `${this.comidaCollected}`+ '/50'
		
		if (this.comidaCollected == this.comidaTotales) 
		{			
			events.emit('sumaEstrellaBallena')
		}
	}
}