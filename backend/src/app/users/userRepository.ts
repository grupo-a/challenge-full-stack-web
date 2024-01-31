import { repositoryUser } from 'src/constants/constants';
import { User } from './entities/user.entity';

export const usersProviders = [
  {
    provide: repositoryUser,
    useValue: User,
  },
];