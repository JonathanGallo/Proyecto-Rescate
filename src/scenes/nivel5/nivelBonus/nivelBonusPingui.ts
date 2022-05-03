import Phaser from 'phaser'
import preguntas from '~/scenes/preguntas';
import { getPhrase } from '~/services/translation';
export default class bonusPingui extends Phaser.Scene

{ 
  private fuenteTexto =     
  {fontFamily: 'Viga',
  fontSize: '30pt',
  color: '#000000',
  align: 'center'
  };

  private fuenteTextoPreg =     
  {fontFamily: 'Viga',
  fontSize: '25pt',
  color: '#000000',
  align: 'center'
  };
  private estadoMusica:any
  private musicaBonus:any
  public musicaPlay()
  {
    this.musicaBonus.play({volume:0.2})
  } 
  
  public detenerMusica()
  {  
    this.musicaBonus.stop()            
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

  constructor()
  {
    super('nivelBonusPin');
  }

  preload()
  {
    this.load.image('Bonus', 'assets/Mapa/BonusPinguino/NivelBonus.png');
    this.load.image('pinguiBonus', 'assets/Mapa/BonusPinguino/PinguiConCria.png');
    this.load.image('pinguinoPic', 'assets/Mapa/BonusPinguino/Pinguino1.png');
  }

  create()
  {  
    this.musicaBonus= this.sound.add('Bonus')
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    if (this.estadoMusica=='1') 
    {
      this.musicaPlay()
    }
    this.sonidoButton = this.sound.add('sonidoBoton');

    const fondoBonus = this.add.image(683, 384, 'Bonus');

    const buttonAtras = this.add.image(1260, 105, 'botonatras').setScale(0.8)
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('menuMapa')
      {
        this.sfxPlay()
      } 
      this.detenerMusica()
    })

    const portada = this.add.image(874, 235, 'pinguinoPic').setScale(0.45);
    const portada2 = this.add.image(496, 235, 'pinguiBonus').setScale(1.25);
    
    let preguntasBonus= new Array<preguntas>()
    preguntasBonus.push(new preguntas
    (getPhrase('                 ¿En dónde habita el pingüino de Magallanes en Argentina?'), 
    getPhrase('Sur Argentino'),
    getPhrase('Noroeste Argentino'),
    getPhrase('Oeste Argentino'),
    getPhrase('Noreste Argentino')))
    
    const text_pregunta = this.add.text(130, 390, preguntasBonus[0].pregunta, this.fuenteTextoPreg);

    preguntasBonus[0].respuestasRandom()

    ////////////////////////////////////////////////////////BOTONES//////////////////////////////////////////////////////////////////////////////////
    
    let botonA= this.add.text(150, 513, preguntasBonus[0].devolverPregunta()+"", this.fuenteTexto).setDepth(3) 
    this.add.image(400, 535, 'botonGris').setScale(0.83)
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      botonA.setColor(this.scene.launch('pop_up_B_Pin') &&
      this.scene.get("pop_up_B_Pin").mostrar_Texto(preguntasBonus[0].revisarResp(botonA.text)))
      botonB.setColor(preguntasBonus[0].revisarResp(botonB.text))
      botonC.setColor(preguntasBonus[0].revisarResp(botonC.text))
      botonD.setColor(preguntasBonus[0].revisarResp(botonD.text))
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause()
    })

    
    let botonB = this.add.text(150, 655, preguntasBonus[0].devolverPregunta()+"", this.fuenteTexto).setDepth(3) 
    this.add.image(1045, 535, 'botonGris').setScale(0.83)
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    {
      botonB.setColor(this.scene.launch('pop_up_B_Pin') &&      
      this.scene.get("pop_up_B_Pin").mostrar_Texto(preguntasBonus[0].revisarResp(botonB.text)))
      botonA.setColor(preguntasBonus[0].revisarResp(botonA.text))
      botonC.setColor(preguntasBonus[0].revisarResp(botonC.text))
      botonD.setColor(preguntasBonus[0].revisarResp(botonD.text))
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause()
    })

    let botonC = this.add.text(800, 513, preguntasBonus[0].devolverPregunta()+"", this.fuenteTexto).setDepth(3) 
    this.add.image(400, 680, 'botonGris').setScale(0.83)
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    {
      botonC.setColor(this.scene.launch('pop_up_B_Pin') &&       
      this.scene.get("pop_up_B_Pin").mostrar_Texto(preguntasBonus[0].revisarResp(botonC.text))) 
      botonB.setColor(preguntasBonus[0].revisarResp(botonB.text))
      botonA.setColor(preguntasBonus[0].revisarResp(botonA.text))
      botonD.setColor(preguntasBonus[0].revisarResp(botonD.text))
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause()
    })

    let botonD= this.add.text(800, 655, preguntasBonus[0].devolverPregunta()+"", this.fuenteTexto).setDepth(3) 
    this.add.image(1045, 680, 'botonGris').setScale(0.83)
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    {
      botonD.setColor(this.scene.launch('pop_up_B_Pin') &&      
      this.scene.get("pop_up_B_Pin").mostrar_Texto(preguntasBonus[0].revisarResp(botonD.text)))
      botonB.setColor(preguntasBonus[0].revisarResp(botonB.text))
      botonC.setColor(preguntasBonus[0].revisarResp(botonC.text))
      botonA.setColor(preguntasBonus[0].revisarResp(botonA.text))
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause()
    })  
  }  
}