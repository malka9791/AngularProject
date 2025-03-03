export class LoginRes {
  constructor(
    public token: string,
    public userId: number,
    public role: string
  ) {}
}
