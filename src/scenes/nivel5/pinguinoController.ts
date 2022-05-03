import Phaser from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'
import { sharedInstance as events } from '../eventCenter'
import ObstaclesController from '../obstaclesController'
export default class pipnguinoController
{
	private pointer: any
	private scene: Phaser.Scene
	private sprite: Phaser.Physics.Matter.Sprite
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	private stateMachine: StateMachine
	private obstacles: ObstaclesController
	private estadoMusica:any;
	private velocidadPinguino = 10
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

		this.stateMachine = new StateMachine(this, 'pinguino')

		this.stateMachine.addState('swimUp', {
			onEnter: this.swimUpOnEnter,
			onUpdate: this.swimUpOnUpdate
		})
		.addState('barcoHit',{
			onEnter: this.barcoHitOnEnter
		})
		.addState('banderaCollected',{
			onEnter: this.banderaCollected
		})
		.setState('swimUp')

    this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyB as MatterJS.BodyType
			
			if (this.obstacles.is('barco', body))
			{
				this.stateMachine.setState('barcoHit')
				return
			}

      if (this.obstacles.is('barco2', body)){
        this.stateMachine.setState('barcoHit')
        return
      }

      if (this.obstacles.is('petroleo', body)){
        this.stateMachine.setState('barcoHit')
        return
      }  

      if(this.obstacles.is('petroleo2', body)){
        this.stateMachine.setState('barcoHit')
        return
      }

      if (this.obstacles.is('red', body)){
        this.stateMachine.setState('barcoHit')
        return
      }
			
			if (this.obstacles.is('banderaPinguino', body))
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
						this.scene.scene.get('nivelPinguino').sfxCriaPlay()
					}
					break
				}	

				case 'pez':
				{
					events.emit('comida-collected')
					sprite.destroy()
					if (this.estadoMusica=='1') 
					{
						this.scene.scene.get('nivelPinguino').sfxComidaPlay()
					}
					break
				}
			}
		})
		events.removeAllListeners();
		events.on('sumaEstrellaPingui', this.sumadorEstrellas, this)
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
		this.sprite.play('pinguino-swim')
		this.sprite.setVelocityX(this.velocidadPinguino)
	}

  private swimUpOnUpdate()
	{
    if (this.cursors.up.isDown || this.pointer.isDown){
      this.sprite.setVelocityY(-10)      
      this.sprite.setVelocityX(this.velocidadPinguino)
    }
    else if (this.cursors.up.isUp || this.pointer.isUp){
      this.sprite.setVelocityY(+4)
      this.sprite.setVelocityX(this.velocidadPinguino)
    }		
	}

	private barcoHitOnEnter(){
		this.sprite.play('pinguino-death')		
		this.scene.scene.get('nivelPinguino').detenerMusica()
		this.scene.time.delayedCall(1000, () => {
			this.scene.scene.launch('gameOverPinguino') 
			this.scene.scene.pause()
			this.scene.scene.stop('uiPinguino')	
		})
	}

	private banderaCollected(){		
		this.scene.scene.pause()
		this.scene.scene.stop('uiPinguino')
		this.scene.scene.launch('gameWinPinguino')

		this.cantEstrellas = this.cantEstrellas+1
		this.scene.scene.get('popUpMapa').aumentaContador5()
		this.scene.scene.get('gameWinPinguino').aumentaContador5()
		this.scene.scene.get('pop_up_B_Pin').aumentaContador5()
		this.scene.scene.get('nivelPinguino').detenerMusica()
				

		if (this.cantEstrellas == 2) 
		{			
			localStorage.setItem('estrellasPingui', '2');
		}
		else if (this.cantEstrellas == 3) 
		{			
			localStorage.setItem('estrellasPingui', '3');	
		} 
		else
		{
			localStorage.setItem('estrellasPingui', '1');
		}
	}
  
	//  									ANIMACIONES
  private createAnimations()
	{

		this.sprite.anims.create({
			key: 'pinguino-swim',
			frameRate: 8,
			frames: this.sprite.anims.generateFrameNames('pinguino', {
				start: 1,
				end: 10,
				prefix: 'pingu_Nro0',
				suffix: '.png'
			}),
			repeat: -1
		})

		this.sprite.anims.create({
			key: 'pinguino-death',
			frames: this.sprite.anims.generateFrameNames('pinguino', {
				start: 1,
				end: 2,
				prefix: 'pinguMuerte0',
				suffix: '.png'
			}),
			frameRate: 3
		})
	}
}