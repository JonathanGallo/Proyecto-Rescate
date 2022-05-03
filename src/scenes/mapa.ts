import Phaser from 'phaser';
import { getPhrase } from '~/services/translation';
export default class mapa extends Phaser.Scene
{
  //Yaguarete
  private cantidadEstrellasYagua
  private cantidadEstrellasYaguaBonus
  private estrellaMasAltaYagua : number = 0;
  
  //Pinguino
  private cantidadEstrellasPingui
  private cantidadEstrellasPinguiBonus
  private estrellaMasAltaPingui : number = 0;
    
  //Mono 
  private cantidadEstrellasMono : any
  private estrellaMasAltaMono : number =0  
  private cantidadEstrellasMonoBonus
  
  //Condor
  private cantidadEstrellasCondor: any
  private estrellaMasAltaCondor : number =0  
  private estrellasCondorBonus

  //Ballena
  private cantidadEstrellasBallena: any
  private estrellaMasAltaBallena : number =0  
  private estrellasBallenaBonus

  public musicaMapa:any
  private estadoMusica:any;
  
  public musicaPlay()
  {    
    this.musicaMapa.play({volume:0.05, loop: true})    
  }
  public detenerMusica()
  {  
    this.musicaMapa.stop()            
  }
  private sonidoButton:any;
  public sfxDetenido()
  {
    this.sonidoButton.stop()
  }
  public sfxPlay()
  {
    this.sonidoButton.play({volume:0.5})
  }
  //FUENTE
  private fuenteTexto = {
    fontFamily: 'Titan One',
    fontSize: '25pt',
    color: '#FFBD0D',
    stroke: '#00572f',
    strokeThickness: 6,
  }
  private fuenteTextoProx = {
    fontFamily: 'Titan One',
    fontSize: '18pt',
    color: 'grey',
    stroke: 'black',
    strokeThickness: 4,
  }
  private fuenteTextoYagua = {
    fontFamily: 'Titan One',
    fontSize: '22pt',
    color: '#FFBD0D',
    stroke: '#00572f',
    strokeThickness: 6,
  }
  constructor(){
    super ('menuMapa');
  }

  preload(){
    this.load.image('botonNivel', 'assets/Mapa/botonMapa.png');
    this.load.image('fondoMapa', 'assets/Mapa/fondoMapa.png');
    this.load.spritesheet('estrellas','assets/Mapa/estrellasMapa.png',
    {frameWidth:196 , frameHeight:114 });
    this.load.image('nivelBonus', 'assets/Mapa/NivelBonus.png');
    this.load.spritesheet('estrellaBonus', 'assets/Mapa/estrellasBonus.png',
    {frameWidth:202, frameHeight:190});
    this.load.image('popUpMapaNiveles', 'assets/MenuPrincipal/popUp.png')  
  }

