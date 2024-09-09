import { Button } from '@nextui-org/react'
import React from 'react'

function DemoCard() {
    return (
        <div className='hide-on-mobile ml-12 gap-8 flex flex-col justify-between w-1/4'>
            <div>
                <div
                className='
                text-4xl
                text-textColorLight
                georama-b
                '
                >
                    <p>Detecting</p> 
                    <p className='text-nowrap'>and reporting</p> 
                    <p>cyber events!</p>
                </div>
                <p className='text-xs text-color2'>We help you get medical care in the best and most efficient way possible!</p>
            </div>
            <div>
                <p className='text-xs text-color2'>Wanna know more?</p>
                <Button 
                color="default" 
                variant="bordered"
                radius="md"
                size="sm"
                >Read</Button> 
            </div>
        </div>
    )
}

export default DemoCard
