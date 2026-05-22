export const SUBJECT_COLORS = [
  '#4F46E5', // indigo
  '#2563EB', // blue
  '#0891B2', // cyan
  '#059669', // green
  '#65A30D', // lime
  '#CA8A04', // yellow
  '#EA580C', // orange
  '#DC2626', // red
  '#DB2777', // pink
  '#7C3AED', // violet
  '#9333EA', // purple
  '#475569', // slate (neutral)
];

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'created_desc' },
  { label: 'Oldest', value: 'created_asc' },
  { label: 'Name A-Z', value: 'name_asc' },
  { label: 'Name Z-A', value: 'name_desc' },
  { label: 'Deadline closest', value: 'deadline_asc' },
  { label: 'Deadline farthest', value: 'deadline_desc' },
  { label: 'Difficulty low → high', value: 'difficulty_asc' },
  { label: 'Difficulty high → low', value: 'difficulty_desc' },
];

export const TASK_SORT_OPTIONS = [
  { label: 'Newest', value: 'created_desc' },
  { label: 'Oldest', value: 'created_asc' },
  { label: 'Deadline closest', value: 'deadline_asc' },
  { label: 'Deadline farthest', value: 'deadline_desc' },
  { label: 'Priority low → high', value: 'priority_asc' },
  { label: 'Priority high → low', value: 'priority_desc' },
];

export const TASK_STATUS_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];
