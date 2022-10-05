import { monotonicFactory } from 'ulid';

export const ulid = () => {
  const ulid = monotonicFactory();
  return ulid(Date.now());
};
