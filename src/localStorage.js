


export const loadState = () => {
    try {
        const beerSerialState = localStorage.getItem('beerAppState');
        if (beerSerialState === null) {
            return undefined;
        }
        return JSON.parse(beerSerialState);
    }
    catch(error){
        return console.log(error.message)
    }
}

export const saveState = (state) => {
    try {
        const beerSerialState = JSON.stringify(state);
        localStorage.setItem('beerAppState', beerSerialState);
    }
    catch(error){
        return console.log(error.message)
    }
}