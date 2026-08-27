export type Role = 'USER' | 'ADMIN';

export type SessionType =
  | 'PRACTICE_1'
  | 'PRACTICE_2'
  | 'PRACTICE_3'
  | 'QUALIFYING'
  | 'SPRINT_QUALIFYING'
  | 'SPRINT'
  | 'RACE';

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  role: Role;
  createdAt: string;
}

export interface Circuit {
  id: string;
  name: string;
  country: string;
  city: string;
  laps: number;
  lengthKm: number;
  lapRecordMs: number | null;
  lapRecordBy: string | null;
  mapImageUrl: string | null;
  layoutUrl: string | null;
}

export interface RaceSession {
  id: string;
  raceId: string;
  type: SessionType;
  startsAt: string;
  endsAt: string | null;
}

export interface Race {
  id: string;
  season: number;
  round: number;
  name: string;
  slug: string;
  country: string;
  flagUrl: string | null;
  circuit: Circuit;
  sessions: RaceSession[];
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  raceId: string;
  race?: Pick<Race, 'id' | 'name' | 'slug'>;
  author: Pick<User, 'id' | 'username' | 'avatarUrl'>;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: { comments: number };
}

export interface Comment {
  id: string;
  body: string;
  postId: string;
  author: Pick<User, 'id' | 'username' | 'avatarUrl'>;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  user: User;
  access_token: string;
}
