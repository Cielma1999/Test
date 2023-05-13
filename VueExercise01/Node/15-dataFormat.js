function dateFormat(date){
    const dt = new Date(date);
    const y = dt.getFullYear();
    const m = padZero(dt.getMonth()+1);
    const d = padZero(dt.getDate()); 
    const hour =padZero( dt.getHours());
    const min = padZero(dt.getMinutes());
    return `${y}-${m}-${d}  ${hour}:${min}`;
}

function padZero(n){
    return n>9?n:'0'+n;
}

module.exports = {
    dateFormat
}