import * as PIXI from "pixi.js";

export class InputField extends PIXI.Text{
    private inputElement?:HTMLInputElement;
    private backgroundDisplay?:PIXI.Sprite|PIXI.Graphics|PIXI.Text;
    private isEditing = false;
    private preEditIndex = 0;
    public editCursor : string =  "|";
    
    constructor(
        options?:Partial<{
            text:string,
            style:PIXI.TextStyle,
            backgroundDisplay:PIXI.Sprite|PIXI.Graphics|PIXI.Text,
            inputElement:HTMLInputElement
        }>
    ){
        super();
        if(options && options.text){
            this.text = options.text;
        }
        if(options && options.style){
            this.style = options.style;
        }
        if(options && options.inputElement){
            this.inputElement = options.inputElement;
        }else{
            let _inputElement = document.createElement('input');
            _inputElement.style.setProperty("height", "0px");
            _inputElement.style.setProperty("width", "0px");
            _inputElement.style.setProperty("padding", "0px");
            _inputElement.style.setProperty("margin", "0px");
            _inputElement.style.setProperty("position", "fixed");
            _inputElement.style.setProperty("opacity", "0");
            document.body.appendChild(_inputElement);
            this.inputElement = _inputElement;
        }

        if(options && options.backgroundDisplay){
            this.backgroundDisplay = options.backgroundDisplay;
        }else{
            this.backgroundDisplay = this;
        }
        this.backgroundDisplay.interactive = true;
        this.backgroundDisplay.on("pointerdown", this._ClickFocus.bind(this));
        this.BindInputElementEvent(this.inputElement);
    }
    private _ClickFocus(e:any){
        e.preventDefault();
        this.inputElement?.focus();
        this.isEditing=true;
        this._UpdateText(e);
    }
    private _EndEdit(e:any){
        e.preventDefault();
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
        if(typeof e.target.selectionStart === 'number'){
            _editIdx = e.target.selectionStart + _offset >= 0 ? e.target.selectionStart + _offset : 0;
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