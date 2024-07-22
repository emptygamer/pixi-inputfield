async function init(){
    let width = 640;
    let height = 360;
    const app = new PIXI.Application();
    await app.init({
        width: width , height: height, backgroundColor: 0xf5f5f5
    });
    document.body.appendChild(app.canvas);
    
    // TextInputField with background box
    const textInputFieldContainer = new PIXI.Container();
    const textInputBackground = new PIXI.Graphics();
    textInputBackground.lineStyle(2, 0x4f4f4f, 1);
    textInputBackground.beginFill(0x787878, 0.25);
    textInputBackground.drawRoundedRect(4, 4, 300, 46, 16);
    textInputBackground.endFill();
    const fontStyle = new PIXI.TextStyle({
        fontSize: 32,
        fill: "black",
    });
    const textInput = new PixiInputField.InputField({text:"", style:fontStyle, backgroundDisplay:textInputBackground});
    textInput.x = 14;
    textInput.y = 8;
    textInputFieldContainer.addChild(textInputBackground);
    textInputFieldContainer.addChild(textInput);

    // // Pure TextInputField
    const pureTextInput = new PixiInputField.InputField({text:"Press To Edit", style:fontStyle});
    pureTextInput.x = 14;
    pureTextInput.y = 80;

    app.stage.addChild(textInputFieldContainer);
    app.stage.addChild(pureTextInput);

    app.ticker.add((delta) => {
        // Use GetInputText to get the input text value.
        // console.log(textInput.GetInputText());
    });
}

init();
