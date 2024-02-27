import { RootState } from '@/clientServices/redux/store'
import { createSelector } from 'reselect'

const selectUserPublicData = (state: RootState) =>
  state.userProfile.userPublicData.data
const selectUserPrivateData = (state: RootState) =>
  state.userProfile.userPrivateData.data

const selectPrivateDataPending = (state: RootState) =>
  state.userProfile.userPrivateData.pending

const selectPublicDataPending = (state: RootState) =>
  state.userProfile.userPublicData.pending

export const userPrivateDataSelector = createSelector(
  [
    selectUserPublicData,
    selectUserPrivateData,
    selectPublicDataPending,
    selectPrivateDataPending
  ],
  (userPublicData, userPrivateData, publicDataPending, privateDataPending) => ({
    userPrivateData: {
      id: userPrivateData?.id || '',
      name: userPublicData?.name || '',
      surname: userPublicData?.surname || '',
      img: userPublicData?.profile_image || '',
      username: userPublicData?.username || '',
      email: userPrivateData?.email || ''
    },
    pending: privateDataPending || publicDataPending
  })
)
