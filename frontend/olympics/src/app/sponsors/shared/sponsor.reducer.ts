import {SponsorsActions, SponsorsActionType} from './sponsor.actions';
import {Sponsor} from './sponsor.model';

export const initialState = {
  sponsorList: undefined,
  status: undefined,
  showNotification: undefined,
  notificationMessage: undefined
};

export function sponsorReducer(state = initialState, action: SponsorsActions): any {

  switch (action.type) {

    case SponsorsActionType.GET_SPONSORS: {
      return {
        ...state,
        status: undefined,
        showNotification: false
      };
    }

    case SponsorsActionType.GET_SPONSORS_SUCCESS: {
      return {
        ...state,
        sponsorList: action.payload,
        status: 'success',
        showNotification: false
      };
    }

    case SponsorsActionType.GET_SPONSORS_FAILED: {
      return {
        ...state,
        status: 'error',
        showNotification: false
      };
    }

    case SponsorsActionType.FILTER_BY_COUNTRY: {
      return {
        ...state,
        status: undefined,
        showNotification: false
      };
    }

    case SponsorsActionType.FILTER_BY_COUNTRY_SUCCESS: {
      return {
        ...state,
        sponsorList: action.payload,
        status: 'success',
        showNotification: false
      };
    }

    case SponsorsActionType.FILTER_BY_COUNTRY_FAILED: {
      return {
        ...state,
        status: 'error',
        showNotification: false
      };
    }

    case SponsorsActionType.SORT_BY_COUNTRY: {
      return {
        ...state,
        status: undefined,
        showNotification: false
      };
    }

    case SponsorsActionType.SORT_BY_COUNTRY_SUCCESS: {
      return {
        ...state,
        sponsorList: action.payload,
        status: 'success',
        showNotification: false
      };
    }

    case SponsorsActionType.SORT_BY_COUNTRY_FAILED: {
      return {
        ...state,
        status: 'error',
        showNotification: false
      };
    }

    case SponsorsActionType.ADD_SPONSOR: {
      return {
        ...state,
        status: undefined,
        showNotification: false
      };
    }

    case SponsorsActionType.ADD_SPONSOR_SUCCESS: {
      const sponsorList: Sponsor[] = [...state.sponsorList, action.payload];
      return {
        ...state,
        sponsorList,
        status: 'success',
        notificationMessage: 'The sponsor was successfully added! 🙂',
        showNotification: true
      };
    }

    case SponsorsActionType.ADD_SPONSOR_FAILED: {
      return {
        ...state,
        status: 'error',
        notificationMessage: 'The sponsor could not be added! 🙁',
        showNotification: true
      };
    }

    case SponsorsActionType.UPDATE_SPONSOR: {
      return {
        ...state,
        status: undefined,
        showNotification: false
      };
    }

    case SponsorsActionType.UPDATE_SPONSOR_SUCCESS: {
      const sponsorList: Sponsor[] = [...state.sponsorList];
      const sponsor: Sponsor = action.payload;
      for (let i = 0; i < sponsorList.length; ++i) {
        if (sponsorList[i].id === sponsor.id) {
          sponsorList[i] = sponsor;
          break;
        }
      }
      return {
        ...state,
        sponsorList,
        status: 'success',
        showNotification: true,
        notificationMessage: 'The sponsor was successfully updated! 🙂'
      };
    }

    case SponsorsActionType.UPDATE_SPONSOR_FAILED: {
      return {
        ...state,
        status: 'error',
        showNotification: true,
        notificationMessage: 'The sponsor could not be updated! 🙁'
      };
    }

    case SponsorsActionType.DELETE_SPONSOR: {
      return {
        ...state,
        status: undefined,
        showNotification: false
      };
    }

    case SponsorsActionType.DELETE_SPONSOR_SUCCESS: {
      const sponsorId = (action.payload as any).id;
      const sponsorList: Sponsor[] = [...state.sponsorList];
      for (let i = 0; i < sponsorList.length; ++i) {
        if (sponsorList[i].id === sponsorId) {
          sponsorList.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        status: 'success',
        sponsorList,
        notificationMessage: 'The sponsor was successfully deleted! 🙂',
        showNotification: true
      };
    }

    case SponsorsActionType.DELETE_SPONSOR_FAILED: {
      return {
        ...state,
        status: 'error',
        notificationMessage: 'The sponsor could not be deleted! 🙁',
        showNotification: true
      };
    }

    default: {
      return state;
    }

  }

}
