//functions imports
import * as authSA from './serverActions/authActions'
import * as userSA from './serverActions/userActions'
import * as objectsSA from './serverActions/objectsActions'
import * as adsSA from './serverActions/adsActions'
import * as publicationsS from './server/publications'
//functions exports
export * as authSA from './serverActions/authActions'
export * as userSA from './serverActions/userActions'
export * as objectsSA from './serverActions/objectsActions'
export * as adsSA from './serverActions/adsActions'
export * as publicationsS from './server/publications'

export type { IPrivateUser, IPublicUser } from './serverActions/userActions'
export type {
  ISignInWithPassword,
  ISignOut,
  ICheckLocalSession
} from './serverActions/authActions' //todo: check imports

export type AuthSAType = typeof authSA
export type UserSAType = typeof userSA
export type ObjectsSAType = typeof objectsSA
export type AdsSAType = typeof adsSA
export type PublicationsSType = typeof publicationsS
