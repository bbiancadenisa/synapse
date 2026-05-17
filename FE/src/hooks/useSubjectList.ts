import { useEffect, useState } from 'react';
import { createSubject, deleteSubject, getSubjects } from '../services/subject';
import type { CreateSubjectPayload, Subject } from '../types/subjectTypes';

export const useSubjectsList = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sort, setSort] = useState('created_desc');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchSubjects = async () => {
    const data = await getSubjects({ sort });
    setSubjects(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, [sort]);

  const handleCreate = async (data: CreateSubjectPayload) => {
    await createSubject(data);
    setCreateModalOpen(false);
    await fetchSubjects();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubject(id);
      await fetchSubjects();
    } catch (err: any) {
      const message =
        err?.response?.data?.error ||
        'This subject cannot be deleted right now.';

      setDeleteError(message);
    }
  };

  return {
    subjects,
    sort,
    setSort,
    createModalOpen,
    setCreateModalOpen,
    deleteError,
    setDeleteError,
    handleCreate,
    handleDelete,
  };
};
