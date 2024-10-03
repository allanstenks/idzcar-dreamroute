export const dateToLocaleString = (dateIso) => {
    const date = new Date(dateIso);

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${day}/${month}/${year} ${hours}:${minutes}`;

};
export const dateToLocaleStringCustom = (dateIso) => {
    const date = new Date(dateIso);

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${day}/${month} ${hours}:${minutes}`;

};

export const dateToString = (dateIso) => {
    const date = new Date(dateIso);

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export const getLastMonth = () =>{
    const date = new Date()

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth())).slice(-2);
    const year = date.getFullYear();

    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    const lastDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`)

    let monthList = [
        {id:0,label:"Janeiro"},
        {id:1,label:"Fevereiro"},
        {id:2,label:"Março"},
        {id:3,label:"Abril"},
        {id:4,label:"Maio"},
        {id:5,label:"Junho"},
        {id:6,label:"Julho"},
        {id:7,label:"Agosto"},
        {id:8,label:"Setembro"},
        {id:9,label:"Outubro"},
        {id:10,label:"Novembro"},
        {id:11,label:"Dezembro"}
    ]

    let labelLastMonth = ""
    monthList.forEach((item)=>{
        if(item.id == lastDate.getMonth()){
            labelLastMonth = item.label
        }
    })
    return labelLastMonth
}


export const convertEpochToDate = (epochDate) => {
    const utcSeconds = epochDate;
    const date = new Date(0);
    date.setUTCSeconds(utcSeconds);
    return date;
}

