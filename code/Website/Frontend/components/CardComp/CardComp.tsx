import React from 'react'
// import { CardData, CardSchema } from '@/Data/CardData'
import { Card } from '@nextui-org/react';
interface Props{
    title: string;
    date: string;
    time: string;
    url: string;
    tldr: string;
    tags: string[];
}

function CardComp(props: Props) {
    const {title, date, time, url} = props;

    return (
        <>
            <Card className='bg-'>

            </Card>
        </>
    )
}

export default CardComp
