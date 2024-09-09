import React, { useState } from 'react';
import HomeTop from './HomeTop';
import HomeHero from './HomeHero';

function Home() {
  const [searchValue, setSearchString] = useState('');  // search state

  return (
    <div className='flex-grow flex flex-col width-full h-full'>
      <HomeTop searchValue={searchValue} setSearchString={setSearchString} />
      <HomeHero searchValue={searchValue} />
    </div>
  );
}

export default Home;
