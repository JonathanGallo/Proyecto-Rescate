import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class krillController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationKrill()
    this.stateMachine = new StateMachine(this, 'krill')

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
		this.sprite.play('krillMove')
	}
  private createAnimationKrill(){
    this.sprite.anims.create({
			key: 'krillMove',
			frameRate: 5,
			frames: this.sprite.anims.generateFrameNames('nivel4Krill',{
				start: 1,
				end: 5,
				prefix: 'krill0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}