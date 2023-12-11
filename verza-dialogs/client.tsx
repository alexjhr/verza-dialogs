import { useEngine } from "@verza/sdk/react";
import { useEffect, useState } from "react";
import { EDialogResponse, EDialogStyle, IDialogParams, IDialogResponse, interfaceName } from "./types";
import DialogComponentRender from "./component";

export default function DialogInterface() {
	const engine = useEngine();
	const [dialog, setDialog] = useState<IDialogParams | null>(null);

	// Show interface if dialog is active.
	useEffect(() => {
		const hasInterface = engine.ui.hasInterface(interfaceName);

		if(dialog && !hasInterface) engine.ui.addInterface(interfaceName);
		else if(!dialog && hasInterface) engine.ui.removeInterface(interfaceName);
	}, [engine.ui, dialog]);

	// The player receives a dialog from the server.
	engine.network.onServerEvent('onSendDialog', (data) => {
		setDialog(data as IDialogParams);
	});

	// The player tries to send the dialog response.
	const onClickButton = (input: string, button: EDialogResponse) => {
		if(!dialog) return;

		// Verify if the user can send the information.
		if((dialog.style === EDialogStyle.Input || dialog.style === EDialogStyle.Password) && button === EDialogResponse.Button1 && !input.length) return;
		setDialog(null); // Delete the dialog

		// Send information to the server.
		const toData : IDialogResponse = {
			dialogId: dialog.dialogId,
			response: button,
			inputText: input
		};
		engine.network.emitToServer('onDialogResponse', toData);
	}

	return <>
		{dialog && (
			<DialogComponentRender {...dialog} onClickButton={onClickButton} />
		)}
	</>

}