import { element } from "./html-util.js";
import { FakeCodeView } from "./FakeCodeView.js";

export class FakeListView{
    //コードのリストを表示するビュー
    createElement(fakeList){
        const fakeListElement = element`<ul></ul>`;
        fakeList.forEach(code => {
            const codeView = new FakeCodeView();
            const fakeCodeElement = codeView.createElement(code);
            fakeListElement.appendChild(fakeCodeElement);
        });
        return fakeListElement;
    }
}