import Phaser from 'phaser'
import obstaclesController from '../obstaclesController'
import yaguareteController from './yaguareteController'
import cazadorController from './cazadorController'
import trampaController from './trampaController'
import criaController from './criaController'
import carneController from './carneController'
export default class nivel_1 extends Phaser.Scene
{
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys	
	private yaguarete?: Phaser.Physics.Matter.Sprite
  private yaguareteController?: yaguareteController
  private cazador?: Phaser.Physics.Matter.Sprite
  private cazadorController?: cazadorController
  private trampas?: Phaser.Physics.Matter.Sprite
  private trampaController?: trampaController
  private yaguareteCria?: Phaser.Physics.Matter.Sprite
  private criaController?: criaController
  private carne?: Phaser.Physics.Matter.Sprite
  private carneController?: carneController
  private obstacles!: obstaclesController 
  private estadoMusica:any; 
  private musicaYaguarete:any;
  private sfxComida:any; 
  private sfxCria

  constructor(){
    super('nivelYaguarete')
  } 

  public musicaPlay()
  {
    this.musicaYaguarete.play({volume:0.3, loop: true})
  } 
  public musicaPause()
  {
    this.musicaYaguarete.pause()
  } 
  public musicaResume()
  {
    this.musicaYaguarete.resume()
  }   
  public detenerMusica()
  {  
    this.musicaYaguarete.stop()            
  }
  ///////Cria
  public sfxCriaPlay()
  {
    this.sfxCria.play({volume:0.05})
  } 
  public detenerSFXCria()
  {  
    this.sfxCria.stop()            
  }
  ///////Comida
  public sfxComidaPlay()
  {
    this.sfxComida.play({volume:0.03})
  }
  public detenerSFXComida()
  {  
    this.sfxComida.stop()            
  } 

  init()
  {
    this.cursors = this.input.keyboard.createCursorKeys()  
    this.obstacles = new obstaclesController()        
  }

  preload(){
    this.load.tilemapTiledJSON('mapa_nivel1', 'assets/Nivel1/nivel_Yaguarete.json');    
    this.load.tilemapTiledJSON('yaguareteTest' , 'assets/Nivel1/nivel_YaguareteTest.json');
    this.load.image('nivel1Fondoo','assets/Nivel1/nivel1_fondo.png');
    this.load.image('nivel1Sueloo','assets/Nivel1/nivel1_suelo.png');
    this.load.image('nivel1Bandera', 'assets/Nivel1/bandera.png');
    this.load.atlas('yaguarete' , 'assets/Nivel1/yaguarete.png', 'assets/Nivel1/yaguarete.json');
    this.load.atlas('nivel1Trampaa','assets/Nivel1/trampa.png','assets/Nivel1/trampa.json'); 
    this.load.atlas('cazador', 'assets/Nivel1/cazador.png', 'assets/Nivel1/cazador.json');
    this.load.atlas('nivel1Cria', 'assets/Nivel1/criaYaguarete.png', 'assets/Nivel1/criaYaguarete.json')
    this.load.atlas('nivel1Carnee','assets/Nivel1/nivel1_carne.png', 'assets/Nivel1/nivel1_carne.json');
  }

