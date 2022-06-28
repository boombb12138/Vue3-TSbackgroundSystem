import qnRequest from '../index'
import { IAccount } from './type'
import { IDataType } from './type'
import { ILoginresult } from './type'
enum LoginAPI {
  AccountLogin = '/login',
  UsersInfo = '/users/',
  UserMenu = '/role/' //用法/role/id/menu
}
export default function accountLoginRequest(account: IAccount) {
  return qnRequest.post<IDataType<ILoginresult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
export function requestUserInfoById(id: number) {
  return qnRequest.get<IDataType>({
    url: LoginAPI.UsersInfo + id
  })
}
export function requestUserMenu(id: number) {
  return qnRequest.get<IDataType>({
    url: LoginAPI.UserMenu + id + '/menu'
  })
}
