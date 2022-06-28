import { ILoginModule } from './login/types'
import { ISystemState } from './main/system/type'
export interface IRootState {
  name: string
  age: number
  entireDepartment: []
  entireRole: []
}
export interface IRootWithModule {
  login: ILoginModule
  system: ISystemState
}

export type IStore = IRootState & IRootWithModule
