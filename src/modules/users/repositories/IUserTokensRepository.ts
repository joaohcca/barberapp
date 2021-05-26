import UserToken from '../infra/typeorm/entities/UserToken'

export default interface IUserToken {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
