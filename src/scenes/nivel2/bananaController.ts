import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class bananaController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationBananaMono()
    this.stateMachine = new StateMachine(this, 'banana')

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
		this.sprite.play('bananaMonoMove')
	}
  private createAnimationBananaMono(){
    this.sprite.anims.create({
			key: 'bananaMonoMove',
			frameRate: 10,
			frames: this.sprite.anims.generateFrameNames('nivel2Banana',{
				start: 1,
				end: 20,
				prefix: 'ban0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}