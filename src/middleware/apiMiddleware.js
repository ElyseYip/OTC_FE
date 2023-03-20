import axios from "axios";

const apiMiddleware = ({dispatch, getState}) => next => action =>{
    next(action)
    console.log(action.type)
    if (action.type !=="API"){return}
    const {
        url,
        method,
        data,
        reqData = [],
        onSuccess=() =>{},
        onError=() =>{},
    } = action.payload


    const state = getState();
    const dataOrParams = ["GET"].includes(method) ? "params" : "data";

    axios.defaults.headers.common["Content-Type"] = 'multipart/form-data';
    axios.defaults.headers.common["Aenx-Token"] = "NQGLMOASNJWV6AGYVX2BXW";

    let finalData = {};
    for (let i = 0; i < reqData.length; i++) {
        finalData[reqData[i]] = (data[reqData[i]] || '');
    }

    const formData = new FormData();
    for (let key in finalData){
        formData.append(key, finalData[key])
    }


    axios.request({
        url: url,
        method,
        [dataOrParams]: formData
    })
        .then(({data, status}) => {
            console.log(data, status)
            onSuccess(dispatch,data, status)
        })
        .catch(error =>{
            dispatch(onError(error))
        })
}

export default apiMiddleware;