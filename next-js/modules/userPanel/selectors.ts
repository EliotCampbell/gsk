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

const selectMyAds = (state: RootState) => state.ads.adsList.data

const selectMyAdsStatus = (state: RootState) => state.ads.adsList.status

export const myAdsSelector = createSelector(
  [selectMyAds, selectMyAdsStatus],
  (myAds, status) => ({
    myAds: myAds.map((ad) => ({
      id: ad.id,
      title: ad.title,
      body: ad.body,
      created_at: new Date(ad.created_at),
      ad_images: ad.ad_images || [],
      user_id: ad.user_id,
      is_hidden: ad.is_hidden
    })),
    status
  })
)

const selectMyObjects = (state: RootState) => state.objects.myObjects.data

const selectMyObjectsStatus = (state: RootState) =>
  state.objects.myObjects.status

export const myObjectsSelector = createSelector(
  [selectMyObjects, selectMyObjectsStatus],
  (myObjects, status) => ({
    myObjects: myObjects.map((object) => ({
      id: object.id,
      type: object.type,
      individual_number: object.individual_number,
      ownerships: object.ownerships.map((data) => ({
        owner_since: new Date(data.owner_since),
        owner_until: data.owner_until ? new Date(data.owner_until) : null
      }))
    })),
    status
  })
)
