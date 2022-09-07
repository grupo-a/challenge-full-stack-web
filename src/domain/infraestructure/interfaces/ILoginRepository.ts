export interface ILoginRepository {
  login: (user: any) => Promise<any>
}
