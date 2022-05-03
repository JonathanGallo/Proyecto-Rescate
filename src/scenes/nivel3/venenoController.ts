import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class venenoController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationVeneno()
    this.stateMachine = new StateMachine(this, 'veneno')

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
		this.sprite.play('venenoMove')
	}
  private createAnimationVeneno(){
    this.sprite.anims.create({
			key: 'venenoMove',
			frameRate: 4,
			frames: this.sprite.anims.generateFrameNames('veneno',{
				start: 1,
				end: 3,
				prefix: 'veneno0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}