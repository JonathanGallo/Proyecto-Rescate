import 'regenerator-runtime/runtime'
import Phaser from 'phaser'
import precarga from './scenes/precarga'
import logoUnraf from './scenes/logoUnraf'
import ayuda from './scenes/ayuda'
import creditos from './scenes/creditos'
import info from './scenes/informacion'
import mapa from './scenes/mapa'
import mp1 from './scenes/mp'
import extras from './scenes/extras/extras'
import pop_upExt from './scenes/extras/pop_upExtras'
import popUpMapa from './scenes/popUpMapa'
import popUpInformativo from './scenes/popUpInformativo'
import creditosMusica from './scenes/creditosMusica'
import idioma from './scenes/idioma'
import preguntas from '~/scenes/preguntas';

//NIVEL YAGUARETE
import nivel_1 from './scenes/nivel1/nivel1'
import bonus from './scenes/nivel1/nivelBonus/nivelBonus'
import gameOver from './scenes/nivel1/gameOver'
import gameWin from './scenes/nivel1/gameWin'
import pop_up from './scenes/nivel1/nivelBonus/pop_up_Bonus'
import pause from './scenes/nivel1/pause'
import UI from './scenes/nivel1/UI'

//NIVEL MONO
import nivel_2 from './scenes/nivel2/nivel2'
import pauseMono from './scenes/nivel2/pause'
import UI_Mono from './scenes/nivel2/UI_Mono'
import gameOverMono from './scenes/nivel2/gameOver'
import gameWinMono from './scenes/nivel2/gameWin'
import bonusMono from './scenes/nivel2/nivelBonus/nivelBonusMono'
import pop_up_BonusMono from './scenes/nivel2/nivelBonus/pop_up_BonusMono'


//NIVEL CONDOR
import nivel_3 from './scenes/nivel3/nivel3'
import UI_Condor from './scenes/nivel3/UI_Condor'
import gameWinCondor from './scenes/nivel3/gameWin'
import gameOverCondor from './scenes/nivel3/gameOver'
import pauseCondor from './scenes/nivel3/pause'
import nivelBonusCondor from './scenes/nivel3/nivelBonus/nivelBonusCondor'
import pop_up_BonusCondor from './scenes/nivel3/nivelBonus/pop_up_BonusCondor'


//NIVEL BALLENA
import nivel_4 from './scenes/nivel4/nivel4'
import UI_Ballena from './scenes/nivel4/UI_Ballena'
import gameWinBallena from './scenes/nivel4/gameWin'
import gameOverBallena from './scenes/nivel4/gameOver'
import pauseBallena from './scenes/nivel4/pause'
import nivel_4_2 from './scenes/nivel4/nivel4_2'
import nivelBonusBallena from './scenes/nivel4/nivelBonus/nivelBonusBallena'
import pop_up_B_Ballena from './scenes/nivel4/nivelBonus/pop_up_BonusBallena'


//NIVEL PINGUINO
import nivel_5 from './scenes/nivel5/nivel5'
import gameWinPinguino from './scenes/nivel5/gameWin'
import gameOverPinguino from './scenes/nivel5/gameOver'
import UI_Pinguino from './scenes/nivel5/UI_Pinguino'
import pausePinguino from './scenes/nivel5/pause'
import bonusPingui from './scenes/nivel5/nivelBonus/nivelBonusPingui'
import pop_up_Pingui from './scenes/nivel5/nivelBonus/pop_up_BonusPin'




localStorage.clear();

const config : Phaser.Types.Core.GameConfig =
{
  type: Phaser.WEBGL,
  scale: 
  {
    mode: Phaser.Scale.FIT,
    width: 1366,
    height: 768,
  },
  physics: 
  {
    default: 'matter',
    matter:
    {
      gravity: { y: 10 },
      debug: false
    }
  },
  scene: [logoUnraf, precarga, mp1, info, mapa, ayuda, creditos, creditosMusica,extras, 
    nivel_1, UI, gameOver, gameWin, pause, bonus, pop_up, pop_upExt, popUpMapa, 
    nivel_5, UI_Pinguino, gameWinPinguino, gameOverPinguino, pausePinguino, bonusPingui, pop_up_Pingui,  
    nivel_2, UI_Mono, gameWinMono, gameOverMono, pauseMono, popUpInformativo, bonusMono, pop_up_BonusMono, idioma,
    nivel_4, nivel_4_2, UI_Ballena, gameWinBallena, gameOverBallena, pauseBallena, nivelBonusBallena, pop_up_B_Ballena, 
    nivel_3, UI_Condor, gameWinCondor, gameOverCondor, pauseCondor, nivelBonusCondor, pop_up_BonusCondor, preguntas
  ]
};

export default new Phaser.Game(config)
//Yaguarete
localStorage.setItem('estrellasYaguarete', '0');
localStorage.setItem('estrellasYaguareteBonus', '0');
//Mono
localStorage.setItem('estrellasMono', '0');
localStorage.setItem('estrellasMonoBonus', '0');
//Condor
localStorage.setItem('estrellasCondor', '0');
localStorage.setItem('estrellasCondorBonus', '0');
//Ballena
localStorage.setItem('estrellasBallena', '0');
localStorage.setItem('estrellasBallenaBonus', '0');
//Pinguino
localStorage.setItem('estrellasPingui', '0');
localStorage.setItem('estrellasPinguinoBonus', '0');//Musica
localStorage.setItem('musicaPlay', '1');


