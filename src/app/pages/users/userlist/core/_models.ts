import {ID, Response} from '../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
  mobile?: string
  email?: string
  address?: string
  image?: string
  roleList?: []
  organization?: string
  createdAt?: string
  last_login?: string
  two_steps?: boolean
  joined_day?: string
  online?: boolean
  role?: string
  position?: string
  avatar?: string
  initials?: {
    label: string
    state: string
  }
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  image: 'avatars/300-6.jpg',
  position: 'Art Director',
  role: 'Administrator',
  name: '',
  email: '',
}
