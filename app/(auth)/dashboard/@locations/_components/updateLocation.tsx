'use client'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@heroui/react"
import React, { ReactNode } from "react"
import { LuPenTool } from "react-icons/lu";

export default function UpdateLocation({children, store}: {children: ReactNode, store: string | string[] | undefined}) {
    if (!store) return <div/>
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
     
    return (
        <>
        <Button onPress={onOpen} color="primary"><LuPenTool size="20"/> Open Modal</Button>
        <Modal className="bg-orange-400" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {() => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}