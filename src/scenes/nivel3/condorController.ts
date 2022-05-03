import Phaser from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'
import { sharedInstance as events } from '../eventCenter'
import ObstaclesController from '../obstaclesController'
export default class condorController
{
	private pointer: any
	private scene: Phaser.Scene
	private sprite: Phaser.Physics.Matter.Sprite
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	private stateMachine: StateMachine
	private obstacles: ObstaclesController
	private estadoMusica:any;
	private velocidadCondor = 10
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

		this.stateMachine = new StateMachine(this, 'condor')

		this.stateMachine.addState('flyUp', {
			onEnter: this.flyUpOnEnter,
			onUpdate: this.flyUpOnUpdate
		})
		.addState('venenoHit',{
			onEnter: this.venenoHitOnEnter
		})
		.addState('banderaCollected',{
			onEnter: this.banderaCollected
		})
		.setState('flyUp')

	  this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyB as MatterJS.BodyType
	
	  if (this.obstacles.is('veneno', body))
	  {
		this.stateMachine.setState('venenoHit')
		return
	  }

	  if (this.obstacles.is('veneno2', body))
	  {
		this.stateMachine.setState('venenoHit')
		return
	  }

	  if (this.obstacles.is('avion', body))
	  {
		this.stateMachine.setState('venenoHit')
		return
	  }

	  if (this.obstacles.is('avion2', body))
	  {
		this.stateMachine.setState('venenoHit')
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
			if (this.stateMachine.isCurrentState('flyUp'))
			{
				this.stateMachine.setState('flyUp')
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
						this.scene.scene.get('nivelCondor').sfxCriaPlay()
					}
					break
				}

				case 'carne':
				{
					events.emit('comida-collected')
					sprite.destroy()
					if (this.estadoMusica=='1') 
					{
						this.scene.scene.get('nivelCondor').sfxComidaPlay()
					}
					break
				}
			}
		})
		events.removeAllListeners();
		events.on('sumaEstrellaCondor', this.sumadorEstrellas, this)
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

  private flyUpOnEnter()
	{	
		this.sprite.play('condor-fly')
		this.sprite.setVelocityX(this.velocidadCondor)
	}

  private flyUpOnUpdate()
	{
    if (this.cursors.up.isDown || this.pointer.isDown){
      this.sprite.setVelocityY(-12)      
      this.sprite.setVelocityX(this.velocidadCondor)
    }
    else if (this.cursors.up.isUp || this.pointer.isUp){
      this.sprite.setVelocityY(+6)
      this.sprite.setVelocityX(this.velocidadCondor)
    }		
	}

	private venenoHitOnEnter(){
		this.sprite.play('condor-death')		
		this.scene.scene.get('nivelCondor').detenerMusica()
		this.scene.time.delayedCall(1500, () => {
			this.scene.scene.launch('gameOverCondor') 
			this.scene.scene.pause()
			this.scene.scene.stop('uiCondor')	
		})
	}

	private banderaCollected(){		
		this.scene.scene.pause()
		this.scene.scene.stop('uiCondor')
		this.scene.scene.launch('gameWinCondor')

		this.cantEstrellas = this.cantEstrellas+1
		this.scene.scene.get('popUpMapa').aumentaContador3()
		this.scene.scene.get('gameWinCondor').aumentaContador3()
		this.scene.scene.get('pop_up_B_Condor').aumentaContador3()
		this.scene.scene.get('nivelCondor').detenerMusica()
				

		if (this.cantEstrellas == 2) 
		{			
			localStorage.setItem('estrellasCondor', '2');
		}
		else if (this.cantEstrellas == 3) 
		{			
			localStorage.setItem('estrellasCondor', '3');	
		} 
		else
		{
			localStorage.setItem('estrellasCondor', '1');
		}
	}
  
	//  									ANIMACIONES
  private createAnimations()
	{
		this.sprite.anims.create({
			key: 'condor-fly',
			frameRate: 5,
			frames: this.sprite.anims.generateFrameNames('condor', {
				start: 1,
				end: 7,
				prefix: 'condor0',
				suffix: '.png'
			}),
			repeat: -1
		})

		this.sprite.anims.create({
			key: 'condor-death',
			frames: this.sprite.anims.generateFrameNames('condor', {
				start: 1,
				end: 2,
				prefix: 'condorMuerte0',
				suffix: '.png'
			}),
			frameRate: 3
		})
	}
}