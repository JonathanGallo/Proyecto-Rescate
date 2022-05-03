import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class criaMonoController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationCriaMono()
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
		this.sprite.play('criaMonoMove')		
	}
  private createAnimationCriaMono(){
    this.sprite.anims.create({
			key: 'criaMonoMove',
			frameRate: 7,
			frames: this.sprite.anims.generateFrameNames('nivel2Cria',{
				start: 1,
				end: 3,
				prefix: 'criaMono0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}