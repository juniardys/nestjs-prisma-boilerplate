import { User } from '@prisma/client';
import { GetUserResponseData } from '../types/user';

export const transformUserToResponseData = async (
  data: User[],
): Promise<GetUserResponseData[]> => {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    } as GetUserResponseData;
  });
};
