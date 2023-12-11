import { EngineManager, PlayerManager } from "@verza/sdk";
import { IDialogParams, IDialogResponse } from "./types";

type DialogCallbackResponse = (player: PlayerManager, dialog: IDialogResponse) => void;

class DialogManager {
	private engine: EngineManager;
	private fnCallback: DialogCallbackResponse | null;

	constructor(engine: EngineManager) {
		this.engine = engine;
		this.fnCallback = null;

		this.engine.network.onPlayerEvent('onDialogResponse', (player, dialogData) => {
			const dialog = dialogData as IDialogResponse;
			if(this.fnCallback !== null) this.fnCallback(player, dialog);
		});
	}

	public onDialogResponse(fn : DialogCallbackResponse) {
		this.fnCallback = fn;
	}
	public showPlayerDialog(player: PlayerManager, {dialogId, style, caption, text, button1, button2 } : IDialogParams) {
		const dialog : IDialogParams = {dialogId, text, caption, style, button1, button2 };
		this.engine.network.emitToPlayer(player, 'onSendDialog', dialog);
	}
} 
export default function initDialogManager(engine: EngineManager) : DialogManager {
	return new DialogManager(engine);
}