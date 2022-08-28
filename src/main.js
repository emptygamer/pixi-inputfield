let width = 640;
let height = 360;
const app = new PIXI.Application({
    width: width , height: height, backgroundColor: 0xf5f5f5
});
document.body.appendChild(app.view);

PIXI.Loader.shared
    .load(init);

function init(){
    // TextInputField with background box
    const textInputFieldBox = new PIXI.Container();
    const textInputBackground = new PIXI.Graphics();
    textInputBackground.lineStyle(2, 0x4f4f4f, 1);
    textInputBackground.beginFill(0x787878, 0.25);
    textInputBackground.drawRoundedRect(4, 4, 300, 46, 16);
    textInputBackground.endFill();
    const font = new PIXI.TextStyle({
        fontSize: 32,
        fill: [
            "black"
        ],
    });
    const textInput = new PixiInputField.InputField("", font, textInputBackground);
    textInput.x = 14;
    textInput.y = 8;
    textInputFieldBox.addChild(textInputBackground);
    textInputFieldBox.addChild(textInput);

    // Pure TextInputField
    const pureTextInput = new PixiInputField.InputField("Press To Edit", font);
    pureTextInput.x = 14;
    pureTextInput.y = 60;

    app.stage.addChild(textInputFieldBox);
    app.stage.addChild(pureTextInput);

    let dt = 0;
    app.ticker.add((delta) => {
        dt = 1 / app.ticker.FPS;
        // Use GetInputText to get the input text value.
        // console.log(textInput.GetInputText());
    });
}