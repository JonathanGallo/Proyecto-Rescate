import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class criaBallenaController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationCriaBallena()
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
		this.sprite.play('criaBallenaMove')		
	}
  private createAnimationCriaBallena(){
    this.sprite.anims.create({
			key: 'criaBallenaMove',
			frameRate: 7,
			frames: this.sprite.anims.generateFrameNames('nivel4Cria',{
				start: 1,
				end: 3,
				prefix: 'criaballena_0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}