import { cn } from "@/lib/utils";
import { Button } from "./button";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  LinkIcon,
  MessageSquareIcon,
} from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Avatar, ButtonGroup, Card, Chip } from "@nextui-org/react";


export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  link,
  date,
  tags,
}: {
  className?: string;
  title: string;
  description: string;
  link: string;
  date: string;
  tags: string[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div
      
      onClick={onOpen}
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-[--secondary-color] p-4 text-[--text-color-light] shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:shadow-none cursor-pointer",
        className,
      )}
    >
      <div className="h-12 font-semibold">
        {title.length > 50 ? title.slice(0, 45) + "..." : title}
      </div>
      <div className="transition duration-200">
        <div className="mb-4 text-xs text-gray-500">
          Published on {date} • 8 min read • From Collab Blog by Ted T. Amade
        </div>
        <div className="mb-4 flex h-32 items-center justify-center rounded-md bg-gradient-to-r from-blue-400 to-purple-500 text-center text-xl font-medium text-white">
          {title.length > 50 ? title.slice(0, 45) + "..." : title}
        </div>

        <div className="mb-0 flex items-center justify-center space-x-4 text-xs">
          <Button className="m-0 flex h-6 w-10 flex-row items-center justify-center border-[--color-2] bg-[--color-2] px-1 text-xs">
            <ArrowUpIcon className="mr-1 h-3" />
            13
          </Button>
          <Button className="m-0 flex h-6 w-10 flex-row items-center justify-center border-[--color-2] bg-[--color-2] px-1 text-xs">
            <ArrowDownIcon className="h-3 w-fit" />
          </Button>
          <Button className="m-0 flex h-6 w-10 flex-row items-center justify-center border-[--color-2] bg-[--color-2] px-1 text-xs">
            {" "}
            <MessageSquareIcon className="mr-1 h-3 w-fit" />2
          </Button>
          <Button className="m-0 flex h-6 w-10 flex-row items-center justify-center border-[--color-2] bg-[--color-2] px-1 text-xs">
            {" "}
            <BookmarkIcon className="h-3 w-fit" />
          </Button>
          <Button className="m-0 flex h-6 w-10 flex-row items-center justify-center border-[--color-2] bg-[--color-2] px-1 text-xs">
            {" "}
            <LinkIcon className="h-3 w-fit" />
          </Button>
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {/* {description} */}
        </div>
      </div>

      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} className="py-4 p-0 m-0 bg-[--secondary-color] h-[80vh]  scrollbar-hide">
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader> */}
              <ModalBody className="my-4">
                <div className="grid grid-cols-1 gap-6 text-[--color-1] md:grid-cols-3 ">
                  <div className="md:col-span-2">
                    <Card className="bg-[--primary-color] p-6 max-h-[75vh] overflow-y-scroll  scrollbar-hide">
                      <h1 className="mb-3 text-2xl font-bold text-[--text-color-light]">
                        {title}
                      </h1>
                      <div className="mb-3 rounded border-l-2 border-l-purple-500 p-2 text-[--color-1]">
                        <span className="font-bold text-purple-500">TLDR:</span>{" "}
                        {description}
                      </div>
                      <div className="mb-2">
                        <span className="-ml-2">
                          {tags.map((tag, index) => (
                            <span key={index} className="ml-2">
                              <Chip className="rounded-md bg-[--color-2] text-xs text-[--color-1]">
                                # {tag}
                              </Chip>
                            </span>
                          ))}
                        </span>
                      </div>
                      <div className="mb-4 text-sm text-gray-500">
                        Published on June 10 • 8 min read • From Collab Blog by
                        Ted T. Amade
                      </div>
                      <div className="mb-4 flex min-h-48 items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-xl font-bold text-white">
                        {title}
                      </div>
                      <div className="mb-6 flex items-center space-x-4">
                        <Button className="border-[--color-2] bg-[--color-2]">
                          <ArrowUpIcon className="mr-1 h-4 w-4" />
                          13
                        </Button>
                        <Button className="border-[--color-2] bg-[--color-2]">
                          <ArrowDownIcon className="h-4 w-4" />
                        </Button>
                        <Button className="border-[--color-2] bg-[--color-2]">
                          <MessageSquareIcon className="mr-1 h-4 w-4" />2
                        </Button>
                        <Button className="border-[--color-2] bg-[--color-2]">
                          <BookmarkIcon className="h-4 w-4" />
                        </Button>
                        <Button className="border-[--color-2] bg-[--color-2]">
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-4 text-[--color-1]">
                        <div className="flex items-start space-x-2">
                          <Avatar className="h-8 w-8">
                            <img
                              src="/placeholder.svg?height=32&width=32"
                              alt="Samuel"
                            />
                          </Avatar>
                          <div className="text-[--color-1]">
                            <div className="flex items-center">
                              <span className="mr-2 font-semibold">Samuel</span>
                              <span className="text-sm text-gray-500">110</span>
                            </div>
                            <p className="text-sm">
                              Everyone who can should try this.
                            </p>
                            <div className="mt-1 flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <ArrowUpIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <ArrowDownIcon className="h-4 w-4" />
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
                          <Avatar className="h-8 w-8">
                            <img
                              src="/placeholder.svg?height=32&width=32"
                              alt="Júlio César Ködel"
                            />
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <span className="mr-2 font-semibold">
                                Júlio César Ködel
                              </span>
                              <span className="text-sm text-gray-500">
                                4.5K
                              </span>
                            </div>
                            <p className="text-sm">
                              Hi! My name is Ködel. It's been 2 years since I
                              ditched my smartphone.
                            </p>
                            <div className="mt-1 flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <ArrowUpIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <ArrowDownIcon className="h-4 w-4" />
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
                    <Button color="secondary" className="mb-4 bg-white">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <FaExternalLinkAlt color="black" className="" />
                        <a href={link} target="blank" className="text-black">
                          Read Post
                        </a>
                      </div>
                    </Button>
                    <Card className="mb-4 bg-[--primary-color] p-4 text-[--color-1]">
                      <h2 className="mb-2 font-bold text-[--text-color-light]">
                        You might like
                      </h2>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <ArrowUpIcon className="mr-1 h-4 w-4" />
                          <span className="mr-2 text-sm">1</span>
                          <span className="text-sm">
                            The science behind an iPhone dumb phone
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ArrowUpIcon className="mr-1 h-4 w-4" />
                          <span className="mr-2 text-sm">3</span>
                          <span className="text-sm">
                            Be gone, vile rectangle!
                          </span>
                        </div>
                      </div>
                    </Card>
                    <Card className="bg-[--primary-color] p-4 text-[--color-1]">
                      <h2 className="mb-2 font-bold text-[--text-color-light]">
                        Best discussions
                      </h2>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">
                            GitHub Repositories Every Software Engineer Should
                            Know
                          </p>
                          <p className="text-xs text-gray-500">103 comments</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Python-related discussion
                          </p>
                          <p className="text-xs text-gray-500">45 comments</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Next.js-related topic
                          </p>
                          <p className="text-xs text-gray-500">78 comments</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
