import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Exercise, muscleGroups, equipmentList } from '../types/exercise';
import { createExercise, getExercises, updateExercise, deleteExercise } from '../services/exerciseService';
import { useAuthContext } from '../contexts/AuthContext';

export const ExerciseManagement = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [filters, setFilters] = useState({
    muscleGroup: '',
    equipment: '',
    difficulty: '',
    search: ''
  });

  // Fetch exercises
  const { data: exercises, isLoading } = useQuery({
    queryKey: ['exercises', filters],
    queryFn: () => getExercises(filters)
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      setIsModalOpen(false);
      setEditingExercise(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, exercise }: { id: string; exercise: Partial<Exercise> }) =>
      updateExercise(id, exercise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      setIsModalOpen(false);
      setEditingExercise(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    }
  });

  const handleSubmit = async (formData: FormData) => {
    const exercise = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      muscleGroups: formData.getAll('muscleGroups') as string[],
      primaryMuscle: formData.get('primaryMuscle') as string,
      equipment: formData.getAll('equipment') as string[],
      difficulty: formData.get('difficulty') as 'beginner' | 'intermediate' | 'advanced',
      instructions: (formData.get('instructions') as string).split('\n').filter(Boolean),
      tips: (formData.get('tips') as string).split('\n').filter(Boolean),
      commonMistakes: (formData.get('commonMistakes') as string).split('\n').filter(Boolean),
      videoUrl: formData.get('videoUrl') as string || undefined,
      createdBy: user?.id
    };

    if (editingExercise?._id) {
      updateMutation.mutate({ id: editingExercise._id, exercise });
    } else {
      createMutation.mutate(exercise);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Exercise Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingExercise(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-5 w-5" />
          Add Exercise
        </button>
      </div>

      {/* Filters */}
      <div className="card bg-base-200 mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">
            <Filter className="h-5 w-5" />
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Search</span>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search exercises..."
                  className="input input-bordered w-full"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
                <button className="btn btn-square">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Muscle Group</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.muscleGroup}
                onChange={(e) => setFilters(prev => ({ ...prev, muscleGroup: e.target.value }))}
              >
                <option value="">All Muscle Groups</option>
                {muscleGroups.map(group => (
                  <option key={group.name} value={group.name}>{group.name}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Equipment</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.equipment}
                onChange={(e) => setFilters(prev => ({ ...prev, equipment: e.target.value }))}
              >
                <option value="">All Equipment</option>
                {equipmentList.map(equipment => (
                  <option key={equipment} value={equipment}>{equipment}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Difficulty</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.difficulty}
                onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              >
                <option value="">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises?.map((exercise) => (
          <div key={exercise._id} className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">{exercise.name}</h2>
              <p className="text-sm text-base-content/70">{exercise.description}</p>
              
              <div className="flex flex-wrap gap-2 my-2">
                {exercise.muscleGroups.map(muscle => (
                  <span key={muscle} className="badge badge-primary">{muscle}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {exercise.equipment.map(item => (
                  <span key={item} className="badge badge-secondary">{item}</span>
                ))}
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setEditingExercise(exercise);
                    setIsModalOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this exercise?')) {
                      deleteMutation.mutate(exercise._id!);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-4">
              {editingExercise ? 'Edit Exercise' : 'Create New Exercise'}
            </h3>
            
            <form method="dialog" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSubmit(formData);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Exercise Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input input-bordered"
                    defaultValue={editingExercise?.name}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Difficulty</span>
                  </label>
                  <select
                    name="difficulty"
                    className="select select-bordered"
                    defaultValue={editingExercise?.difficulty}
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    className="textarea textarea-bordered h-24"
                    defaultValue={editingExercise?.description}
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Muscle Groups</span>
                  </label>
                  <select
                    name="muscleGroups"
                    className="select select-bordered"
                    multiple
                    defaultValue={editingExercise?.muscleGroups}
                    required
                  >
                    {muscleGroups.flatMap(group => [
                      <option key={group.name} value={group.name}>{group.name}</option>,
                      ...group.muscles.map(muscle => (
                        <option key={muscle} value={muscle}>&nbsp;&nbsp;{muscle}</option>
                      ))
                    ])}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Primary Muscle</span>
                  </label>
                  <select
                    name="primaryMuscle"
                    className="select select-bordered"
                    defaultValue={editingExercise?.primaryMuscle}
                    required
                  >
                    {muscleGroups.flatMap(group => 
                      group.muscles.map(muscle => (
                        <option key={muscle} value={muscle}>{muscle}</option>
                      ))
                    )}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Equipment Needed</span>
                  </label>
                  <select
                    name="equipment"
                    className="select select-bordered"
                    multiple
                    defaultValue={editingExercise?.equipment}
                    required
                  >
                    {equipmentList.map(equipment => (
                      <option key={equipment} value={equipment}>{equipment}</option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Video URL (optional)</span>
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    className="input input-bordered"
                    defaultValue={editingExercise?.videoUrl}
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Instructions (one per line)</span>
                  </label>
                  <textarea
                    name="instructions"
                    className="textarea textarea-bordered h-24"
                    defaultValue={editingExercise?.instructions?.join('\n')}
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tips (one per line)</span>
                  </label>
                  <textarea
                    name="tips"
                    className="textarea textarea-bordered h-24"
                    defaultValue={editingExercise?.tips?.join('\n')}
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Common Mistakes (one per line)</span>
                  </label>
                  <textarea
                    name="commonMistakes"
                    className="textarea textarea-bordered h-24"
                    defaultValue={editingExercise?.commonMistakes?.join('\n')}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingExercise ? 'Update' : 'Create'} Exercise
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}; 