import {Timestamp}  from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

export const totimestamp = (fecharaw) => {
    let arrDate = fecharaw.split("-");
    let fechacod = arrDate[2] + arrDate[1] + arrDate[0];
    var dateMomentObject = moment(fechacod, "DDMMYYYY");
    var dateObject = dateMomentObject.toDate();
    let fechaf = Timestamp.fromDate(dateObject);
    fecharaw = fechaf;
    return fecharaw;
}

export const Timestamptodate = (fecharaw) => {
    let fechaf = fecharaw.toDate();
    fecharaw = fechaf;
    return fecharaw;
}
export const  currentdate= () => {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;
    return output;
}
document.getElementById("qdateendptoi").value = currentdate();
document.getElementById("qdateendbypass").value = currentdate();
document.getElementById("qdateendrechazo").value = currentdate();
document.getElementById("qdateendingreso").value = currentdate();
document.getElementById("qdateendphce").value = currentdate();
document.getElementById("qdateendhdmi1").value = currentdate();
document.getElementById("qdateendhdmi2").value = currentdate();
document.getElementById("qdateendphce").value = currentdate();

