import { DataSource } from 'typeorm';
import { Group } from '../modules/group/group.entity';

export const seedGroups = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Group);
  const groups = [
    {
      name: 'Administrator',
      icon: 'group-administrator',
      isModerator: true,
      isAdministrator: true,
      isTrusted: true,
      isFreeleech: true,
      canDownload: true,
      canUpload: true,
      canAddToGroup: true,
      priority: 1,
    },
    {
      name: 'Moderator',
      icon: 'group-moderator',
      isModerator: true,
      isAdministrator: false,
      isTrusted: false,
      isFreeleech: false,
      canDownload: true,
      canUpload: true,
      canAddToGroup: false,
      priority: 3,
    },
    {
      name: 'Super-Moderator',
      icon: 'group-super-moderator',
      isModerator: true,
      isAdministrator: false,
      isTrusted: false,
      isFreeleech: false,
      canDownload: true,
      canUpload: true,
      canAddToGroup: true,
      priority: 2,
    },
    {
      name: 'Banned',
      icon: 'group-banned',
      isModerator: false,
      isAdministrator: false,
      isTrusted: false,
      isFreeleech: false,
      canDownload: false,
      canUpload: false,
      canAddToGroup: false,
      priority: 0,
    },
    {
      name: 'Trusted',
      icon: 'group-trusted',
      isModerator: false,
      isAdministrator: false,
      isTrusted: true,
      isFreeleech: false,
      canDownload: true,
      canUpload: true,
      canAddToGroup: false,
      priority: 0,
    },
  ];
  for (const group of groups) {
    const exist = await repo.findOne({ where: { name: group.name } });
    if (!exist) {
      await repo.save(group);
    }
  }
};
