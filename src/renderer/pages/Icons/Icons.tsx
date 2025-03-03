import React, { useEffect, useState, useMemo } from 'react';

import { Checkbox, Dropdown, Textbox, SummonerIcon } from 'component-lib';

import { request } from '../../ipcBridge';

import './Icons.scss';
import { useLcuData } from '../../LcuContext';

// some icons end on 404???
const ICON_DATA_URL =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-icons.json';

type Icon = {
  id: number;
  title: string;
  isLegacy: boolean;
};

const Icons: React.FC = () => {
  const [iconData, setIconData] = useState<Icon[]>([]);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [legacyFilter, setLegacyFilter] = useState<boolean>(true);
  const lcuData = useLcuData();

  const filter1 = useMemo(
    () =>
      iconData.filter((i) =>
        i.title.toLowerCase().includes(titleFilter.toLowerCase())
      ),
    [iconData, titleFilter]
  );
  const filter2 = useMemo(
    () =>
      legacyFilter ? filter1 : filter1.filter((i) => i.isLegacy === false),
    [filter1, legacyFilter]
  );

  const setIcon = (id: number) => {
    const body = { icon: id };

    if (id === lcuData.me.icon) return;

    request('PUT', '/lol-chat/v1/me', body).then(
      (response) => {
        console.log(response);
      },
      (reason) => {}
    );
  };

  useEffect(() => {
    const fetchIconData = async () => {
      const response = await fetch(ICON_DATA_URL);
      const data = await response.json();

      const icons = data.map((icon: any) => ({
        id: icon.id,
        title: icon.title,
        isLegacy: icon.isLegacy,
      }));

      setIconData(icons);
    };

    fetchIconData();
  }, []);

  return (
    <div className='icons-page'>
      <div className='filter'>
        <Textbox
          placeholder='Search..'
          onInput={(event) =>
            setTitleFilter((event.target as HTMLInputElement).value)
          }
        />
        <div className='settings'>
          <Dropdown items={['All', 'Favorites']} initialItem='All' />
          <Checkbox
            initialState={legacyFilter}
            title='Legacy'
            onChange={(value) => setLegacyFilter(value)}
          />
        </div>
        <span style={{ color: 'white' }}>
          Showing <b>{filter2.length}</b> / {iconData.length} icons
        </span>
      </div>
      <div className='icons'>
        {filter2.map((icon) => (
          <SummonerIcon
            key={icon.id}
            iconId={icon.id}
            size={80}
            selected={lcuData.me.icon === icon.id}
            onClick={() => setIcon(icon.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Icons;
