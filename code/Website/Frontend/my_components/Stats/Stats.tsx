import React, { useState } from 'react'
import StatsHero from './StatsHero'
import HomeTop from '../Home/HomeTop'

function Stats() {
    const [searchValue2, setSearchString2] = useState('');  // search state
    return (
        <div className='flex-grow flex flex-col width-full h-full'>
            <HomeTop searchValue={searchValue2} setSearchString={setSearchString2}/>
            <StatsHero searchValue={searchValue2}/>
        </div>
    )
}

export default Stats