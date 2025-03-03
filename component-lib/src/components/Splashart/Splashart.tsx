import React from 'react';

import { SplashartProps } from './Splashart.types';
import styles from './Splashart.module.scss';

const Splashart = React.forwardRef<HTMLDivElement, SplashartProps & React.HTMLAttributes<HTMLDivElement>>(
  ({skinId, selected, favorite, ...props}, ref) => {
    const championId: number = Math.floor(skinId / 1000);

    return (
      <div
        {...props}
        ref={ref}
        className={styles.splashart}
        data-selected={selected}
        data-favorite={favorite}
      >
        <img
          loading='lazy'
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${championId}/${skinId}.jpg`}
        ></img>
      </div>
    );
  }
);


export default Splashart;
