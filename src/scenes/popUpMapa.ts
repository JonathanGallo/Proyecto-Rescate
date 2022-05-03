import Phaser from 'phaser'
import { getPhrase } from '~/services/translation'
export default class popUpMapa extends Phaser.Scene
{  
  //yaguarete
  private cantidadEstrellasYagua:any
  private estrellaMasAltaYagua : number =0
  private textoYaguarete
  private contadorEntrarNivel1:number=0 
  private cerrarBonusYaguarete:number=0 
  private btn:any
  
  //mono
  private cantidadEstrellasMono : any
  private estrellaMasAltaMono : number =0  
  private textoMono   
  private contadorEntrarNivel2:number=0
  private cerrarBonusMono:number=0

  //condor
  private cantidadEstrellasCondor : any
  private estrellaMasAltaCondor: number =0  
  private textoCondor  
  private contadorEntrarNivel3:number=0
  private cerrarBonusCondor:number=0

  //ballena
  private cantidadEstrellasBallena : any
  private estrellaMasAltaBallena: number =0  
  private textoBallena  
  private contadorEntrarNivel4:number=0
  private cerrarBonusBallena:number=0

  //pinguino
  private cantidadEstrellasPingui:any
  private estrellaMasAltaPingui : number =0  
  private textoPinguino   
  private contadorEntrarNivel5:number=0
  private cerrarBonusPinguino:number=0   
  

  private fuenteTextoMapaDesbloqueado =     
  {fontFamily: 'Titan One',
  fontSize: '40pt',
  color: '#FFBD0D',
  stroke: '#00572f',
  strokeThickness: 6,
  align: 'justify',
  };

  private fuenteTextoMapa =     
  {fontFamily: 'Titan One',
  fontSize: '40pt',
  color: '#9b9b9b',
  stroke: '#000000',
  strokeThickness: 4,
  align: 'justify',
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
  
  
  constructor()
  {
    super('popUpMapa');
  }
  
  // texto yaguarete
  public yaguareteBonus(text:any)
  {
    this.textoYaguarete = text
  }

  //texto mono
  public monoNivel(text:any)
  {
    this.textoMono = text
  }
  public monoBonus(text:any)
  {
    this.textoMono = text
  }
  //texto condor
  public condorNivel(text:any)
  {
    this.textoCondor = text
  }
  public condorBonus(text:any)
  {
    this.textoCondor= text
  }  
  //texto ballena
  public ballenaNivel(text:any)
  {
    this.textoBallena = text
  }
  public ballenaBonus(text:any)
  {
    this.textoBallena = text
  }
  //texto pinguino
  public pinguinoNivel(text:any)
  {
    this.textoPinguino = text
  }
  public pinguinoBonus(text:any)
  {
    this.textoPinguino = text
  }

  public ganar()
  {      
    this.textoYaguarete
    this.textoMono
    this.textoCondor
    this.textoBallena
    this.textoPinguino                  
  }
  
  create()
  {
    this.estadoMusica=localStorage.getItem('musicaPlay')|| '0';
    this.sonidoButton = this.sound.add('sonidoBoton');  
    this.add.image(680, 350, 'popUpMapaNiveles').setScale(0.7).setDepth(-1);
    const buttonAtras = this.add.image(900, 250, 'botonatras')
    .setInteractive()
    .on('pointerover', () => buttonAtras.setScale(1.1))
    .on('pointerout', () => buttonAtras.setScale(1))
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
    { 
      this.scene.stop() 
      this.scene.resume('menuMapa') 
      if (this.estadoMusica=='1') 
      {
        this.sfxPlay()
      }
    });     
  }  

