import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class criaPinguiController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationCriaPinguino()
    this.stateMachine = new StateMachine(this, 'cria')

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
		this.sprite.play('criaPinguiMove')		
	}
  private createAnimationCriaPinguino(){
    this.sprite.anims.create({
			key: 'criaPinguiMove',
			frameRate: 7,
			frames: this.sprite.anims.generateFrameNames('nivel5Cria',{
				start: 1,
				end: 3,
				prefix: 'criaPingui0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}