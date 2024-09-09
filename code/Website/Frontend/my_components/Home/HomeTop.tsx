import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'

interface Props {
    searchValue: string;
    setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

function HomeTop(props: Props) {
    const { searchValue, setSearchString } = props;
    return (
        <div className="width-[100%] flex h-[9%] cursor-pointer items-center justify-end font-medium border-b-1 border-textColorDark">
            <div className='flex items-center justify-between w-[65%] gap-[15%]'>
                {/* search bar */}
                <div className='w-[40%] '>
                    <Input
                        className='text-textColorDark'
                        variant='faded'
                        isClearable
                        radius="sm"
                        placeholder="Search anything"
                        startContent={
                            <div>
                            <img src="../icons/search.png" className="w-[15px]" alt="logo" />
                            </div>
                        }
                        value={searchValue}
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                </div>
                {/* profile */}
                <div className='w-[38%] flex gap-2 justify-end mr-2'>
                    <Button isIconOnly radius='none' className="bg-secondaryColor rounded-[50%]">
                        <img src="../icons/notification.png" alt="" width={20}/>
                    </Button>
                    <Button isIconOnly radius='none' className="bg-secondaryColor rounded-[50%]">
                        <img src="../icons/fire.png" alt="" width={20}/>
                    </Button>
                    <Button isIconOnly radius='none' className="bg-secondaryColor rounded-[50%]">
                        <img src="../icons/flash.png" alt="" width={20}/>
                    </Button>
                    <Button isIconOnly className="bg-secondaryColor rounded-[50%]">
                        <img src="../icons/avatar1.png" alt="" width={30}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HomeTop
