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
