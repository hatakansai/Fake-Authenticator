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

        //addCodeを受け取ったとき
        this.eventEmitter.addEventListener("addCode", () => {
            const code = new FakeCodeModel(`Fake code No.${this.fakeListModel.number}`, this.generateCode());//リストの要素・コードを作成
            this.fakeListModel.addCode(code);//作成したコードの追加
            this.renderCodeList();//コードリストを表示
        });
        //removeCodeを受け取ったとき
        this.eventEmitter.addEventListener("removeCode", () => {
            this.fakeListModel.removeCode();//リストの最後のコードを削除
            this.renderCodeList();
        });
        this.animateCircle();//パイチャートの開始
        this.renderCodeList();
        this.setupEventListeners();
    }

    renderCodeList(){
        const fakeListElement = this.fakeListView.createElement(this.fakeListModel.getCodes());
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

    generateCode(){
        const randomCode = Math.floor(Math.random() * 999999).toString().padStart(6,'0');//ランダムな6桁の数字の生成
        const separateNumber = `${randomCode.substring(0, 3)} ${randomCode.substring(3)}`;//xxx xxxの形に成形
        return separateNumber
    }

    animateCircle(){
        const updateCode = () => {
            const codeElements = this.fakeListModel.getCodes();//コード要素の取得
            codeElements.forEach((codeElement) => {
            codeElement.code = this.generateCode();
            });
        this.renderCodeList();
        };

        //SVGを用いて円を表示
        const updateCircle = (remainingTime) => {
            const circleElements = document.querySelectorAll(".circle");
            circleElements.forEach((circleElement) => {
                const ratio = remainingTime / 20;//残り時間との比率
                const circumference = 2 * Math.PI * circleElement.getAttribute("r");//円周
                const dashArray = `${circumference}`;
                const dashOffset = `${circumference * (1 - ratio)}`;//オフセットの設定
                const dashParam = `${dashOffset} ${dashArray}`

                circleElement.setAttribute("stroke-dasharray", dashParam);
            });
        };

        let start = Date.now();
        const duration = 20000;

        const animate = ()=> {
            const elapsed = Date.now() - start;
            const remainingTime = Math.max((duration - elapsed) / 1000, 0);
            updateCircle(remainingTime);

            if (remainingTime === 0) {
                updateCode();
                start = Date.now();
                requestAnimationFrame(animate);
            }

            if (elapsed < duration){
                requestAnimationFrame(animate);
            }
        };

        updateCircle(duration / 1000);
        animate();
    }
}