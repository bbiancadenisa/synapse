import { useEffect, useState } from 'react';
import {
  createSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
} from '../../services/subject';
import {
  createTask,
  deleteTask,
  getTasks,
  markTaskDone,
} from '../../services/task';

type Subject = {
  id: number;
  name: string;
  description?: string;
  difficulty: 'low' | 'medium' | 'high';
  estimated_total_hours: number;
};

type Task = {
  id: number;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
};

type Difficulty = 'low' | 'medium' | 'high';

export const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [name, setName] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null,
  );
  const [editingSubjectId, setEditingSubjectId] = useState<number | null>(null);

  const [editName, setEditName] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('low');
  const [originalSubject, setOriginalSubject] = useState<Subject | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [description, setDescription] = useState('');

  const fetchSubjects = async () => {
    const data = await getSubjects();
    setSubjects(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    await createSubject({
      name,
      description,
      difficulty,
      estimated_total_hours: 20,
    });

    setName('');
    setDescription('');
    fetchSubjects();
  };

  const handleSelectSubject = async (id: number) => {
    setSelectedSubjectId(id);
    const data = await getTasks(id);
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!selectedSubjectId || !taskTitle.trim()) return;

    await createTask({
      subject_id: selectedSubjectId,
      title: taskTitle,
      estimated_hours: 2,
    });

    setTaskTitle('');

    const updatedTasks = await getTasks(selectedSubjectId);
    setTasks(updatedTasks);
  };

  const hasChanges = () => {
    if (!originalSubject) return false;

    return (
      editName !== originalSubject.name ||
      editDescription !== (originalSubject.description || '')
    );
  };

  const buildUpdatePayload = () => {
    const payload: any = {};

    if (editName !== originalSubject?.name) {
      payload.name = editName;
    }

    if (editDescription !== (originalSubject?.description || '')) {
      payload.description = editDescription;
    }

    return payload;
  };

  return (
    <div>
      <h1>Subjects</h1>

      <form onSubmit={handleAdd}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subject name"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value as 'low' | 'medium' | 'high')
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Add</button>
      </form>

      <ul>
        {subjects.map((s) => (
          <li key={s.id}>
            <button onClick={() => handleSelectSubject(s.id)}>{s.name}</button>

            <button
              onClick={async () => {
                try {
                  await deleteSubject(s.id);
                  fetchSubjects();
                } catch (err: any) {
                  alert(err.response?.data?.error);
                }
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                setEditingSubjectId(s.id);

                setOriginalSubject(s);

                setEditName(s.name);
                setEditDescription(s.description || '');
              }}
            >
              edit
            </button>
            <p>{s.description}</p>
          </li>
        ))}
      </ul>

      {editingSubjectId && (
        <div>
          <h3>Edit Subject</h3>

          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Name"
          />

          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
          />

          <button
            onClick={async () => {
              if (!hasChanges()) {
                alert('No changes detected');
                return;
              }

              const payload = buildUpdatePayload();

              await updateSubject(editingSubjectId!, payload);

              setEditingSubjectId(null);
              setEditName('');
              setEditDescription('');
              setOriginalSubject(null);

              fetchSubjects();
            }}
          >
            Save
          </button>

          <button onClick={() => setEditingSubjectId(null)}>Cancel</button>
        </div>
      )}

      {selectedSubjectId && (
        <div>
          <h2>Tasks</h2>
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task title"
          />

          <button onClick={handleAddTask}>Add Task</button>

          <ul>
            {tasks.map((t) => (
              <li key={t.id}>
                {t.title} - {t.status}
                <button
                  onClick={async () => {
                    await deleteTask(t.id);
                    const updated = await getTasks(selectedSubjectId!);
                    setTasks(updated);
                  }}
                >
                  delete
                </button>
                <button
                  onClick={async () => {
                    await markTaskDone(t.id);
                    const updated = await getTasks(selectedSubjectId!);
                    setTasks(updated);
                  }}
                >
                  done
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
