// HomeHero.tsx

"use client"
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import React from 'react';
import { CardData } from '@/Data/CardData';

interface Props {
    searchValue: string;
}

function HomeHero(props: Props) {
  const { searchValue } = props;

  // Filter the data based on search value
  const filteredData = CardData.filter((item) =>
    searchValue === "" ||
    item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.description.toLowerCase().includes(searchValue.toLowerCase()) || 
    item.tags.some((tag) => tag.toLowerCase().includes(searchValue.toLowerCase()))  
  );

  return (
    <>
    <BentoGrid className="h-full  overflow-y-scroll scrollbar-hide mt-6  mx-6">
      {filteredData.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          link={item.link} 
          date={item.date}
          tags={item.tags}
        />
      ))}
    </BentoGrid>
    </>
  );
}

export default HomeHero;
