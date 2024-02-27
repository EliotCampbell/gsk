import * as authSA from './serverActions/authActions'
import * as userSA from './serverActions/userActions'
import * as objectsSA from './serverActions/objectsActions'
import * as publicationsS from './server/publications'

export * as authSA from './serverActions/authActions'
export * as userSA from './serverActions/userActions'
export * as objectsSA from './serverActions/objectsActions'
export * as publicationsS from './server/publications'

export type { IPrivateUser, IPublicUser } from './serverActions/userActions'
export type {
  ISignInWithPassword,
  ISignOut,
  ICheckLocalSession
} from './serverActions/authActions'

export type AuthSAType = typeof authSA
export type UserSAType = typeof userSA
export type ObjectsSAType = typeof objectsSA
export type PublicationsSType = typeof publicationsS
