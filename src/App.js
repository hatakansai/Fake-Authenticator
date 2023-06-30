import { FakeListModel } from "./model/FakeListModel.js";
import { FakeListView } from "./view/FakeListView.js";
import { FakeCodeModel } from "./model/FakeCodeModel.js";
import { render } from "./view/html-util.js";
import { EventEmitter } from "./EventEmitter.js";

export class App{
    constructor(){
        this.fakeListModel = new FakeListModel();
        this.fakeListView = new FakeListView();
        this.eventEmitter = new EventEmitter();

        const generateCode = () => {
            const randomCode = Math.floor(Math.random() * 999999).toString().padStart(6,'0');//ランダムな6桁の数字の生成
            const separateNumber = `${randomCode.substring(0, 3)} ${randomCode.substring(3)}`;//xxx xxxの形に成形
            return separateNumber
        }

        const updateCode = () => {
            const codeElements = document.querySelectorAll(".code");//コード要素の取得
            codeElements.forEach((codeElement) => {
                codeElement.textContent = generateCode();
            });
        };

        //addCodeを受け取ったとき
        this.eventEmitter.addEventListener("addCode", () => {
            const code = new FakeCodeModel(`Fake code No.${this.fakeListModel.number}`, generateCode());//リストの要素・コードを作成
            this.fakeListModel.addCode(code);//作成したコードの追加
            this.renderCodeList();//コードリストを表示
        });
        //removeCodeを受け取ったとき
        this.eventEmitter.addEventListener("removeCode", () => {
            this.fakeListModel.removeCode();//リストの最後のコードを削除
            this.renderCodeList();
        });
        this.renderCodeList();
        this.setupEventListeners();

        setInterval(() => {
            updateCode();
        }, 5000);
    }

    renderCodeList(){
        const fakeListElement = this.fakeListView.createElement(
            this.fakeListModel.getCodes()
        );
        const containerElement = document.querySelector(".code-list");
        render(fakeListElement, containerElement);
    }

    setupEventListeners(){
        //+ボタンクリック時
        const plusButton = document.querySelector(".plus");
        plusButton.removeEventListener("click", this.addCodeListener);
        this.addCodeListener = () => {
            this.eventEmitter.emit("addCode");//addCodeを渡す
        }
        plusButton.addEventListener("click", this.addCodeListener);
        //-ボタンクリック時
        const minusButton = document.querySelector('.minus');
        minusButton.removeEventListener('click', this.removeCodeListener);
        this.removeCodeListener = () => {
            this.eventEmitter.emit("removeCode");//removeCodeを渡す
        };
        minusButton.addEventListener("click", this.removeCodeListener);
    }
}