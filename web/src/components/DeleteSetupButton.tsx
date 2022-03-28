import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import React, { useRef } from "react";
import { useSetups } from "../hooks/setup";
import { deleteSetup } from "../lib/mutations";

interface DeleteSetupButtonProps {
  setupId: number;
}

const DeleteSetupButton: React.FC<DeleteSetupButtonProps> = ({ setupId }) => {
  const { mutate } = useSetups();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <IconButton
        colorScheme="red"
        ml={"auto"}
        aria-label="Delete Setup"
        icon={<DeleteIcon />}
        onClick={onOpen}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Setup?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete your setup?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={async () => {
                onClose();
                await deleteSetup(setupId);
                mutate(undefined);
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteSetupButton;
