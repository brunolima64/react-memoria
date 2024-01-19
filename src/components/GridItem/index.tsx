import { GridItemType } from '../../types/GridItemType';
import * as C from './styles';

import IconUzumaki from '../../svgs/iconUzumaki.png';
import { items } from '../../data/items'

type Props = {
    item: GridItemType;
    onClick: () => void;
}
export const GridItem = ({ item, onClick }: Props) => {
    return (
        <C.Container 
            shownBackGround={item.permanentShown || item.shown}
            onClick={onClick}
        >
            {item.permanentShown === false && item.shown === false && 
               <C.Icon src={IconUzumaki} alt="" opacity={.8}/>
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt=''/>
            }
        </C.Container>
    )
}