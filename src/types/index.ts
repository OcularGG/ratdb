export interface Player {
  id: string;
  name: string;
  server: 'WEST' | 'EAST' | 'EUROPE';
  created_at: string;
  updated_at: string;
}

export interface ServerStats {
  west: { count: number };
  east: { count: number };
  europe: { count: number };
}