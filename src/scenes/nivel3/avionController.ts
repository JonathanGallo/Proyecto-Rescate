import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class avionController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationAvion()
    this.stateMachine = new StateMachine(this, 'avion')

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
		this.sprite.play('avionMove')
	}
  private createAnimationAvion(){
    this.sprite.anims.create({
			key: 'avionMove',
			frameRate: 4,
			frames: this.sprite.anims.generateFrameNames('avion',{
				start: 1,
				end: 3,
				prefix: 'avion0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}