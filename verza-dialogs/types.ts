export enum EDialogStyle {
	Msgbox,
	Input,
	Password
}
export interface IDialogParams {
	dialogId: string | number;
	caption: string;
	text: string;
	style: EDialogStyle;
	button1: string;
	button2?: string;
}
export enum EDialogResponse {
	Button1 = 1,
	Button2 = 0
}
export interface IDialogResponse {
	dialogId: string | number;
	response: EDialogResponse;
	inputText: string;
}
export const interfaceName = 'dialogs';