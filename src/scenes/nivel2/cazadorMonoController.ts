import Phaser from 'phaser' 
import StateMachine from '../../statemachine/StateMachine'

export default class cazadorController
{
  private sprite: Phaser.Physics.Matter.Sprite
  private stateMachine: StateMachine
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
  this.sprite = sprite
  this.createAnimationHunter()
  this.stateMachine = new StateMachine(this, 'cazador')
  this.stateMachine.addState('run',{
  onEnter: this.runOnEnter
  })
  .setState('run')  
  }
  private runOnEnter()
	{
		this.sprite.play('hunter-run')		
	}
  private createAnimationHunter(){
    this.sprite.anims.create({
			key: 'hunter-run',
			frameRate: 10,
			frames: this.sprite.anims.generateFrameNames('cazador', {
				start: 1,
				end: 5,
				prefix: 'cazador0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}