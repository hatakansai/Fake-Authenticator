import { FakeListModel } from "./model/FakeListModel.js";
import { FakeListView } from "./view/FakeListView.js";
import { FakeCodeModel } from "./model/FakeCodeModel.js";
import { FakeCodeView } from "./view/FakeCodeView.js";
import { element, render } from "./view/html-util.js";
import { EventEmitter } from "./EventEmitter.js";

export class App{
    constructor(){
        this.fakeListModel = new FakeListModel();
        this.fakeListView = new FakeListView();
        this.eventEmitter = new EventEmitter();

        //addCodeを受け取ったとき
        this.eventEmitter.addEventListener("addCode", () => {
            const randomCode = Math.random();//ランダムな数字の生成
            const code = new FakeCodeModel(`Fake code No.${this.#FakeListModel.getCodes().lengs + 1}`, randomCode);//リストの要素・コードを作成
            this.fakeListModel.addCode(code);//作成したコードの追加
            this.renderCodeList;//コードリストを表示
        });
        //removeCodeを受け取ったとき
        this.eventEmitter.addEventListener("removeCode", () => {
            this.fakeListModel.removeCode();//リストの最後のコードを削除
            this.renderCodeList();
        });
        const plusButton = document.querySelector('.plus');
        //+ボタンクリック時
        plusButton.addEventListener('click', () => {
            const randomCode = Math.random();//ランダムな数字の生成
            const code = new FakeCodeModel(`Fake code No.${FakeListModel.getCodes().lengs + 1}`, randomCode);//コード作成
            this.fakeListModel.addCode(code);//コードの追加
            this.renderCodeList();//コードリストを表示
        });
        this.renderCodeList();
        this.setupEventListeners();
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
        plusButton.addEventListener("click", () => {
            this.eventEmitter.emit("addCode");//addCodeを渡す
        });
        //-ボタンクリック時
        const minusButton = ocument.querySelector('.minus');
        minusButton.addEventListener('click', () => {
            this.eventEmitter("removeCode");//removeCodeを渡す
        });
    }
}