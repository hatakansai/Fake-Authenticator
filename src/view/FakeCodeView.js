import { element } from "./html-util.js";

export class FakeCodeView {
    //要素を表示するためのビュー
    createElement(code){
        const codeElement = element`
        <li>
            <h2 class="code-title">Fake code No.${code.number}</h2>
            <p class="code-value">${code.value}</p>
        </li>`;

        return codeElement;
    }
}