import Phaser from 'phaser'
import { getPhrase } from '~/services/translation';
import preguntas from '~/scenes/preguntas';
export default class bonusBallena extends Phaser.Scene{
  
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
  private estadoMusica:any;
  private sonidoButton:any;
  public sfxDetenido()
  {
    this.sonidoButton.stop()
  }
  public sfxPlay()
  {
    this.sonidoButton.play({volume:0.5})
  }
  
  private musicaBonus:any
  public musicaPlay()
  {
    this.musicaBonus.play({volume:0.2})
  } 
  
  public detenerMusica()
  {  
    this.musicaBonus.stop()            
  }

  constructor()
  {
    super('nivelBonusBallena');
  }

  preload()
  {
    this.load.image('Bonus', 'assets/Mapa/BonusYaguarete/NivelBonus.png');
    this.load.image('Ballena', 'assets/Mapa/BonusBallena/bonusBallena.png');
    
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

    const buttonAtras = this.add.image(1260, 105, 'botonatras')
    .setInteractive()
    .on('pointerover', () => buttonAtras.setScale(1.1))
    .on('pointerout', () => buttonAtras.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.start('menuMapa') 
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.detenerMusica()
    })

    const portada = this.add.image(685, 235, 'Ballena').setScale(1.01);
    
    
    let preguntasBonus= new Array<preguntas>()
    preguntasBonus.push(new preguntas
    (getPhrase('                                                    La Ballena Franca es...'), 
    getPhrase('Un mamífero'),
    getPhrase('Un anfibio'),
    getPhrase('Un pez'),
    getPhrase('Un ave')))
    
    const text_pregunta = this.add.text(130, 390, preguntasBonus[0].pregunta, this.fuenteTextoPreg);

    preguntasBonus[0].respuestasRandom()

    ////////////////////////////////////////////////////////BOTONES///////////////////////////////////////////////////////
    
    let botonA= this.add.text(150, 513, preguntasBonus[0].devolverPregunta()+"", this.fuenteTexto).setDepth(3) 
    this.add.image(400, 535, 'botonGris').setScale(0.83)
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {
      botonA.setColor(this.scene.launch('pop_up_B_Ballena') &&        
      this.scene.get("pop_up_B_Ballena").mostrar_Texto(preguntasBonus[0].revisarResp(botonA.text)))
      botonB.setColor(preguntasBonus[0].revisarResp(botonB.text))
      botonC.setColor(preguntasBonus[0].revisarResp(botonC.text))
      botonD.setColor(preguntasBonus[0].revisarResp(botonD.text))
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause()
    })

    
    let botonB = this.add.text(800, 513, preguntasBonus[0].devolverPregunta()+"", this.fuenteTexto).setDepth(3) 
    this.add.image(1045, 535, 'botonGris').setScale(0.83)
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {
      botonB.setColor(this.scene.launch('pop_up_B_Ballena') &&        
      this.scene.get("pop_up_B_Ballena").mostrar_Texto(preguntasBonus[0].revisarResp(botonB.text)))
      botonA.setColor(preguntasBonus[0].revisarResp(botonA.text))
      botonC.setColor(preguntasBonus[0].revisarResp(botonC.text))
      botonD.setColor(preguntasBonus[0].revisarResp(botonD.text))
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
      this.scene.pause()
    })

    let botonC = this.add.text(150, 655, preguntasBonus[0].devolverPregunta()+"", this.fuenteTexto).setDepth(3) 
    this.add.image(400, 680, 'botonGris').setScale(0.83)
    .setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
    {
      botonC.setColor(this.scene.launch('pop_up_B_Ballena') &&       
      this.scene.get("pop_up_B_Ballena").mostrar_Texto(preguntasBonus[0].revisarResp(botonC.text)))
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
      botonD.setColor(this.scene.launch('pop_up_B_Ballena') &&        
      this.scene.get("pop_up_B_Ballena").mostrar_Texto(preguntasBonus[0].revisarResp(botonD.text))) 
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