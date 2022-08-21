declare namespace Express {
  interface CustomSessionFields {
    pengecer: any;
  }

  export interface Request {
    session: Session & Partial<SessionData> & CustomSessionFields;
  }
}
