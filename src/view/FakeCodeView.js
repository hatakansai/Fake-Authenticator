import { element } from "./html-util.js";

export class FakeCodeView {
    //要素を表示するためのビュー
    createElement(code){
        const codeElement = element`
        <li>
            <h2 class="Number">Fake code No.${code.number}</h2>
            <p class="code" code="${code.code}">${code.code}</p>
        </li>`;

        return codeElement;
    }
}