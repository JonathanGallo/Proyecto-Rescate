import Phaser, { GameObjects } from 'phaser';
import StateMachine from '../../statemachine/StateMachine';

export default class carneController
{
  private sprite: Phaser.Physics.Matter.Sprite;
  private stateMachine: StateMachine;
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite;
    this.createAnimationCarne();
    this.stateMachine = new StateMachine(this, 'carne');

    this.stateMachine.addState('move',{
      onEnter: this.moveOnEnter,
    })
    .setState('move');
  }
  update(dt: number)
	{
		this.stateMachine.update(dt);   
	}
  private moveOnEnter()
	{
		this.sprite.play('carneMove');		
	}
  private createAnimationCarne(){
    this.sprite.anims.create({
			key: 'carneMove',
			frameRate: 8,
			frames: this.sprite.anims.generateFrameNames('carne', 
      {
				start: 1,
				end: 14,
				prefix: 'carne0',
				suffix: '.png'
			}),
			repeat: -1
		})
  }
}