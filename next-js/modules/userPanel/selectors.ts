import { RootState } from '@/clientServices/redux/store'
import { createSelector } from 'reselect'

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

const selectMyServices = (state: RootState) => state.services.servicesList.data
const selectMyServicesStatus = (state: RootState) =>
  state.services.servicesList.status
const selectCreateServiceStatus = (state: RootState) =>
  state.services.createService.status

export const myServicesSelector = createSelector(
  [selectMyServices, selectMyServicesStatus, selectCreateServiceStatus],
  (myServices, myServicesStatus, createServiceStatus) => ({
    myServices: myServices.map((service) => ({
      ...service,
      created_at: new Date(service.created_at)
    })),
    myServicesStatus,
    createServiceStatus
  })
)
