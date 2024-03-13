import { RootState } from '@/clientServices/redux/store'
import { createSelector } from 'reselect'

const selectUserPublicData = (state: RootState) =>
  state.userProfile.userPublicData.data
const selectUserPrivateData = (state: RootState) => state.auth.userData.user

const selectPublicDataStatus = (state: RootState) =>
  state.userProfile.userPublicData.status

const selectPrivateDataStatus = (state: RootState) => state.auth.userData.status

export const userPrivateDataSelector = createSelector(
  [
    selectUserPublicData,
    selectUserPrivateData,
    selectPublicDataStatus,
    selectPrivateDataStatus
  ],
  (userPublicInfo, userPrivateInfo, publicDataStatus, privateDataStatus) => ({
    userPrivateInfo: {
      data: {
        id: userPrivateInfo.id || '',
        email: userPrivateInfo?.email || ''
      },
      status: privateDataStatus
    },
    userPublicInfo: {
      data: {
        name: userPublicInfo?.name || '',
        surname: userPublicInfo?.surname || '',
        img: userPublicInfo?.profile_image || '',
        username: userPublicInfo?.username || ''
      }, //todo: добавить возможность undefined
      status: publicDataStatus
    }
  })
)
