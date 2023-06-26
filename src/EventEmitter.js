export class EventEmitter{
    #listeners = new Map();
    addEventListener(type, listener){
        if(!this.#listeners.has(type)){
            this.#listeners.set(type, new Set());
        }
        const listenerSet = this.#listeners.get(type);
        listenerSet.add(listener);
    }

    emit(type, data){
        const listenerSet = this.#listeners.get(type);
        if(!listenerSet){
            return;
        }
        listenerSet.forEach(listener => {
            listener.call(this, data);
        });
    }

    removeEventListener(type, listener){
        const listenerSet = this.#listeners.get(type);
        if(!listenerSet){
            return;
        }
        listenerSet.delete(listener);
    }
}