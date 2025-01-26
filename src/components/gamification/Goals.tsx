import React from 'react';
import { FaDumbbell, FaCalendarCheck, FaWeightHanging, FaTrophy, FaBolt, FaCheck } from 'react-icons/fa';
import { GiMuscleUp, GiWeightLiftingUp, GiStopwatch, GiPodiumWinner } from 'react-icons/gi';
import { IoMdFitness } from 'react-icons/io';

interface Goal {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  progress: number;
  target: number;
  deadline: Date;
  category: 'strength' | 'consistency' | 'milestone' | 'weight' | 'custom';
  status: 'in-progress' | 'completed' | 'at-risk';
  milestones: {
    value: number;
    label: string;
    reached: boolean;
  }[];
}

const goals: Goal[] = [
  {
    id: '1',
    title: 'Bench Press Goal',
    description: 'Reach 225lbs bench press',
    icon: <GiMuscleUp className="w-8 h-8 text-primary" />,
    progress: 185,
    target: 225,
    deadline: new Date('2024-06-01'),
    category: 'strength',
    status: 'in-progress',
    milestones: [
      { value: 135, label: 'Plate milestone', reached: true },
      { value: 185, label: 'Intermediate', reached: true },
      { value: 225, label: 'Two plates', reached: false }
    ]
  },
  {
    id: '2',
    title: 'Workout Streak',
    description: 'Maintain 4 workouts per week',
    icon: <FaCalendarCheck className="w-8 h-8 text-success" />,
    progress: 6,
    target: 12,
    deadline: new Date('2024-03-01'),
    category: 'consistency',
    status: 'in-progress',
    milestones: [
      { value: 4, label: '1 Month', reached: true },
      { value: 8, label: '2 Months', reached: false },
      { value: 12, label: '3 Months', reached: false }
    ]
  },
  {
    id: '3',
    title: 'Weight Goal',
    description: 'Reach target weight of 180lbs',
    icon: <FaWeightHanging className="w-8 h-8 text-error" />,
    progress: 195,
    target: 180,
    deadline: new Date('2024-05-15'),
    category: 'weight',
    status: 'at-risk',
    milestones: [
      { value: 200, label: 'Initial', reached: true },
      { value: 190, label: 'Halfway', reached: false },
      { value: 180, label: 'Goal', reached: false }
    ]
  },
  {
    id: '4',
    title: 'Exercise Mastery',
    description: 'Master 10 different exercises',
    icon: <GiPodiumWinner className="w-8 h-8 text-warning" />,
    progress: 4,
    target: 10,
    deadline: new Date('2024-04-01'),
    category: 'milestone',
    status: 'in-progress',
    milestones: [
      { value: 3, label: 'Beginner', reached: true },
      { value: 6, label: 'Intermediate', reached: false },
      { value: 10, label: 'Advanced', reached: false }
    ]
  }
];

export const Goals: React.FC = () => {
  const getStatusClass = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return 'border-l-4 border-success bg-success/10';
      case 'at-risk':
        return 'border-l-4 border-error bg-error/10';
      default:
        return 'border-l-4 border-primary';
    }
  };

  const getDaysRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getCategoryBadgeClass = (category: Goal['category']) => {
    switch (category) {
      case 'strength':
        return 'badge-primary';
      case 'consistency':
        return 'badge-success';
      case 'milestone':
        return 'badge-warning';
      case 'weight':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Your Goals</h2>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Active Goals</div>
            <div className="stat-value text-primary">{goals.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">
              {goals.filter(g => g.status === 'completed').length}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-200 ${getStatusClass(
              goal.status
            )}`}
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="card-title flex items-center gap-2">
                    {goal.icon}
                    {goal.title}
                  </h3>
                  <p className="text-sm mt-2 text-base-content/80">{goal.description}</p>
                </div>
                <div className={`badge ${getCategoryBadgeClass(goal.category)}`}>
                  {goal.category}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{goal.progress} / {goal.target}</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value={(goal.progress / goal.target) * 100}
                  max="100"
                />
              </div>

              <div className="divider my-2">Milestones</div>
              
              <div className="flex justify-between mb-4">
                {goal.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${
                      milestone.reached ? 'text-success' : 'text-base-content/60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.reached ? 'bg-success/20' : 'bg-base-300'
                    }`}>
                      {milestone.reached ? <FaCheck /> : index + 1}
                    </div>
                    <span className="text-xs mt-1">{milestone.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="badge badge-outline">
                  {getDaysRemaining(goal.deadline)} days left
                </div>
                <button className="btn btn-sm btn-primary">Update Progress</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="btn btn-primary gap-2">
          <IoMdFitness className="w-5 h-5" />
          Add New Goal
        </button>
      </div>
    </div>
  );
}; 