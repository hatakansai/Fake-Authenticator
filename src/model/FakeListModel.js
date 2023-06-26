export class FakeListModel{
    #codes;
    #number;
    constructor(){
        this.#codes = [];//配列の初期化
        this.number = 1;
    }

    getCodes(){
        return this.#codes;//現在のリストの取得
    }

    addCode(code){
        code.number = this.number++;
        this.#codes.push(code);//codeの追加
    }

    removeCode(){
        if(this.#codes.length > 0){
            this.number--;
            this.#codes.pop();//末尾のコードを削除
        }
    }
}