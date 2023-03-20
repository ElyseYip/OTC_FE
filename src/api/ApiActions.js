import {apis} from "./APILinks";

export function ApiActions(options){
    return {
        type: "API",
        payload: {
            ...apis[options.name],
            ...options,
            onSuccess: (dispatch, data, status) => {
                if (options.onSuccess) {
                    options.onSuccess(data, status);
                }
                dispatch(options.actions({
                    type: options.name,
                    data
                }));
            }
        }
    }

}