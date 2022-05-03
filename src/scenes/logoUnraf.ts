import Phaser from 'phaser';
export default class logoUnraf extends Phaser.Scene
{
  private logo: any
  private tempo = 0
  preload(){    
      //////////// Todo del menu principal    
      this.load.image('menu', 'assets/MenuPrincipal/menuPpal.png');
      this.load.image('botonPlay', 'assets/MenuPrincipal/Botones/botonPlay.png');
      this.load.image('botonDesbloqueable', 'assets/MenuPrincipal/Botones/botonDesbloqueable.png');
      this.load.image('botonInfo', 'assets/MenuPrincipal/Botones/botonInfo.png');
      this.load.image('botonMusica', 'assets/MenuPrincipal/Botones/botonSonido.png');
      this.load.image('botonReset', 'assets/MenuPrincipal/Botones/botonReset.png');
      this.load.image('botonMapa', 'assets/MenuPrincipal/Botones/botonMapa.png');
      this.load.image('botonatras', 'assets/MenuPrincipal/Botones/botonAtras.png');
      this.load.image('botonPausa', 'assets/MenuPrincipal/Botones/botonPausa.png');
      this.load.image('botonIdiomaEspañol', 'assets/MenuPrincipal/bandera.png');
      this.load.image('mapaArgentina', 'assets/Mapa/mapa.png');
      this.load.image('botonMenuPpal', 'assets/MenuPrincipal/Botones/botonMenu.png');
      this.load.image('creditosMusica', 'assets/MenuPrincipal/Botones/botonCreditosMusica.png');
      //Menu Limpio
      this.load.image('fondoLimpio', 'assets/MenuPrincipal/fondoLimpio.png');
              //Menu Informacion
      this.load.image('menuInfo', 'assets/MenuPrincipal/MenuInformacion.png');
             //Menu ayuda
      this.load.image('menuAyuda','assets/MenuPrincipal/MenuAyuda.png');
              //Menu creditos
      this.load.image('menuCreditos','assets/MenuPrincipal/MenuCreditos.png');
      
    this.load.atlas('logoUnraf' , 'assets/Precarga/logoUnraf.png', 'assets/Precarga/logoUnraf.json');
    
  }

  create(){
    setTimeout(() => {
      this.logo = this.add.sprite(683, 383, "logoUnraf").setScale(6);
      this.logo.play("moveUnraf");
    }, 50);  
    this.animation()
  }

  update(time, delta){
    this.tempo += delta
    if (this.tempo >= 3000){
      this.scene.start('precarga'); 
    }
  }
  
  private animation(){
    this.anims.create({
      key: 'moveUnraf',
      frames: this.anims.generateFrameNames('logoUnraf', {
        start: 1,
        end: 40,
        prefix: 'logoNro0',
        suffix: '.png'
      }),
      frameRate: 15
    })
}
  
}