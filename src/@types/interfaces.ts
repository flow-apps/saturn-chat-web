import { FeedbackType, FriendsStates, ParticipantRoles, ParticipantStates, ReportStatus, ReportToType, ReportType } from "./enums";

export interface UserData {
  id: string;
  name: string;
  type: "ADMIN" | "USER";
  nickname?: string;
  bio: string;
  email: string;
  groups: GroupData[];
  friendsAmount?: number;
  participating?: ParticipantsData[];
  created_at: string;
  isPremium: boolean;
  avatar: {
    name: string;
    url: string;
  };
}

export interface FriendData {
  id: string;
  chat: GroupData;
  unreadMessagesAmount?: number;
  requested_by: UserData;
  received_by: UserData;
  received_by_id: string;
  requested_by_id: string;
  state: FriendsStates;
  created_at: string;
}

export interface GroupData {
  id: string;
  name: string;
  description: string;
  privacy: "PUBLIC" | "PRIVATE";
  type: "GROUP" | "DIRECT";
  tags: string[];
  group_avatar: {
    name: string;
    url: string;
  };
  group_settings: ISetting[];
  owner_id: string;
  owner: UserData;
  participantsAmount?: number;
  unreadMessagesAmount?: number;
  acceptingParticipants?: boolean;
  created_at: string;
}

export interface ParticipantsData {
  id: string;
  user_id: string;
  group_id: string;
  user: UserData;
  group: GroupData;
  status: "ONLINE" | "OFFLINE";
  role: ParticipantRoles;
  state: ParticipantStates;
  participant_settings: ISetting[];
  participating_since: string;
  last_seen: string;
}

export interface AudioData {
  name: string;
  url: string;
  size: number;
  duration: number;
}

export interface MessageData {
  id: string;
  message: string;
  links?: LinkData[];
  created_at: string;
  author: UserData;
  // participant: ParticipantData;
  group: GroupData;
  reply_to?: MessageData;
  voice_message?: AudioData;
  files?: FileData[] | File[];
  sended?: boolean;
  mentions?: string[];
  poll?: PollData;
  localReference?: string;
}

export interface PollData {
  id: string;
  message_id: string;
  message: MessageData;
  question: string;
  allows_multiple: boolean;
  options: PollOptionData[];
  created_at: string;
}

export interface PollOptionData {
  id: string;
  poll_id: string;
  option_text: string;
  votes_count: number;
  poll: PollData;
  votes: PollVoteData[];
}

interface PollVoteData {
  id: string;
  poll_id: string;
  option_id: string;
  user_id: string;
  created_at: string;
  poll: PollData;
  option: PollOptionData;
}

export interface FileData {
  id: string;
  name: string;
  original_name: string;
  url: string;
  size: number;
  type: "unknown" | string;
}

export interface InviteData {
  id: string;
  friend_id?: string;
  sended_by?: UserData;
  friend?: FriendData;
  participants_amount?: number;
  group_id: string;
  group: GroupData;
  invite_code: string;
  is_permanent: boolean;
  is_unlimited_usage: boolean;
  max_usage_amount: number;
  usage_amount: number;
  expire_in: string;
  expire_timezone: string;
  created_at: string;
}

export interface LinkData {
  link: string;
  siteName: string;
  title: string;
  description: string;
  favicon: string;
  image: string;
}

export interface ISetting {
  id: string;
  setting_name: string;
  setting_value: string;
  typeof_value: string;
  input_type: string;
}

export interface IDashboardData {
  counts: {
    users: number;
    groups: number;
    messages: number;
    reports: number;
    feedbacks: number;
    subscriptions: number;
  };
}

export interface IReport {
  id: string;
  report_type: ReportType;
  status: ReportStatus;
  report_to_type: ReportToType;
  from_user_id: string;
  message?: string;
  to_message_id?: string;
  to_user_id?: string;
  to_group_id?: string;
  from_user: UserData;
  to_user?: UserData;
  to_group?: GroupData;
  to_message?: MessageData;
  created_at: Date;
  updated_at: Date;
}

export interface IFeedback {
  id: string;
  user_id: string;
  type: FeedbackType;
  user?: UserData;
  content: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export { ReportStatus, ReportToType };

