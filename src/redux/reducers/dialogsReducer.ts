import {  ResultCodesEnum, SingleDialogItemType } from './../../apiDal/apiDal';
import { dialogsAPI } from "../../apiDal/apiDal";
import { ThunkAction } from '@reduxjs/toolkit';
import { AppStateType } from '../redux-store';

let initialState = {
  dialogs: {} as DialogsType,
};

export const dialogReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {
    case "GET-ALL-MESSAGES-WITH-USER":
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [action.userId]: action.dialogs,
        },
      };

    case "SEND-MESSAGE-TO-SERVER":
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [action.userId]: [...state.dialogs[action.userId], action.message],
        },
      };

    default:
      return state;
  }
}


//* Action Creators
export const getAllMessagesAC = (userId: number, dialogs: SingleDialogItemType[]) => ({ type: "GET-ALL-MESSAGES-WITH-USER", userId, dialogs } as const);
export const sendMessageAC = (userId: number, message: SingleDialogItemType) => ({ type: "SEND-MESSAGE-TO-SERVER",userId,  message } as const);


//* Thunk Creators

//get all dialogs 
export const getAllDialogsTC = (userId: number): ThunkType => {
  return async (dispatch) => {
    const resp = await dialogsAPI.getAllMessagesFromServer(userId);
    if (resp.data.error === null) {
      dispatch(getAllMessagesAC(userId, resp.data.items));
    }
  };
};

//send message to a friend
export const sendMessageThunCreator = (userId: number, message: string): ThunkType => {
  return (dispatch) => {
   	return dialogsAPI.sendMessageToServer(userId, message)
		.then((resp) => {
		if (resp.data.resultCode === ResultCodesEnum.Success) {
			dispatch(sendMessageAC(userId, resp.data.data.message));
		}
		});
    
  };
};



//* Types
type InitialStateType = typeof initialState;

export type DialogsType = {
  [userId: number]: SingleDialogItemType[];
};

type ActionsType = ReturnType<typeof sendMessageAC> | ReturnType<typeof getAllMessagesAC>;

type ThunkType<ReturnType = Promise<void>> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>

