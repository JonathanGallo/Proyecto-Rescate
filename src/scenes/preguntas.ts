import arrayShuffle from 'array-shuffle';
import Phaser from 'phaser'
export default class preguntas extends Phaser.Scene {
  private _pregunta: string
  private respuestaCorrecta: string
  private respuestasIncorrectas: Array<string>
  private estadoMusica:any

  constructor(pregunta: string, respuestaCorrecta: string, respuestaIncorrecta1: string, respuestaIncorrecta2: string, respuestaIncorrecta3: string)
  {
    super('preguntasBonus')
    this._pregunta=pregunta
    this.respuestaCorrecta=respuestaCorrecta
    this.respuestasIncorrectas=new Array<string>()

    this.respuestasIncorrectas.push(respuestaIncorrecta1)
    this.respuestasIncorrectas.push(respuestaIncorrecta2)
    this.respuestasIncorrectas.push(respuestaIncorrecta3)
    this.respuestasIncorrectas.push(respuestaCorrecta) 
  }
  
  public respuestasRandom()
  {
    this.respuestasIncorrectas = arrayShuffle(this.respuestasIncorrectas)
  }

  public devolverPregunta(): string|undefined 
  {
    return this.respuestasIncorrectas.pop()
  }

  public revisarResp(respuestaJuego: string): string
  {
    if (respuestaJuego == this.respuestaCorrecta) 
    {    
      return 'green'           
    } 
    return 'red'    
  }

  public set pregunta(v : string) {
    this._pregunta = v;
  }  
  
  public get pregunta() : string {
    return this._pregunta
  }  
}