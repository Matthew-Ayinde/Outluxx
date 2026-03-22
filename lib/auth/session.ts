export type SessionState = {
  isAuthenticated: boolean;
  userId?: string;
};

export function getSessionState(): SessionState {
  return { isAuthenticated: false };
}
