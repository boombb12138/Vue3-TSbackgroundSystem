import qnRequest from '@/service'
import { IDataType } from '../../types/type'
export function getPageListData(url: string, queryInfo: any) {
  return qnRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return qnRequest.delete<IDataType>({
    // url:/users/id
    url: url
  })
}

export function createPageListData(url: string, newData: any) {
  return qnRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageListData(url: string, editData: any) {
  return qnRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
