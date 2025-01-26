import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiMuscleUp, GiRunningNinja, GiMeditation } from 'react-icons/gi';

interface CharacterClass {
  id: string;
  name: string;
  icon: React.ReactElement;
  description: string;
  startingStats: {
    strength: number;
    endurance: number;
    agility: number;
    vitality: number;
  };
  specialAbility: string;
}

const characterClasses: CharacterClass[] = [
  {
    id: 'warrior',
    name: 'Strength Warrior',
    icon: <GiMuscleUp className="w-12 h-12" />,
    description: 'Focused on strength training and power lifting. Bonus XP for strength-based exercises.',
    startingStats: {
      strength: 8,
      endurance: 5,
      agility: 3,
      vitality: 6
    },
    specialAbility: 'Power Surge: +20% strength gains after consecutive workout days'
  },
  {
    id: 'rogue',
    name: 'Agility Specialist',
    icon: <GiRunningNinja className="w-12 h-12" />,
    description: 'Specializes in cardio and HIIT workouts. Bonus XP for speed-based activities.',
    startingStats: {
      strength: 4,
      endurance: 7,
      agility: 8,
      vitality: 5
    },
    specialAbility: 'Swift Recovery: -15% rest time needed between exercises'
  },
  {
    id: 'monk',
    name: 'Wellness Monk',
    icon: <GiMeditation className="w-12 h-12" />,
    description: 'Balanced approach focusing on flexibility and mindfulness. Bonus XP for consistency.',
    startingStats: {
      strength: 5,
      endurance: 6,
      agility: 6,
      vitality: 7
    },
    specialAbility: 'Inner Peace: +25% XP for maintaining daily workout streaks'
  }
];

const CharacterCreation: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [characterName, setCharacterName] = useState('');
  const [step, setStep] = useState(1);

  const handleCreateCharacter = async () => {
    // Here we would typically make an API call to create the character
    // const character = {
    //   name: characterName,
    //   class: selectedClass,
    //   level: 1,
    //   experience: 0,
    //   stats: characterClasses.find(c => c.id === selectedClass)?.startingStats
    // };

    // Save character data
    try {
      // API call would go here
      navigate('/dashboard'); // Redirect to dashboard after creation
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Create Your Fitness Character</h1>
          <div className="flex justify-center gap-2">
            <div className={`badge ${step === 1 ? 'badge-primary' : 'badge-ghost'}`}>
              Choose Class
            </div>
            <div className={`badge ${step === 2 ? 'badge-primary' : 'badge-ghost'}`}>
              Customize
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {characterClasses.map((charClass) => (
              <div
                key={charClass.id}
                className={`card bg-base-200 hover:shadow-xl transition-all cursor-pointer
                  ${selectedClass === charClass.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedClass(charClass.id)}
              >
                <div className="card-body">
                  <div className="flex justify-center mb-4">
                    {charClass.icon}
                  </div>
                  <h2 className="card-title justify-center">{charClass.name}</h2>
                  <p className="text-center text-sm">{charClass.description}</p>
                  
                  <div className="divider">Starting Stats</div>
                  
                  <div className="stats stats-vertical shadow bg-base-300">
                    {Object.entries(charClass.startingStats).map(([stat, value]) => (
                      <div key={stat} className="stat">
                        <div className="stat-title capitalize">{stat}</div>
                        <div className="stat-value text-primary text-2xl">{value}</div>
                        <progress
                          className="progress progress-primary w-full"
                          value={value}
                          max="10"
                        ></progress>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="badge badge-secondary">Special Ability</div>
                    <p className="text-sm mt-2">{charClass.specialAbility}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">Customize Your Character</h2>
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
              
              {/* Additional customization options could go here */}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-8">
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
              className="btn btn-primary"
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