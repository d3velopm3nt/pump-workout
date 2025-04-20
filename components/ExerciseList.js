import React, { useState } from 'react';
import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaClipboardList } from 'react-icons/fa';
import ExerciseLog from './ExerciseLog';

const ExerciseList = ({ exercises, onEdit, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleLogClick = (exercise) => {
    setSelectedExercise(exercise);
    onOpen();
  };

  return (
    <VStack spacing={4} align="stretch">
      {exercises.map((exercise) => (
        <Box
          key={exercise._id}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          shadow="sm"
        >
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <Text fontSize="lg" fontWeight="bold">
                {exercise.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Muscles: {exercise.muscles?.join(', ')}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Equipment: {exercise.equipment}
              </Text>
            </VStack>
            <HStack>
              <IconButton
                icon={<FaClipboardList />}
                colorScheme="green"
                onClick={() => handleLogClick(exercise)}
                aria-label="Log exercise"
              />
              <IconButton
                icon={<FaEdit />}
                colorScheme="blue"
                onClick={() => onEdit(exercise)}
                aria-label="Edit exercise"
              />
              <IconButton
                icon={<FaTrash />}
                colorScheme="red"
                onClick={() => onDelete(exercise)}
                aria-label="Delete exercise"
              />
            </HStack>
          </HStack>
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log Exercise</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedExercise && (
              <ExerciseLog
                exercise={selectedExercise}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ExerciseList; 