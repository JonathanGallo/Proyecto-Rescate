import Phaser, { GameObjects } from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class criaCondorController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationCriaCondor()
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
		this.sprite.play('criaCondorMove')		
	}
  private createAnimationCriaCondor(){
    this.sprite.anims.create({
			key: 'criaCondorMove',
			frameRate: 5,
			frames: this.sprite.anims.generateFrameNames('nivel3Cria',{
				start: 1,
				end: 3,
				prefix: 'cria0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}