  create()
  {
    this.musicaYaguarete= this.sound.add('musicaYaguarete')    
    this.sfxComida = this.sound.add('sfxComida')
    this.sfxCria = this.sound.add('sfxCria')
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    if (this.estadoMusica=='1') 
    {
      this.musicaPlay()
    }
    
    this.scene.launch('ui')
    /* Tiled Nivel 1 */
    const mapa_nivel1 = this.make.tilemap({key: 'mapa_nivel1'});
    const fondo_nivel1_tiled = mapa_nivel1.addTilesetImage('nivel1_fondo', 'nivel1Fondoo');
    const suelo_nivel1_tiled = mapa_nivel1.addTilesetImage('nivel1_suelo', 'nivel1Sueloo');

  /* Capas tiled */
    const fondo_nivel1 : Phaser.Tilemaps.TilemapLayer
    = mapa_nivel1.createLayer('nivel1Fondo', fondo_nivel1_tiled, 0, 0);

    const suelo_nivel1 : Phaser.Tilemaps.TilemapLayer = 
    mapa_nivel1.createLayer('nivel1Suelo', suelo_nivel1_tiled, 0, 0);
    suelo_nivel1.setCollisionByProperty({solido: true});

    this.cameras.main.setBounds(0, 0, mapa_nivel1.widthInPixels, mapa_nivel1.heightInPixels);   
    
    //EMPEZANDO LA MAQUINA DE ESTADO
    const objectsLayer = mapa_nivel1.getObjectLayer('nivel1Objetos')

		objectsLayer.objects.forEach(objData => {
			const { x = 0, y = 0, name, width = 0, height = 0 } = objData

			switch (name)
			{
				case 'yaguarete':
				{
          //X=156,97
					this.yaguarete = this.matter.add.sprite(x + (width * 0.5), y, 'yaguarete')
          this.yaguarete.setScale(0.8)
          this.yaguarete.setBounce(0)
          this.yaguarete.setRectangle(120,90)
          this.yaguarete.setFixedRotation()

          /* this.yaguarete.setDisplaySize(200, 200) */
          //Ocupar "setDisplaySize" en vez de "setScale"
          //"setRectangle" para cambiar la caja de colision

					this.yaguareteController = new yaguareteController(
						this,
						this.yaguarete,
						this.cursors,
						this.obstacles
					)

					this.cameras.main.startFollow(this.yaguarete, true, 1, 1, -400)
					break
				}
        
        case 'cazador':
        {
          this.cazador = this.matter.add.sprite(x+ (width*0.5), y+(height*0.5), 'cazador', undefined)
          this.cazador.setScale(0.7)
          this.cazador.setFixedRotation()          
          this.cazadorController = new cazadorController(this.cazador)

          break
        }

        case 'trampa':
        { //La Y de trampa en capa de objetos es: Y=629
          //La Y de trampa en 0.85 es de Y=660
          const trampa = this.matter.add.rectangle(x + (width * 0.5), y + (height * 0.5), width, height, {
						isStatic: true
					})
          this.obstacles.add('trampa', trampa)
          this.trampas = this.matter.add.sprite(x + (width*0.5), y +(height*0.5), 'nivel1Trampaa', undefined, {
            isStatic: true,
            isSensor:true
          }).setScale(0.85).setData('type', 'trampa')	
          
          this.trampaController = new trampaController(
            this.trampas
          )
					break
        }

        case 'bandera':
        { //Altura en Y de la bandera Y=458
          const bandera = this.matter.add.rectangle(x + (width * 0.5), y + (height * 0.5), width, height, {
						isStatic: true
					})
          this.obstacles.add('bandera', bandera)
          const banderas = this.matter.add.sprite(x+ (width*0.5), y+(height*0.4), 'nivel1Bandera',
          undefined,{
            isStatic : true,
            isSensor: true
          }).setScale(0.4)
          break
        }
        
        case 'carne':
        {
          this.carne = this.matter.add.sprite(x + (width*0.5), y +(height*0.5), 'nivel1Carnee', undefined, {
						isStatic: true,
            isSensor: true
          }).setScale(1.3)
          this.carne.setData('type', 'carne')
          this.carneController = new carneController(
            this.carne
          )
          break
        }

        case 'cria':
        {
          this.yaguareteCria = this.matter.add.sprite(x+ (width*0.5), y+(height*0.5), 'nivel1Cria', undefined,{
            isStatic : true,
            isSensor: true
          })  
          this.yaguareteCria.setData('type', 'cria')
          this.criaController = new criaController(
            this.yaguareteCria,
          )
          break
        }
      }    
		})
  
		this.matter.world.convertTilemapLayer(suelo_nivel1)
}

  update(t: number, dt: number){
    this.yaguareteController?.update(dt)
    this.cazadorController?.update(dt)
    this.trampaController?.update(dt)
    this.criaController?.update(dt)
    this.carneController?.update(dt)
  }  
  
}



