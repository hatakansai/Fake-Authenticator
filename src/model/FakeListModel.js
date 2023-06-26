export class FakeListModel{
    #codes;
    constructor(){
        this.#codes = [];//配列の初期化
    }

    getCodes(){
        return this.#codes;//現在のリストの取得
    }

    addCode(code){
        this.#codes.push(code);//codeの追加
    }

    removeCode(){
        this.#codes.pop();//末尾のコードを削除
    }
}