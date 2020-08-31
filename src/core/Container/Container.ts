import gameStore from "../../store/Game.store";

export class Container {
    getInstance() {
        return gameStore;
    }
}

