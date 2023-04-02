export interface InviteData {
  id: string;
  invite_code: string;
  group: GroupData
}

export interface GroupData {
  id: string;
  name: string;
  description: string;
  avatar: {
    id: string;
    url: string;
  }
}