"use client"
import { ArrowUpIcon, ArrowDownIcon, BookmarkIcon, LinkIcon, MessageSquareIcon } from 'lucide-react'
import { Button } from '../ui/button'

import { FaExternalLinkAlt } from "react-icons/fa";
import { Avatar, ButtonGroup, Card, Chip } from '@nextui-org/react'
import { useState } from 'react';
// import { Avatar } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
interface Props {
    title: string
    tldr: string
    tags: string[]
    url: string
}   

export default function Modal(props: Props) {
    const {title, tldr, tags, url} = props;
   const [upvote, setUpvote] = useState(13);
   const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Use Clipboard API if available
      navigator.clipboard.writeText(url)
        .then(() => {
        //   alert('URL copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        // alert('URL copied to clipboard (fallback)!');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  };
  return (
    // <div className="max-w-4xl mx-auto p-4 bg-gray-100">
    <>
{/*     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[--color-1]">
        <div className="md:col-span-2">
          <Card className="p-6 bg-[--primary-color]">
            <h1 className="text-2xl text-[--text-color-light] font-bold mb-3">{title}</h1>
            <div className="border-l-2 border-l-purple-500 p-2 rounded mb-3 text-[--color-1]">
              <span className="font-bold text-purple-500">TLDR:</span> {tldr}
            </div>
            <div className="mb-2">
                <span className='-ml-2'>
                    {tags.map((tag, index) => (
                        <span key={index} className='ml-2'>
                            <Chip className='text-xs bg-[--color-2] text-[--color-1] rounded-md'># {tag}</Chip>
                        </span>
                    ))}
                </span>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Published on June 10 • 8 min read • From Collab Blog by Ted T. Amade
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-48 flex items-center justify-center text-white text-xl font-bold mb-4">
              {title}               
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <Button  className='bg-[--color-2] border-[--color-2]'>
                <ArrowUpIcon className="w-4 h-4 mr-1" />
                13
              </Button>
              <Button  className='bg-[--color-2] border-[--color-2]'>
                <ArrowDownIcon className="w-4 h-4" />
              </Button>
              <Button  className='bg-[--color-2] border-[--color-2]'>
                <MessageSquareIcon className="w-4 h-4 mr-1" />
                2 
              </Button>
              <Button  className='bg-[--color-2] border-[--color-2]'>
                <BookmarkIcon className="w-4 h-4" />
              </Button>
              <Button  className='bg-[--color-2] border-[--color-2]'>
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4 text-[--color-1]">
              <div className="flex items-start space-x-2">
                <Avatar className="w-8 h-8">
                  <img src="/placeholder.svg?height=32&width=32" alt="Samuel" />
                </Avatar>
                <div className='text-[--color-1]'>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Samuel</span>
                    <span className="text-sm text-gray-500">110</span>
                  </div>
                  <p className="text-sm">Everyone who can should try this.</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Button variant="ghost" size="sm">
                      <ArrowUpIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ArrowDownIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      •••
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Avatar className="w-8 h-8">
                  <img src="/placeholder.svg?height=32&width=32" alt="Júlio César Ködel" />
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Júlio César Ködel</span>
                    <span className="text-sm text-gray-500">4.5K</span>
                  </div>
                  <p className="text-sm">Hi! My name is Ködel. It's been 2 years since I ditched my smartphone.</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Button variant="ghost" size="sm">
                      <ArrowUpIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ArrowDownIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      •••
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div>
            <Button color = "secondary" className='mb-4 bg-white'>
                <div className='flex flex-row gap-2 justify-center items-center'>
                    <FaExternalLinkAlt color = "black"className=''/>
                    <a href={url} target='blank' className='text-black'>
                        Read Post
                    </a>
                </div>
            </Button>
          <Card className="p-4 mb-4 text-[--color-1] bg-[--primary-color]">
            <h2 className="font-bold mb-2 text-[--text-color-light]">You might like</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <ArrowUpIcon className="w-4 h-4 mr-1" />
                <span className="text-sm mr-2">1</span>
                <span className="text-sm">The science behind an iPhone dumb phone</span>
              </div>
              <div className="flex items-center">
                <ArrowUpIcon className="w-4 h-4 mr-1" />
                <span className="text-sm mr-2">3</span>
                <span className="text-sm">Be gone, vile rectangle!</span>
              </div>
            </div>
          </Card>
          <Card className="p-4 text-[--color-1] bg-[--primary-color]">
            <h2 className="font-bold mb-2 text-[--text-color-light]">Best discussions</h2>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">GitHub Repositories Every Software Engineer Should Know</p>
                <p className="text-xs text-gray-500">103 comments</p>
              </div>
              <div>
                <p className="text-sm font-medium">Python-related discussion</p>
                <p className="text-xs text-gray-500">45 comments</p>
              </div>
              <div>
                <p className="text-sm font-medium">Next.js-related topic</p>
                <p className="text-xs text-gray-500">78 comments</p>
              </div>
            </div>
          </Card>
        </div>
      </div> */}
      </>
    // </div>
  )
}