  create()
  {
    
    this.sonidoButton = this.sound.add('sonidoBoton');
    
    this.musicaMapa= this.sound.add('musicaMapa') 
    
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    if (this.estadoMusica=='1') 
    {
      this.musicaPlay()   
    }

    const fondo_Mapa = this.add.image(600, 350, 'fondoMapa');

    const mapaArg = this.add.image(750, 384, 'mapaArgentina');

    const buttonMenu = this.add.image(65, 80, 'botonMenuPpal').setScale(0.7)
    .setInteractive()
    .on('pointerover', () => buttonMenu.setScale(0.8))
    .on('pointerout', () => buttonMenu.setScale(0.7))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('menuPpal')
      this.detenerMusica()
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });

    const buttonMusica = this.add.image(180, 80, 'botonMusica').setScale(0.7)
    .setInteractive()
    .on('pointerover', () => buttonMusica.setScale(0.8))
    .on('pointerout', () => buttonMusica.setScale(0.7))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {   
      if(this.estadoMusica == '1')
      {
        this.estadoMusica = '0' 
        localStorage.setItem('musicaPlay', '0')
        this.detenerMusica() 
      } 
      else if (this.estadoMusica == '0') 
      {
        this.estadoMusica = '1'
        localStorage.setItem('musicaPlay', '1')
        this.musicaPlay()
      }  
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }   
    })
      

    //////////////////////////////////////////////ESTRELLAS GANADAS //////////////////////////////////////////////
    const estrellasTotales = this.add.sprite(1000, 650, 'estrellas', 3).setDepth(7).setScale(1.2)
    //////////////////////////////////////////////NIVEL YAGUARETE////////////////////////////////////////////// 
    
    this.cantidadEstrellasYagua = localStorage.getItem('estrellasYaguarete') || '1';  
    
    if (this.cantidadEstrellasYagua>this.estrellaMasAltaYagua) 
    {
      this.estrellaMasAltaYagua = this.cantidadEstrellasYagua
    }
    this.add.sprite(1127, 195, 'estrellas', this.estrellaMasAltaYagua).setDepth(7).setScale(0.8);

    this.cantidadEstrellasYaguaBonus= localStorage.getItem('estrellasYaguareteBonus') || '1'; 
    
    const buttonNivel1 = this.add.image(1130, 170, 'botonNivel').setScale(0.25)
    .setInteractive()
    .on('pointerover', () => buttonNivel1.setScale(0.28))
    .on('pointerout', () => buttonNivel1.setScale(0.25))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.launch('popUpMapa')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause() 
      this.scene.get("popUpMapa").mostrarNiveles('yaguareteNiveles')
    })
    
    this.add.text(1030,115, getPhrase('YAGUARETÉ'), this.fuenteTextoYagua)
    
    //////////////////////////////////////////////NIVEL MONO//////////////////////////////////////////////
    this.cantidadEstrellasMono = localStorage.getItem('estrellasMono') || '1';  
    
    if (this.cantidadEstrellasMono>this.estrellaMasAltaMono) 
    {
      this.estrellaMasAltaMono = this.cantidadEstrellasMono
    }
    this.add.sprite(420, 105, 'estrellas', this.estrellaMasAltaMono).setDepth(7).setScale(0.8);

    this.cantidadEstrellasMonoBonus= localStorage.getItem('estrellasMonoBonus') || '1';
    
    const buttonNivel2 = this.add.image(420,80, 'botonNivel').setScale(0.25)
    .setInteractive()
    .on('pointerover', () => buttonNivel2.setScale(0.28))
    .on('pointerout', () => buttonNivel2.setScale(0.25))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    { 
      this.scene.launch('popUpMapa') 
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause() 
      this.scene.get("popUpMapa").mostrarNiveles('monoNiveles')
    })

    this.add.text(320, 25, getPhrase('MONO CAÍ'), this.fuenteTexto)
    

    //////////////////////////////////////////////NIVEL CONDOR//////////////////////////////////////////////
    this.cantidadEstrellasCondor = localStorage.getItem('estrellasCondor') || '1';  
    
    if (this.cantidadEstrellasCondor>this.estrellaMasAltaCondor) 
    {
      this.estrellaMasAltaCondor = this.cantidadEstrellasCondor
    }
    this.add.sprite(360, 325, 'estrellas', this.estrellaMasAltaCondor).setDepth(7).setScale(0.8);
    this.estrellasCondorBonus= localStorage.getItem('estrellasCondorBonus') || '1';
    const buttonNivel3 = this.add.image(360, 300, 'botonNivel').setScale(0.25)
    .setInteractive()
    .on('pointerover', () => buttonNivel3.setScale(0.28))
    .on('pointerout', () => buttonNivel3.setScale(0.25))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    { 
      this.scene.launch('popUpMapa') 
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause() 
      this.scene.get("popUpMapa").mostrarNiveles('condorNiveles')
    })

    this.add.text(280,245, getPhrase('CÓNDOR'), this.fuenteTexto);

    //////////////////////////////////////////////NIVEL BALLENA//////////////////////////////////////////////
    this.cantidadEstrellasBallena = localStorage.getItem('estrellasBallena') || '1';  
    
    if (this.cantidadEstrellasBallena>this.estrellaMasAltaBallena) 
    {
      this.estrellaMasAltaBallena = this.cantidadEstrellasBallena
    }
    this.add.sprite(980, 490, 'estrellas', this.estrellaMasAltaBallena).setDepth(7).setScale(0.8);

    this.estrellasBallenaBonus= localStorage.getItem('estrellasBallenaBonus') || '1';
    const buttonNivel4 = this.add.image(980,470, 'botonNivel').setScale(0.25)
    .setInteractive()
    .on('pointerover', () => buttonNivel4.setScale(0.28))
    .on('pointerout', () => buttonNivel4.setScale(0.25))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    { 
      this.scene.launch('popUpMapa') 
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause() 
      this.scene.get("popUpMapa").mostrarNiveles('ballenaNiveles')
    })

    this.add.text(893,408, getPhrase('BALLENA'), this.fuenteTexto);


    //////////////////////////////////////////////NIVEL PINGUINO//////////////////////////////////////////////
    this.cantidadEstrellasPingui = localStorage.getItem('estrellasPingui') || '1';  
    
    if (this.cantidadEstrellasPingui>this.estrellaMasAltaPingui) 
    {
      this.estrellaMasAltaPingui = this.cantidadEstrellasPingui
    }
    this.add.sprite(375, 675, 'estrellas', this.estrellaMasAltaPingui).setDepth(7).setScale(0.8);

    this.cantidadEstrellasPinguiBonus = localStorage.getItem('estrellasPinguinoBonus') || '1';

    const buttonNivel5 = this.add.image(380,650, 'botonNivel').setScale(0.25)
    .setInteractive()
    .on('pointerover', () => buttonNivel5.setScale(0.28))
    .on('pointerout', () => buttonNivel5.setScale(0.25))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.launch('popUpMapa')
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause() 
      this.scene.get("popUpMapa").mostrarNiveles('pinguinoNiveles')
    })    
    
    this.add.text(295,595, getPhrase('PINGÜINO'), this.fuenteTexto)
    
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
    const estrellasTotales = +this.estrellaMasAltaPingui + +this.estrellaMasAltaYagua + 
    +this.cantidadEstrellasYaguaBonus + +this.cantidadEstrellasPinguiBonus + +this.estrellaMasAltaMono + +this.cantidadEstrellasMonoBonus + +this.cantidadEstrellasBallena + +this.estrellasBallenaBonus + +this.cantidadEstrellasCondor + +this.estrellasCondorBonus
    

    this.add.text(1140, 625,`= ` + estrellasTotales,  
    {fontFamily: 'Titan One',
      fontSize: '40pt',
      color: '#FFBD0D',
      stroke: '#00572f',
      strokeThickness: 6,    	
    })  
  }  
}