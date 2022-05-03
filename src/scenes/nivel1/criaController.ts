import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class criaController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationCriaYagua()
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
		this.sprite.play('criaYaguaMove')		
	}
  private createAnimationCriaYagua(){
    this.sprite.anims.create({
			key: 'criaYaguaMove',
			frameRate: 5,
			frames: this.sprite.anims.generateFrameNames('nivel1Cria',{
				start: 1,
				end: 3,
				prefix: 'criaYagua0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}