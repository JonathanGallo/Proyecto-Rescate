import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class cazadorController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  private velocidadCazador = 10

  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite

    this.createAnimationHunter()

    this.stateMachine = new StateMachine(this, 'cazador')

    this.stateMachine.addState('run',{
      onEnter: this.runOnEnter,
      onUpdate: this.runOnUpdate
    })
    .setState('run')

    this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const body = data.bodyA as MatterJS.BodyType

      const gameObject = body.gameObject

      if (!gameObject)
      {
        return
      }

      const sprite = gameObject as Phaser.Physics.Matter.Sprite
      const type = sprite.getData('type')
      
      switch (type)
      {
        case 'trampa':
        {
          sprite.destroy()
          break
        }	
      }
    
    })
  }

  update(dt: number)
	{
		this.stateMachine.update(dt)    
	}

  private runOnEnter()
	{
		this.sprite.play('hunter-run')
	}

  private runOnUpdate(){
    this.sprite.setVelocityX(this.velocidadCazador)
  }

  private createAnimationHunter(){
    this.sprite.anims.create({
			key: 'hunter-run',
			frameRate: 10,
			frames: this.sprite.anims.generateFrameNames('cazador', {
				start: 1,
				end: 5,
				prefix: 'cazador0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}