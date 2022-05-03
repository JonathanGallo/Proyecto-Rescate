import Phaser, { GameObjects } from 'phaser';
import StateMachine from '../../statemachine/StateMachine';

export default class carneController
{
  private sprite: Phaser.Physics.Matter.Sprite;
  private stateMachine: StateMachine;
  constructor(sprite: Phaser.Physics.Matter.Sprite) 
  {
    this.sprite = sprite;
    this.createAnimationCarneYagua();
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
		this.sprite.play('carneYaguaMove');		
	}
  private createAnimationCarneYagua(){
    this.sprite.anims.create({
			key: 'carneYaguaMove',
			frameRate: 10,
			frames: this.sprite.anims.generateFrameNames('nivel1Carnee', 
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