//functions imports
import * as authSA from './serverActions/authActions'
import * as userSA from './serverActions/userActions'
import * as objectsSA from './serverActions/objectsActions'
import * as adsSA from './serverActions/adsActions'
import * as publicationsS from './server/publications'
import * as servicesSA from './serverActions/servicesActions'
//functions exports
export * as authSA from './serverActions/authActions'
export * as userSA from './serverActions/userActions'
export * as objectsSA from './serverActions/objectsActions'
export * as adsSA from './serverActions/adsActions'
export * as publicationsS from './server/publications'
export * as servicesSA from './serverActions/servicesActions'

export type { IPublicUser } from './serverActions/userActions'
export type {
  ISignInWithPassword,
  ISignOut,
  ICheckLocalSession,
  IGetUser,
  IRefreshSession
} from './serverActions/authActions'
export type { IGetAdsByUser } from './serverActions/adsActions'
export type { IGetObjectsByUser } from './serverActions/objectsActions'
export type {
  ICreateService,
  IGetServicesByUser,
  IDeleteServiceById
} from './serverActions/servicesActions'

export type AuthSAType = typeof authSA
export type UserSAType = typeof userSA
export type ObjectsSAType = typeof objectsSA
export type AdsSAType = typeof adsSA
export type PublicationsSType = typeof publicationsS
export type ServicesSAType = typeof servicesSA
