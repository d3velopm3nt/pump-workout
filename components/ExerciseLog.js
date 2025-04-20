import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Text,
  VStack,
  HStack,
  useToast
} from '@chakra-ui/react';

const ExerciseLog = ({ exercise, onClose }) => {
  const [sets, setSets] = useState([{ set: 1, weight: '', unit: 'lbs', reps: '' }]);
  const toast = useToast();
  const today = new Date().toISOString().split('T')[0];

  const addSet = () => {
    setSets([...sets, { set: sets.length + 1, weight: '', unit: 'lbs', reps: '' }]);
  };

  const updateSet = (index, field, value) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const handleSave = async () => {
    try {
      // Validate sets
      const invalidSets = sets.filter(set => !set.weight || !set.reps);
      if (invalidSets.length > 0) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all weight and reps fields',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exerciseId: exercise._id,
          exerciseName: exercise.name,
          date: today,
          sets: sets.map(set => ({
            setNumber: set.set,
            weight: parseFloat(set.weight),
            unit: set.unit,
            reps: parseInt(set.reps),
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save exercise log');
      }

      toast({
        title: 'Success',
        description: 'Exercise log saved successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="xl" fontWeight="bold">{exercise.name}</Text>
          <Text>{today}</Text>
        </HStack>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Set</Th>
              <Th>Weight</Th>
              <Th>Unit</Th>
              <Th>Reps</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sets.map((set, index) => (
              <Tr key={set.set}>
                <Td>{set.set}</Td>
                <Td>
                  <Input
                    type="number"
                    value={set.weight}
                    onChange={(e) => updateSet(index, 'weight', e.target.value)}
                    placeholder="Weight"
                  />
                </Td>
                <Td>
                  <Select
                    value={set.unit}
                    onChange={(e) => updateSet(index, 'unit', e.target.value)}
                  >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                  </Select>
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={set.reps}
                    onChange={(e) => updateSet(index, 'reps', e.target.value)}
                    placeholder="Reps"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <HStack justify="space-between">
          <Button onClick={addSet} colorScheme="blue">
            Add Set
          </Button>
          <Button onClick={handleSave} colorScheme="green">
            Log Exercise
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ExerciseLog; 