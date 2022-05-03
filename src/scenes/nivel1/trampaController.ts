import Phaser from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class trampaController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine

  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite
    this.createAnimationTramp()
    this.stateMachine = new StateMachine(this, 'trampa')
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
		this.sprite.play('trampMove')		
	}

  private createAnimationTramp(){
    this.sprite.anims.create({
			key: 'trampMove',
			frameRate: 3,
			frames: this.sprite.anims.generateFrameNames('nivel1Trampaa', {
				start: 1,
				end: 2,
				prefix: 'trampa_Nro0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}