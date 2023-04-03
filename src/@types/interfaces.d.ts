export interface InviteData {
  id: string;
  invite_code: string;
  group: GroupData
}

export interface GroupData {
  id: string;
  name: string;
  description: string;
  group_avatar: {
    id: string;
    url: string;
  }
}