import { SetMetadata } from '@nestjs/common';

export const GROUP_KEY = 'group';
export const Group = (group: string) => SetMetadata(GROUP_KEY, group);
