export type Difficulty = 'low' | 'medium' | 'high';

export type CreateSubjectPayload = {
  name: string;
  description: string;
  difficulty: Difficulty;
  color: string;
  overall_deadline: string;
};

export type Subject = {
  id: number;
  name: string;
  description?: string;
  difficulty: Difficulty;
  color?: string;
  overall_deadline: string;
};

export type UpdateSubjectPayload = {
  name: string;
  description: string;
  difficulty: Difficulty;
  color: string;
  overall_deadline: string;
};

export type CreateSubjectDTO = {
  name: string;
  description: string;
  difficulty: Difficulty;
  color: string;
  overall_deadline: string;
};
