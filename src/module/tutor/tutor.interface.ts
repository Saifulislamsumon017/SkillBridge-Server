import { TUTOR_STATUS } from '../../../generated/prisma/enums';

export interface ICreateTutorProfile {
  bio?: string;
  hourlyRate: number;
}

export interface IUpdateTutorProfile {
  bio?: string;
  hourlyRate?: number;
  status?: TUTOR_STATUS;
}
