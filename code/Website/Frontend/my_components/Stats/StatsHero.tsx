import {Button, Image} from "@nextui-org/react";
import React from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Link} from "@nextui-org/react";

const imageDataArray: Array<{
    id: number;
    name: string;
    source: string;
    description: string;
}> = [
    {
      id: 1,
      name: "Social Media",
      source: "../images/socialMedia.png",
      description: "Social media perspective of the company in public from web reports."
    },
    {
      id: 2,
      name: "Threat Frequency",
      source: "../images/BMI.svg",
      description: "The frequency of high alert threats in the past year."
    },
    {
      id: 3,
      name: "Server",
      source: "../images/server.svg",
      description: "Depiction of server load."
    },
    {
      id: 4,
      name: "Relevant Tags",
      source: "../images/threats.svg",
      description: "Frequency of relevance of tags in posts around the company."
    },
    {
      id: 5,
      name: "Opponent",
      source: "../images/opponent.svg",
      description: "Representation of competitive analysis or market competitors in the social space"
    },
    {
    id: 6,
    name: "Social Media",
    source: "../images/socialMedia.png",
    description: "Social media perspective of the company in public from web reports."
    },
    {
    id: 7,
    name: "Threat Frequency",
    source: "../images/BMI.svg",
    description: "The frequency of high alert threats in the past year."
    },
    {
    id: 8,
    name: "Server",
    source: "../images/server.svg",
    description: "Depiction of server load."
    },
    {
    id: 9,
    name: "Relevant Tags",
    source: "../images/threats.svg",
    description: "Frequency of relevance of tags in posts around the company."
    },
    {
    id: 10,
    name: "Opponent",
    source: "../images/opponent.svg",
    description: "Representation of competitive analysis or market competitors in the social space"
    },
    {
    id: 11,
    name: "Social Media",
    source: "../images/socialMedia.png",
    description: "Social media perspective of the company in public from web reports."
    },
    {
    id: 12,
    name: "Threat Frequency",
    source: "../images/BMI.svg",
    description: "The frequency of high alert threats in the past year."
    },
    {
    id: 13,
    name: "Server",
    source: "../images/server.svg",
    description: "Depiction of server load."
    },
    {
    id: 14,
    name: "Relevant Tags",
    source: "../images/threats.svg",
    description: "Frequency of relevance of tags in posts around the company."
    },
    {
    id: 15,
    name: "Opponent",
    source: "../images/opponent.svg",
    description: "Representation of competitive analysis or market competitors in the social space"
    }
];

interface Props {
    searchValue: string;
}

function StatsHero(props: Props) {
    const { searchValue } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [imageID, setImageID] = React.useState(0);
    // Filter the data based on search value
    const filteredData = imageDataArray.filter((item) =>
        searchValue === "" ||
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (
        <>
        <div className="grid grid-cols-3 gap-4 h-[90vh] m-8 overflow-y-scroll scrollbar-hide">
            {filteredData.map((item, i) => (
                <Image isBlurred src={item.source} alt="NextUI Album Cover" width={500} height={600} key={item.id} onClick={()=>{
                    setImageID(item.id);
                    onOpen();
                }}/>
            ))}
        </div>
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            size="2xl"
        >
            <ModalContent className="bg-secondaryColor">
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1 text-textColorLight">
                    {/* {imageDataArray[imageID].name} */}
                </ModalHeader>
                <ModalBody>
                    <div className="flex gap-4 overflow-y-scroll scrollbar-hide">
                        <Image src={imageDataArray[imageID-1].source} alt="NextUI Album Cover" width={800} className="max-w-[400px]"/>
                        <p className='text-textColorLight'>{imageDataArray[imageID-1].description}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button isIconOnly className="bg-purple-400 text-textColorDark" variant="flat" onPress={() => {
                        const imageUrl = `/images/${imageDataArray[imageID-1].source.split('/').pop() ?? "downloaded_image.png"}`;  // Ensure imageUrl is a string
                        
                        // Create a temporary anchor element
                        const link = document.createElement('a');
                        link.href = imageUrl;                 
                        link.download = imageUrl.split('/').pop() ?? "downloaded_image.png";  // Ensure valid file name
                        
                        // Append to the DOM, trigger the click, and remove the element
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}>
                        <img src="../icons/download.png" alt="download" className="w-[20px] h-[20px]"/>
                    </Button>
                    <Button className="bg-transparent text-textColorLight border-1 border-textColorDark" variant="flat" onPress={async()=>{
                        onClose();
                    }}>Close</Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    );
}

export default StatsHero;
