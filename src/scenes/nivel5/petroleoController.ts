import Phaser from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class petroleoController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine


  constructor(scene: Phaser.Scene, sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite

    this.createAnimationPetroleo()

    this.stateMachine = new StateMachine(this, 'petroleo')

  this.stateMachine.addState('move',{
    onEnter: this.moveOnEnter,
  })
  .setState('move')
}

  update(dt: number)
	{
		this.stateMachine.update(dt)	
	}

  private moveOnEnter()
	{
		this.sprite.play('petroleoMove')		
	}

  private createAnimationPetroleo(){
    this.sprite.anims.create({
			key: 'petroleoMove',
			frameRate: 4,
			frames: this.sprite.anims.generateFrameNames('petroleo', {
				start: 1,
				end: 4,
				prefix: 'petroleo0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}