  public mostrarNiveles(info:string)
  {
    /////////////////////////////////// YAGUARETÉ////////////////////////////////
    if (info=='yaguareteNiveles') 
    {
      this.cantidadEstrellasYagua = localStorage.getItem('estrellasYaguarete') || '1';  
    
      if (this.cantidadEstrellasYagua>this.estrellaMasAltaYagua) 
      {
        this.estrellaMasAltaYagua = this.cantidadEstrellasYagua
      }      

      const nivelPpalYagua = this.add.text(670, 400, getPhrase('JUGAR'), this.fuenteTextoMapaDesbloqueado)
      .setInteractive()
      nivelPpalYagua.on('pointerover', () => nivelPpalYagua.setScale(1.1))
      .on('pointerout', () => nivelPpalYagua.setScale(1))
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
      {
        this.scene.sleep('menuMapa')  
        this.scene.start('nivelYaguarete')  
        if (this.estadoMusica=='1') 
        {
          this.sfxPlay()
        }
        this.scene.get('menuMapa').detenerMusica()
      })

      this.add.sprite(650, 280, 'estrellas', this.estrellaMasAltaYagua).setScale(1.8) 

      this.yaguareteBonus(this.add.text(420, 400, 'BONUS', this.fuenteTextoMapa))  
      
      if (this.contadorEntrarNivel1>0 && this.cerrarBonusYaguarete>0)
      {       
        this.yaguareteBonus(this.add.text(420, 400, 'BONUS', this.fuenteTextoMapa)
        .removeInteractive())  
      }  
      else if(this.contadorEntrarNivel1>0 && this.cerrarBonusYaguarete<1)
      {
        this.yaguareteBonus(this.add.text(420, 400, 'BONUS', this.fuenteTextoMapaDesbloqueado)
        
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => 
        {  
          this.scene.start('nivelBonus') 
          if (this.estadoMusica=='1') 
          {
            this.sfxPlay()
          }
          this.scene.get('menuMapa').detenerMusica()
        }))            
      }     
    } 

    ///////////////////////////////////MONO/////////////////////

    if (info=='monoNiveles') 
    {
      this.cantidadEstrellasMono = localStorage.getItem('estrellasMono') || '1';  
    
      if (this.cantidadEstrellasMono>this.estrellaMasAltaMono) 
      {
        this.estrellaMasAltaMono = this.cantidadEstrellasMono
      }
      

      this.monoNivel(this.add.text(670, 400, getPhrase('JUGAR'), this.fuenteTextoMapa) &&

      this.add.sprite(650, 280, 'estrellas', this.estrellaMasAltaPingui).setScale(1.8) && 
      
      this.monoBonus(this.add.text(420, 400, 'BONUS', this.fuenteTextoMapa)))

      if (this.estrellaMasAltaYagua>=0) 
      {
        this.monoNivel(this.add.text(670, 400, getPhrase('JUGAR'), this.fuenteTextoMapaDesbloqueado)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
        {
          this.scene.sleep('menuMapa')          
          this.scene.start('nivelMono') 
          if (this.estadoMusica=='1') 
          {
            this.sfxPlay()
          }
          this.scene.get('menuMapa').detenerMusica()
        }).setDepth(7).setVisible(true)) 
      }

      if (this.contadorEntrarNivel2==0 && this.cerrarBonusMono>0)
      {
        this.monoBonus(this.add.text(450, 400, 'BONUS', this.fuenteTextoMapa)
        .removeInteractive())
      }
      else if (this.contadorEntrarNivel2>0 && this.cerrarBonusMono<1)
      {
        this.monoBonus(this.add.text(420, 400, 'BONUS', this.fuenteTextoMapaDesbloqueado)
        .setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
        { 
          this.scene.start('nivelBonusMono') 
          if (this.estadoMusica=='1') 
          {
            this.sfxPlay()
          }
          this.scene.get('menuMapa').detenerMusica()
        }).setDepth(7).setVisible(true))
      }
    }  

    ///////////////////////////////////CONDOR//////////////////
    if (info=='condorNiveles')
    {
      this.cantidadEstrellasCondor = localStorage.getItem('estrellasCondor') || '1';  
    
      if (this.cantidadEstrellasCondor>this.estrellaMasAltaCondor) 
      {
        this.estrellaMasAltaCondor= this.cantidadEstrellasCondor
      }            

      this.condorNivel(this.add.text(670, 400, getPhrase('JUGAR'), this.fuenteTextoMapa) &&

      this.add.sprite(650, 290, 'estrellas', this.estrellaMasAltaCondor).setScale(1.8) && 
      
      this.condorBonus(this.add.text(440, 400, 'BONUS', this.fuenteTextoMapa)))

      if (this.estrellaMasAltaCondor>=0) 
      {
        this.condorNivel(this.add.text(670, 400, getPhrase('JUGAR'), this.fuenteTextoMapaDesbloqueado)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
        {
          this.scene.sleep('menuMapa') /* duermo el mapa para guardar datos */ 
          this.scene.start('nivelCondor') 
          if (this.estadoMusica=='1') 
          {
          this.sfxPlay()
          }
          this.scene.get('menuMapa').detenerMusica()
        }).setDepth(7).setVisible(true)) 
      } 

      if (this.contadorEntrarNivel3==0 && this.cerrarBonusCondor>0)
      {
        this.condorBonus(this.add.text(440, 400, 'BONUS', this.fuenteTextoMapa)
        .removeInteractive())
      }
      else if (this.contadorEntrarNivel3>0 && this.cerrarBonusCondor<1)
      {
        this.condorBonus(this.add.text(440, 400, 'BONUS', this.fuenteTextoMapaDesbloqueado)
        .setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
        { 
          this.scene.start('nivelBonusCondor') 
          if (this.estadoMusica=='1') 
          {
            this.sfxPlay()
          }
          this.scene.get('menuMapa').detenerMusica()
        }).setDepth(7).setVisible(true))
      }
    }

    ///////////////////////////////////BALLENA//////////////////
    if (info=='ballenaNiveles')
    {
      this.cantidadEstrellasBallena = localStorage.getItem('estrellasBallena') || '1';  
    
      if (this.cantidadEstrellasBallena>this.estrellaMasAltaBallena) 
      {
        this.estrellaMasAltaBallena= this.cantidadEstrellasBallena
      }            

      this.ballenaNivel(this.add.text(670, 400, getPhrase('JUGAR'), this.fuenteTextoMapa) &&

      this.add.sprite(650, 290, 'estrellas', this.estrellaMasAltaBallena).setScale(1.8) && 
      
      this.ballenaBonus(this.add.text(440, 400, 'BONUS', this.fuenteTextoMapa)))

      if (this.estrellaMasAltaBallena>=0) 
      {
        this.ballenaNivel(this.add.text(670, 400, getPhrase('JUGAR'), this.fuenteTextoMapaDesbloqueado)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
        {
          this.scene.sleep('menuMapa') /* duermo el mapa para guardar datos */ 
          this.scene.start('nivelBallena_2') 
          if (this.estadoMusica=='1') 
          {
          this.sfxPlay()
          }
          this.scene.get('menuMapa').detenerMusica()
        }).setDepth(7).setVisible(true)) 
      }

      if (this.contadorEntrarNivel4>0 && this.cerrarBonusBallena>0)
      {
        this.ballenaBonus(this.add.text(440, 400, 'BONUS', this.fuenteTextoMapa)
        .removeInteractive())
      }
      else if (this.contadorEntrarNivel4>0 && this.cerrarBonusBallena<1)
      {
        this.ballenaBonus(this.add.text(440, 400, 'BONUS', this.fuenteTextoMapaDesbloqueado)
        .setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
        { 
          this.scene.start('nivelBonusBallena') 
          if (this.estadoMusica=='1') 
          {
            this.sfxPlay()
          }
          this.scene.get('menuMapa').detenerMusica()
        }).setDepth(7).setVisible(true))
      }
    }

    ///////////////////////////////////PINGÜINO//////////////////
 
    if (info=='pinguinoNiveles')
    {
      this.cantidadEstrellasPingui = localStorage.getItem('estrellasPingui') || '1';  
    
      if (this.cantidadEstrellasPingui>this.estrellaMasAltaPingui) 
      {
        this.estrellaMasAltaPingui = this.cantidadEstrellasPingui
      }            

      this.pinguinoNivel(this.add.text(670, 400, getPhrase('JUGAR'), this.fuenteTextoMapa) &&

      this.add.sprite(650, 280, 'estrellas', this.estrellaMasAltaPingui).setScale(1.8) && 
      
      this.pinguinoBonus(this.add.text(420, 400, 'BONUS', this.fuenteTextoMapa)))

      if (this.estrellaMasAltaMono>=0) 
      {
        this.pinguinoNivel(this.add.text(670, 400, getPhrase('JUGAR'), this.fuenteTextoMapaDesbloqueado)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
        {
          this.scene.sleep('menuMapa') /* duermo el mapa para guardar datos */ 
          this.scene.start('nivelPinguino') 
          if (this.estadoMusica=='1') 
          {
          this.sfxPlay()
          }
          this.scene.get('menuMapa').detenerMusica()
        }).setDepth(7).setVisible(true)) 
      }

      if (this.contadorEntrarNivel5==0 && this.cerrarBonusPinguino>0)
      {
        this.pinguinoBonus(this.add.text(420, 400, 'BONUS', this.fuenteTextoMapa)
        .removeInteractive())
      }
      else if (this.contadorEntrarNivel5>0 && this.cerrarBonusPinguino<1)
      {
        this.pinguinoBonus(this.add.text(420, 400, 'BONUS', this.fuenteTextoMapaDesbloqueado)
        .setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>
        { 
          this.scene.start('nivelBonusPin') 
          if (this.estadoMusica=='1') 
          {
            this.sfxPlay()
          }
          this.scene.get('menuMapa').detenerMusica()
        }).setDepth(7).setVisible(true))
      }
    }

    
    
  }
  /////////////////////// NIVEL 1 + Bonus //////////////////

  public aumentaContador1()
  {
    this.contadorEntrarNivel1++    
  } 
  public yaEntroBonusYaguarete()
  {
    this.cerrarBonusYaguarete++     
  }
  /////////////////////// NIVEL 2 + Bonus //////////////////
  public aumentaContador2()
  {
    this.contadorEntrarNivel2++
  }  
  public yaEntroBonusMono()
  {
    this.cerrarBonusMono++
  }
  /////////////////////// NIVEL 3 + Bonus //////////////////
  public aumentaContador3()
  {
    this.contadorEntrarNivel3++
  }  
  public yaEntroBonusCondor()
  {
    this.cerrarBonusCondor++
  }
  /////////////////////// NIVEL 4 + Bonus //////////////////
  public aumentaContador4()
  {
    this.contadorEntrarNivel4++
  }  
  public yaEntroBonusBallena()
  {
    this.cerrarBonusBallena++
  }
  /////////////////////// NIVEL 5 + Bonus //////////////////
  
  public aumentaContador5()
  {
    this.contadorEntrarNivel5++
  }  
  public yaEntroBonusPinguino()
  {
    this.cerrarBonusPinguino++
  }
}

