import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'
export default class pezController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationBananaMono()
    this.stateMachine = new StateMachine(this, 'pez')

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
		this.sprite.play('pezPinguiMove')
	}
  private createAnimationBananaMono(){
    this.sprite.anims.create({
			key: 'pezPinguiMove',
			frameRate: 10,
			frames: this.sprite.anims.generateFrameNames('nivel5Pez',{
				start: 1,
				end: 16,
				prefix: 'pez0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}