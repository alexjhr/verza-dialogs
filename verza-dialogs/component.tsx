import { useEffect, useState } from "react";
import { EDialogResponse, EDialogStyle, IDialogParams } from "./types";
import './component.css';

interface IDialogComponent extends IDialogParams {
    onClickButton: (text: string, response: number) => void;
}

export default function DialogComponentRender({ caption, text, style, button1, button2, onClickButton } : IDialogComponent) {
    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        setInputValue(event.target.value);
    };
    const handleClickButton = (btnResponse: EDialogResponse) : void =>  {
        onClickButton(inputValue, btnResponse);
    };

    useEffect(() => {
		const onKeyUp = (event: KeyboardEvent) => {
			if(event.code !== "Enter") return;

			event.stopPropagation();
			onClickButton(inputValue, EDialogResponse.Button1);
		};
		window.addEventListener("keyup", onKeyUp, true);
		//
		return () => window.removeEventListener("keyup", onKeyUp, true);
	});

    return (
        <div className="dialogContainer">
            <div className="dialog">
                <h3 className="title">{caption}</h3>
                <div className="body">
                    <p className="text">{text}</p>
                    {(style === EDialogStyle.Input || style === EDialogStyle.Password) && (
                        <div className="inputContainer">
                            <input autoFocus type={style === EDialogStyle.Input ? 'text' : 'password'} className="input" value={inputValue} onChange={handleChange}/>
                        </div>
                    )}
                    <div className="buttons">
                        <button className="button" onClick={() => handleClickButton(EDialogResponse.Button1)}>{button1}</button>
                        {button2 && <button className="button" onClick={() => handleClickButton(EDialogResponse.Button2)}>{button2}</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}