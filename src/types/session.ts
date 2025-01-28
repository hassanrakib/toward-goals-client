export interface Session {
  session: string;
}

export interface DecodedSession {
  session: {
    username: string;
  };
}
