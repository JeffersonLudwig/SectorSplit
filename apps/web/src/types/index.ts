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

export interface Team {
  id: string;
  name: string;
  color: string;
  logoUrl: string | null;
  carUrl: string | null;
  drivers?: Driver[];
}

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  number: number;
  country: string;
  photoUrl: string | null;
  teamId: string;
  team?: Team;
}

export interface SessionResult {
  id: string;
  sessionId: string;
  driverId: string;
  driver: Driver;
  position: number;
  timeMs: number | null;
  timeStr: string | null;
  status: string | null;
  points: number | null;
}

export interface RaceSession {
  id: string;
  raceId: string;
  type: SessionType;
  startsAt: string;
  endsAt: string | null;
  results?: SessionResult[];
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

export const SESSION_LABELS: Record<string, string> = {
  PRACTICE_1: 'Treino Livre 1',
  PRACTICE_2: 'Treino Livre 2',
  PRACTICE_3: 'Treino Livre 3',
  QUALIFYING: 'Qualificação',
  SPRINT_QUALIFYING: 'Sprint Qualifying',
  SPRINT: 'Sprint',
  RACE: 'Corrida',
};
