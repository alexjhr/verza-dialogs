# verza-dialogs
Shows the player a dialog box.

## Installation
### Client Example
```js
import { EngineProvider } from "@verza/sdk/react";
import { initReactEngine } from "@verza/sdk/react/client";
import DialogInterface from "../verza-dialogs/client"; // Load dialog interface!

export default async function script(id: string) {
  const [render] = await initReactEngine({
    id,
    webServer: new URL(import.meta.url).origin + '/server/script'
  });
  
  render(
    <EngineProvider>
      <DialogInterface />
    </EngineProvider>
  );
}
```
### Server Example
- Load the server dialogs function.
```js
import initDialogManager from "../verza-dialogs/server";
import { EDialogStyle } from "../verza-dialogs/types";
```
- Initialize the dialog manager and register the callback.
```js
const dialogManager = initDialogManager(engine);
dialogManager.onDialogResponse((player, { dialogId, response, inputText }) => {
  /*
  - player = Verza/PlayerManager
  - dialogId = The identifier of the displayed dialog.
  - response = 1 for left button and 0 for right button (if only one button shown, always 1).
  - inputText = The text entered into the input box by the player.
  */
});
```
- Show dialog to player.
```js
dialogManager.showPlayerDialog(player, {
  dialogId: 'dialog-1',
  caption: "Hello world",
  text: "Welcome to my server, this is a test dialog.",
  style: EDialogStyle.Msgbox,
  button1: "Thanks"
});
```
