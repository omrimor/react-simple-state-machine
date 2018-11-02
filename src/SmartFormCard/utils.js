import { chain } from 'lodash';

export const omitObjIdKey = data =>
  chain(data)
    .omit(['id'])
    .value();
