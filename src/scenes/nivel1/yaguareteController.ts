import Phaser from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'
import { sharedInstance as events } from '../eventCenter'
import ObstaclesController from '../obstaclesController'
type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys

export default class yaguareteController
{
	private pointer: any //COLOCAMOS UN POINTER PARA EL MOUSE
  private scene: Phaser.Scene
	private sprite: Phaser.Physics.Matter.Sprite
	private cursors: CursorKeys
  private stateMachine: StateMachine
  private obstacles: ObstaclesController
	public cantEstrellas = 0
	private velocidad = 12
	private estadoMusica:any;	

  constructor(scene: Phaser.Scene, 
		sprite: Phaser.Physics.Matter.Sprite, 
		cursors: CursorKeys, 
		obstacles: ObstaclesController) 
  {
		this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
		this.pointer = scene.input.activePointer; //LE COLOCAMOS AL POINTER UN ACTIVEPOINTER
    this.scene = scene
		this.sprite = sprite
		this.cursors = cursors
		this.obstacles = obstacles

    this.createAnimations()

		this.stateMachine = new StateMachine(this, 'yaguarete')

		this.stateMachine.addState('walk', {
			onEnter: this.walkOnEnter,
			onUpdate: this.walkOnUpdate
		})
		.addState('jump', {
			onEnter: this.jumpOnEnter
		})
		.addState('trampaHit',{
			onEnter: this.trampaHitOnEnter
		})
		.addState('banderaCollected',{
			onEnter: this.banderaCollected
		})
		.setState('walk')

    this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyB as MatterJS.BodyType
			
			if (this.obstacles.is('trampa', body))
			{
				this.stateMachine.setState('trampaHit')
				return
			}
			
			if (this.obstacles.is('bandera', body))
			{
				this.stateMachine.setState('banderaCollected')
				return				
			}
      const gameObject = body.gameObject
			
			if (!gameObject)
			{
				return
			}

			if (gameObject instanceof Phaser.Physics.Matter.TileBody)
			{
				if (this.stateMachine.isCurrentState('jump'))
				{
					this.stateMachine.setState('walk')
				}
				return
			}
      
      const sprite = gameObject as Phaser.Physics.Matter.Sprite
			const type = sprite.getData('type')
      
      switch (type)
			{
				case 'cria':
				{
					sprite.destroy()
					events.emit('crias-collected')
					if (this.estadoMusica=='1')
					{
						this.scene.scene.get('nivelYaguarete').sfxCriaPlay()
					}
					break
				}	

				case 'carne':
				{
					events.emit('comida-collected')
					sprite.destroy()
					if (this.estadoMusica=='1') 
					{
						this.scene.scene.get('nivelYaguarete').sfxComidaPlay()
					}
					break
				}
			}
		})
		
		events.removeAllListeners();
		events.on('sumaEstrella', this.sumadorEstrellas, this)
		this.cantEstrellas = 0
  }

  update(dt: number)
	{
		this.stateMachine.update(dt)
		if (this.sprite.body.velocity.x<=this.velocidad && this.sprite.body.velocity.x > 0){
			this.sprite.setVelocityX(this.velocidad)
		}
		if (this.sprite.body.velocity.x == 0){
			this.sprite.setVelocityX(0)
		}
	}

	sumadorEstrellas()
	{	
    this.cantEstrellas = this.cantEstrellas+1			
	}

	//	WALK  
  private walkOnEnter()
	{		
		this.sprite.stop()
		this.sprite.play('yaguarete-walk')		
	}

  private walkOnUpdate()
	{	
		this.sprite.setVelocityX(this.velocidad)
		if (this.cursors.up.isDown|| this.pointer.isDown) //POINTER IS DOWN INDICA SI SE REALIZA EL CLICK
		{
			this.stateMachine.setState('jump')
		}
	}

		//SALTO
  private jumpOnEnter()
	{
		this.sprite.stop()
		this.sprite.play('yaguarete-jump')
		this.sprite.setVelocityY(-40)
		this.sprite.setVelocityX(15)
	}


	private trampaHitOnEnter(){
		this.sprite.play('yaguarete-death')
		this.sprite.setVelocityX(0)
		this.scene.scene.get('nivelYaguarete').detenerMusica()
		this.scene.time.delayedCall(1500, () => {
			this.scene.scene.launch('gameOver')
			this.scene.scene.pause()
			this.scene.scene.stop('ui')	
		})
	}

	private banderaCollected(){
		this.scene.scene.pause()
		this.scene.scene.stop('ui')
		this.scene.scene.launch('gameWin')	

		this.cantEstrellas = this.cantEstrellas+1
		this.scene.scene.get('popUpMapa').aumentaContador1()
		this.scene.scene.get('gameWin').aumentaContador1()
		this.scene.scene.get('pop_up_B').aumentaContador1()
		this.scene.scene.get('nivelYaguarete').detenerMusica() 

		if (this.cantEstrellas == 2) 
		{			
			localStorage.setItem('estrellasYaguarete', '2');
		}
		else if (this.cantEstrellas == 3) 
		{			
			localStorage.setItem('estrellasYaguarete', '3');	
		} 
		else
		{
			localStorage.setItem('estrellasYaguarete', '1');
		}
	}
  
	//  									ANIMACIONES 	
	
  private createAnimations()
	{
		this.sprite.anims.create({
			key: 'yaguarete-walk',
			frameRate: 5,
			frames: this.sprite.anims.generateFrameNames('yaguarete', {
				start: 1,
				end: 6,
				prefix: 'yaguarete_Nro0',
				suffix: '.png'
			}),
			repeat: -1
		})

    this.sprite.anims.create({
			key: 'yaguarete-jump',
			frameRate: 10,
			frames: this.sprite.anims.generateFrameNames('yaguarete', {
				start: 1,
				end: 4,
				prefix: 'yaguareteSalto0',
				suffix: '.png'
			}),
			repeat: -1
		})

		this.sprite.anims.create({
			key: 'yaguarete-death',
			frames: this.sprite.anims.generateFrameNames('yaguarete', {
				start: 1,
				end: 3,
				prefix: 'yaguareteMuerte0',
				suffix: '.png'
			}),
			frameRate: 4
		})
	}
}