import Phaser from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'
import { sharedInstance as events } from '../eventCenter'
import ObstaclesController from '../obstaclesController'
export default class ballenaController
{
	private pointer: any
	private scene: Phaser.Scene
	private sprite: Phaser.Physics.Matter.Sprite
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	private stateMachine: StateMachine
	private obstacles: ObstaclesController
	private estadoMusica:any;
	private velocidadBallena = 10
	public cantEstrellas = 0

  constructor(scene: Phaser.Scene, 
		sprite: Phaser.Physics.Matter.Sprite, 
		cursors: Phaser.Types.Input.Keyboard.CursorKeys, 
		obstacles: ObstaclesController) 
  	{
		this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
		this.pointer = scene.input.activePointer;
    	this.scene = scene
		this.sprite = sprite
		this.cursors = cursors
		this.obstacles = obstacles

    	this.createAnimations()

		this.stateMachine = new StateMachine(this, 'ballena')

		this.stateMachine.addState('swimUp', {
			onEnter: this.swimUpOnEnter,
			onUpdate: this.swimUpOnUpdate
		})
		.addState('basuraHit',{
			onEnter: this.basuraHitOnEnter
		})
		.addState('banderaCollected',{
			onEnter: this.banderaCollected
		})
		.setState('swimUp')

	  this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyB as MatterJS.BodyType
	
	  if (this.obstacles.is('basura', body))
	  {
		this.stateMachine.setState('basuraHit')
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
			if (this.stateMachine.isCurrentState('swimUp'))
			{
				this.stateMachine.setState('swimUp')
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
						this.scene.scene.get('nivelBallena_2').sfxCriaPlay()
					}
					break
				}

				case 'krill':
				{
					events.emit('comida-collected')
					sprite.destroy()
					if (this.estadoMusica=='1') 
					{
						this.scene.scene.get('nivelBallena_2').sfxComidaPlay()
					}
					break
				}
			}
		})
		events.removeAllListeners();
		events.on('sumaEstrellaBallena', this.sumadorEstrellas, this)
		this.cantEstrellas = 0
  }
  update(dt: number)
	{
		this.stateMachine.update(dt)	
	}

	sumadorEstrellas()
	{	
    this.cantEstrellas = this.cantEstrellas+1			
	}

  private swimUpOnEnter()
	{	
		this.sprite.play('ballena-swim')
		this.sprite.setVelocityX(this.velocidadBallena)
	}

  private swimUpOnUpdate()
	{
    if (this.cursors.up.isDown || this.pointer.isDown){
      this.sprite.setVelocityY(-10)      
      this.sprite.setVelocityX(this.velocidadBallena)
    }
    else if (this.cursors.up.isUp || this.pointer.isUp){
      this.sprite.setVelocityY(+4)
      this.sprite.setVelocityX(this.velocidadBallena)
    }		
	}

	private basuraHitOnEnter(){
		this.sprite.play('ballena-death')		
		this.scene.scene.get('nivelBallena_2').detenerMusica()
		this.scene.time.delayedCall(1500, () => {
			this.scene.scene.launch('gameOverBallena') 
			this.scene.scene.pause()
			this.scene.scene.stop('uiBallena')	
		})
	}

	private banderaCollected(){		
		this.scene.scene.pause()
		this.scene.scene.stop('uiBallena')
		this.scene.scene.launch('gameWinBallena')

		this.cantEstrellas = this.cantEstrellas+1
		this.scene.scene.get('popUpMapa').aumentaContador4()
		this.scene.scene.get('gameWinBallena').aumentaContador4()
		this.scene.scene.get('pop_up_B_Ballena').aumentaContador4()
		this.scene.scene.get('nivelBallena_2').detenerMusica()
				

		if (this.cantEstrellas == 2) 
		{			
			localStorage.setItem('estrellasBallena', '2');
		}
		else if (this.cantEstrellas == 3) 
		{			
			localStorage.setItem('estrellasBallena', '3');	
		} 
		else
		{
			localStorage.setItem('estrellasBallena', '1');
		}
	}
  
	//  									ANIMACIONES
  private createAnimations()
	{
		this.sprite.anims.create({
			key: 'ballena-swim',
			frameRate: 5,
			frames: this.sprite.anims.generateFrameNames('ballena', {
				start: 1,
				end: 5,
				prefix: 'ballena_0',
				suffix: '.png'
			}),
			repeat: -1
		})

		this.sprite.anims.create({
			key: 'ballena-death',
			frames: this.sprite.anims.generateFrameNames('ballena', {
				start: 1,
				end: 2,
				prefix: 'ballenamuer_0',
				suffix: '.png'
			}),
			frameRate: 3
		})
	}
}