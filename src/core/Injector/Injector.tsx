import {Container} from "../Container/Container";

class Injector {
    public static container: Container;

    public static inject(): Container {
        if (!Injector.container) {
            Injector.container = new Container();
        }

        return Injector.container;
    }
}

export default Injector;
