export const getRiskColor = (risk?: string) => {
  if (risk === 'high') {
    return {
      bg: '#fef2f2',
      color: '#dc2626',
    };
  }

  if (risk === 'medium') {
    return {
      bg: '#fffbeb',
      color: '#b45309',
    };
  }

  return {
    bg: '#ecfdf5',
    color: '#047857',
  };
};
