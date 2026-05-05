import { acceptBreak, ignoreBreak, takeManualBreak } from './sessionEngine';

export const handleSessionAction = async (data: {
  type: string;
  sessionId: number;
}) => {
  switch (data.type) {
    case 'BREAK_ACCEPTED':
      await acceptBreak(data.sessionId);
      break;

    case 'BREAK_IGNORED':
      await ignoreBreak(data.sessionId);
      break;

    case 'TAKE_MANUAL_BREAK':
      await takeManualBreak(data.sessionId);
      break;

    default:
      break;
  }
};
