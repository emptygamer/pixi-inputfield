import * as PIXI from "pixi.js";

export class InputField extends PIXI.Text{
    private inputElement?:HTMLInputElement;
    private backgroundDisplay?:PIXI.DisplayObject;
    private isEditing = false;
    private preEditIndex = 0;
    public editCursor : string =  "|";
    constructor(
        text?: string,
        style?: PIXI.TextStyleOptions,
        backgroundDisplay?:PIXI.DisplayObject,
        inputElement?:HTMLInputElement,
        canvas?: HTMLCanvasElement
    ){
        super(text, style, canvas);

        if(inputElement){
            this.inputElement = inputElement;
        }else{
            let _inputElement = document.createElement('input');
            // _inputElement.style.setProperty("width", "0px");
            _inputElement.style.setProperty("height", "0px");
            _inputElement.style.setProperty("opacity", "0");
            _inputElement.style.setProperty("overflow", "visible");
            document.body.appendChild(_inputElement);
            this.inputElement = _inputElement;
        }
        this.backgroundDisplay = backgroundDisplay ? backgroundDisplay : this;
        this.backgroundDisplay.interactive = true;
        this.backgroundDisplay.buttonMode = true;
        this.backgroundDisplay.on("click", this._ClickFocus.bind(this));
        this.BindInputElementEvent(this.inputElement);
    }
    private _ClickFocus(e:any){
        this.inputElement?.focus();
        this.isEditing=true;
        this._UpdateText(e);
    }
    private _EndEdit(e:any){
        this.isEditing=false;
        this._UpdateText(e);
    }
    private _UpdateText(e:any){
        let _offset = 0;
        if (e.key == "ArrowLeft"){
            _offset = -1;
        }
        if (e.key == "ArrowRight"){
            _offset = 1;
        }

        let _editIdx = this.preEditIndex;
        if(e.target.selectionStart){
            _editIdx = e.target.selectionStart + _offset;
            this.preEditIndex = _editIdx;
        }
        let _text = this.inputElement?.value as string;
        
        if(this.isEditing){
            this.text = _text.slice(0, _editIdx) + this.editCursor + _text.slice(_editIdx);
        }else{
            this.text = _text;
        }
    }
    public BindInputElementEvent(inputElement:HTMLInputElement){
        if(this.inputElement != undefined){
            this.UnBindInputElementEvent();
        }
        this.inputElement = inputElement;
        this.inputElement?.addEventListener("input", this._UpdateText.bind(this));
        this.inputElement?.addEventListener("keydown", this._UpdateText.bind(this));
        this.inputElement?.addEventListener("focusout", this._EndEdit.bind(this));
    }
    public UnBindInputElementEvent(){
        this.inputElement?.removeEventListener("input", this._UpdateText.bind(this));
        this.inputElement?.removeEventListener("keydown", this._UpdateText.bind(this));
        this.inputElement?.removeEventListener("focusout", this._EndEdit.bind(this));
        this.inputElement = undefined;
    }
    public GetInputText(){
        return this.inputElement?.value as string;
    }
}