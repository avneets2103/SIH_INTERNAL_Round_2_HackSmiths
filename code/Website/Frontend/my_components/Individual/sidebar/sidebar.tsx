import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sidebarMenu } from "@/CONSTANTS";
import { sidebarMenuItems } from "@/Interfaces";
import { setCurrentPage } from "@/RTK/features/sidebar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Button,
} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Link} from "@nextui-org/react";
import { logout } from "@/Helpers/logout";

const Sidebar: React.FC = () => {
  const dispatcher = useDispatch();
  const Router = useRouter();
  const currentPage = useSelector((state: any) => state.sidebar.currentPage);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="flex h-screen w-[4rem] items-center justify-center min-w-[4rem] border-r-1 border-textColorDark">
      <div className="flex h-full w-[3rem] flex-col justify-between gap-[2rem] py-[1rem]">
        <div className="flex flex-col items-center justify-center gap-[0.7rem]">
          <div className="flex w-full flex-col items-center justify-center rounded-[25px] py-[0.2rem] drop-shadow-md">
            <img
              src="../icons/logo.png"
              alt="logo"
              className="w-[90%] p-[5px]"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-[25px] bg-secondaryColor py-[0.2rem] drop-shadow-md">
            {sidebarMenu.map((item: sidebarMenuItems, index: number) => {
              if (item.path === currentPage) {
                return (
                  <div
                    key={index}
                    className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-color2 border-textColorDark border-[1px]"
                  >
                    <img src={item.iconS} alt={item.name} className="w-[40%]" />
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-secondaryColor"
                  onClick={() => {
                    dispatcher(setCurrentPage({ currentPage: item.path }));
                    Router.push(`/sections/${item.path}`);
                  }}
                >
                  <img src={item.iconNS} alt={item.name} className="w-[40%]" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center rounded-[25px] bg-secondaryColor py-[0.2rem] drop-shadow-md">
          <div className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-secondaryColor" onClick={onOpen}>
            <img
              src={"../icons/setting.NS.png"}
              alt={"settings"}
              className="w-[40%]"
            />
          </div>
          <div className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-primaryColor">
            <img
              src={`../icons/avatar${Number(Cookies.get("avatarNumber")) || 1}.png`}
              alt={"avatar"}
              className="w-[95%]"
            />
          </div>
        </div>
      </div>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent className="bg-secondaryColor">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-textColorLight">Settings</ModalHeader>
              <ModalBody>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-purple-200 text-textColorDark" variant="flat" onPress={async()=>{
                  logout();
                  onClose();
                  Router.push("/login");
                }}>
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Sidebar;
