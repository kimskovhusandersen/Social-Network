import { kebabToCamel, kebabObjToCamel } from "./helpers";

const reducer = (state = {}, action) => {
    let { type, data, paths } = action;
    const [command, ...propArr] = type.split("_");
    if (command == "@@INIT") {
        return state;
    }
    let prop = kebabToCamel(propArr.join("_"));

    if (typeof data === "object" && !Array.isArray(data)) {
        data = kebabObjToCamel(data);
    }

    const mapState = (state = {}, prop, data, paths) => {
        if (state.hasOwnProperty(prop) || !paths || paths.length == 0) {
            state[prop] =
                Object.prototype.toString.call(data) == "[object Function]"
                    ? data(state[prop])
                    : data;
            return state;
        }
        for (let key in state) {
            if (
                typeof state[key] === "object" &&
                !Array.isArray(state) &&
                key == paths[0]
            ) {
                state =
                    prop == key
                        ? { ...state, [prop]: data }
                        : {
                              ...state
                          };
                paths.shift();
                mapState(state[key], prop, data, paths);
            }
        }
        return state;
    };

    return mapState(state, prop, data, paths);
};

export default reducer;
