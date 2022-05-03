import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class basuraController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationBasura()
    this.stateMachine = new StateMachine(this, 'basura')

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
		this.sprite.play('basuraMove')
	}
  private createAnimationBasura(){
    this.sprite.anims.create({
			key: 'basuraMove',
			frameRate: 5,
			frames: this.sprite.anims.generateFrameNames('basura',{
				start: 1,
				end: 5,
				prefix: 'basura_0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}