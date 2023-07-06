import { element } from "./html-util.js";

export class FakeCodeView {
    //要素を表示するためのビュー
    createElement(code){
        const codeElement = element`
        <li>
            <h2 class="Number">Fake code No.${code.number}</h2>
            <p class="code" code="${code.code}">${code.code}</p>
            <svg width="80" height="80">
                <circle class="background-circle" r="20" cx="40" cy="40" fill="#c632a6"></circle>
                <circle class="circle" r="20" cx="40" cy="40"></circle>
            </svg>
        </li>`;

        return codeElement;
    }
}