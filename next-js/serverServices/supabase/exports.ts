import * as authSA from './serverActions/authActions'
import * as userSA from './serverActions/userActions'
import * as publicationsS from './server/publications'
export * as authSA from './serverActions/authActions'
export * as userSA from './serverActions/userActions'
export * as publicationsS from './server/publications'

export type TAuthSA = typeof authSA
export type TUserSA = typeof userSA
export type TPublicationsS = typeof publicationsS
