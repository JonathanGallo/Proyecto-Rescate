import Phaser from 'phaser'
//IMPORTAMOS WEB FONT FILE
import WebFontFile from './webFontLoader';
export default class mp1 extends Phaser.Scene
{  
  private musicaMP:any  
  private sonidoButton:any;
  private estadoMusica:any;
  private fullscreenButton:any;
  

  public detenerMusica()
  {    
    this.musicaMP.stop()              
  }
  
  public sfxDetenido()
  {
    this.sonidoButton.stop()
  }
  
  public musicaPlay()
  {
    this.musicaMP.play({volume:0.25, loop: true})       
  }
  
  public sfxPlay()
  {
    this.sonidoButton.play({volume:0.5})
  }

  constructor()
  {
    super('menuPpal');    
  } 

  preload()
  {    
    //////////Musica Mapa  
    this.load.audio('musicaMapa', 'audio/musicaMapa.mp3')
    /////////efectos de sonido niveles
    this.load.audio('sfxComida', 'audio/sfx/obtenerComida.ogg');
    this.load.audio('sfxCria', 'audio/sfx/obtenerCria.ogg');
    this.load.spritesheet('fullscreen', 'assets/MenuPrincipal/Botones/fullscreen2.png', { frameWidth: 64, frameHeight: 64 });

    //CARGAMOS EN UN ARRAY TODAS LAS FUENTES QUE SE QUIEREN PARA EL JUEGO
    this.load.addFile(new WebFontFile(this.load, [
      'Titan One',
      'Viga'
    ]))         
  }
  
  create()
  {
    this.sonidoButton = this.sound.add('sonidoBoton');
    this.musicaMP= this.sound.add('musicaMP')     
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    
    if (this.estadoMusica=='1') 
    {
      this.musicaPlay()    
    } 

    //Fondo del Mp
    const fondoMenu = this.add.image(683, 384, 'menu').setScale(0.75);

    //Boton Play
    const buttonPlay = this.add.image(900, 650, 'botonPlay')
    .setInteractive()
    .on('pointerover', () => buttonPlay.setScale(1.1))
    .on('pointerout', () => buttonPlay.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('menuMapa') 
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.detenerMusica()
    });

    //Boton Premio
    const buttonPremio = this.add.image(700, 650, 'botonDesbloqueable')
    .setInteractive()
    .on('pointerover', () => buttonPremio.setScale(1.1))
    .on('pointerout', () => buttonPremio.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('extras')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });

    //Boton Info
    const buttonInfo = this.add.image(500, 650, 'botonInfo')
    .setInteractive()
    .on('pointerover', () => buttonInfo.setScale(1.1))
    .on('pointerout', () => buttonInfo.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    { 
      this.scene.start('informacion')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });

    let n=0
    let b=0
    const buttonMusica = this.add.image(90, 90, 'botonMusica').setScale(0.7)
    .setInteractive()
    .on('pointerover', () => buttonMusica.setScale(0.8))
    .on('pointerout', () => buttonMusica.setScale(0.7))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {   
      if(this.estadoMusica == '1' && this)
      {
        this.estadoMusica = '0' 
        localStorage.setItem('musicaPlay', '0')
        localStorage.setItem('sfxPlay', '0')
        this.detenerMusica()
        this.sfxDetenido() 
      } 
      else if (this.estadoMusica == '0') 
      {
        this.estadoMusica = '1'
        localStorage.setItem('musicaPlay', '1')
        localStorage.setItem('sfxPlay', '1')
        this.musicaPlay()
        this.sfxPlay()
      }
      
      this.sfxPlay()
    });  
    
    //          FULLSCREEN
    const fullscreenButton = this.add.image(1350, 30, 'fullscreen', 0).setOrigin(1, 0).setScale(1.5)
    .setInteractive()
    .on('pointerover', () => fullscreenButton.setScale(1.7))
    .on('pointerout', () => fullscreenButton.setScale(1.5))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {   
      if (this.scale.isFullscreen)
      {
        fullscreenButton.setFrame(0);

          this.scale.stopFullscreen();
      }
      else
      {
        fullscreenButton.setFrame(1);

          this.scale.startFullscreen();
      }

  }, this);
     

  }

  update()
  {
  
  }
}