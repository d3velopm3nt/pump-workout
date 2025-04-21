import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiMuscleUp, GiRunningNinja, GiMeditation } from 'react-icons/gi';

interface CharacterClass {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  startingStats: {
    strength: number;
    agility: number;
    endurance: number;
  };
}

const characterClasses: CharacterClass[] = [
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'Focus on strength training and powerlifting',
    icon: <GiMuscleUp className="w-12 h-12" />,
    startingStats: {
      strength: 8,
      agility: 4,
      endurance: 6
    }
  },
  {
    id: 'rogue',
    name: 'Rogue',
    description: 'Specialize in HIIT and agility workouts',
    icon: <GiRunningNinja className="w-12 h-12" />,
    startingStats: {
      strength: 4,
      agility: 8,
      endurance: 6
    }
  },
  {
    id: 'monk',
    name: 'Monk',
    description: 'Master of endurance and bodyweight exercises',
    icon: <GiMeditation className="w-12 h-12" />,
    startingStats: {
      strength: 5,
      agility: 5,
      endurance: 8
    }
  }
];

export const CharacterCreation: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [characterName, setCharacterName] = useState('');
  const [step, setStep] = useState(1);

  const handleCreateCharacter = async () => {
    try {
      // Create character in your backend
      const character = {
        name: characterName,
        class: selectedClass,
        level: 1,
        experience: 0,
        stats: characterClasses.find(c => c.id === selectedClass)?.startingStats
      };
      
      // TODO: Make API call to save character
      navigate('/'); // Navigate to home after successful creation
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Your Character</h1>
        
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {characterClasses.map((charClass) => (
              <div
                key={charClass.id}
                className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer ${
                  selectedClass === charClass.id ? 'border-2 border-primary' : ''
                }`}
                onClick={() => setSelectedClass(charClass.id)}
              >
                <div className="card-body">
                  <div className="flex items-center justify-center mb-4">
                    {charClass.icon}
                  </div>
                  <h2 className="card-title justify-center">{charClass.name}</h2>
                  <p className="text-center">{charClass.description}</p>
                  
                  <div className="mt-4">
                    <div className="badge badge-secondary mb-2">Starting Stats</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-sm font-bold">STR</div>
                        <div>{charClass.startingStats.strength}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold">AGI</div>
                        <div>{charClass.startingStats.agility}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold">END</div>
                        <div>{charClass.startingStats.endurance}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Character Details</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Character Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter character name"
                  className="input input-bordered"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step === 2 && (
            <button
              className="btn btn-outline"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          )}
          {step === 1 && selectedClass && (
            <button
              className="btn btn-primary ml-auto"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          )}
          {step === 2 && characterName && (
            <button
              className="btn btn-primary"
              onClick={handleCreateCharacter}
            >
              Create Character
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation; 