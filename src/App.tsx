import { useEffect, useState } from 'react';

import * as C from './App.styles';

import LogoImage from './assets/logoNaruto.png';
import  IconRestart  from './svgs/restart.svg';

import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItem } from './components/GridItem';

import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { formaTimaElapsed } from './helpers/formatTimeElapsed';


export const App = () => {
  const [playing, setPlaying] = useState<Boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => handleClearBtn(), []);

  useEffect(() => {
    let timer = setInterval(() => {
      if(playing) setTimeElapsed( timeElapsed + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // verificaçao para ver se as cartas sao iguais.
  useEffect(()=> {
    if(showCount === 2 ) {
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2) {
        
        if(opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid) {
            if(tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShowCount(0);
        } else {
          //2. verificacao, se nao for igual eu fecho os dois
         setTimeout(()=>{
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid) {
            tmpGrid[i].shown =false;
          }
          setGridItems(tmpGrid);
          setShowCount(0);
         }, 1000)

        }
        
        
        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [showCount, gridItems])

  //verificação end game.
  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems])

  const handleClearBtn = () => {
    //1. resetar o jogo.
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);
    
    //2. criar o grid.
    //2.1 criar o grid vazio.
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({ item: null, shown: false, permanentShown: false })
    }
    //2.2 preencher o grid.
    for(let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while(pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }
    //2.3 jogar no state.
    setGridItems(tmpGrid)
    //3. começar o jogo.
    setPlaying(true);
  }

  const hendleItemClick = (index: number) => {
    if(playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems];
      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1);
      }
      setGridItems(tmpGrid)
    }
  }
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={LogoImage} width='200' alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value={formaTimaElapsed(timeElapsed)} />
          <InfoItem label='Movimentos' value={moveCount.toString()} />
        </C.InfoArea>

        <Button label='Reiniciar' icon={IconRestart} onClick={handleClearBtn}></Button>
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem 
            key={index}
            item={item}
            onClick={() => hendleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
    )
}

export default App;
