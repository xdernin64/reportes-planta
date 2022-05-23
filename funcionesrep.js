// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    getDoc,
    collectionGroup,
    onSnapshot,
    setDoc,
    doc,
    addDoc,
    Timestamp,
    deleteDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import {
    cargarplanta
} from "./consultasrep.js";

const firebaseConfig = {
    apiKey: "AIzaSyDoPhUYzDbw_S3mv6xh1_iXzSAMdzlLmrQ",
    authDomain: "raca-app.firebaseapp.com",
    databaseURL: "https://raca-app-default-rtdb.firebaseio.com",
    projectId: "raca-app",
    storageBucket: "raca-app.appspot.com",
    messagingSenderId: "227085469237",
    appId: "1:227085469237:web:c6b25d71af5e9f5de6537c",
    measurementId: "G-1KMQCQQBL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const getplanta = async (db, id) => getDoc(doc(db, "Reportes/Planta/PTOI", id));
export const getbypass = async (db, id) => getDoc(doc(db, "Reportes/Planta/bypass", id));
export const getrechazo = async (db, id) => getDoc(doc(db, "Reportes/Piscinas/rechazo-300m3", id));
export const getingreso = async (db, id) => getDoc(doc(db, "Reportes/Piscinas/Ingreso-100m3", id));
export const getphce = async (db, id) => getDoc(doc(db, "Reportes/Planta/phce", id));
export const gethdmi1 = async (db, id) => getDoc(doc(db, "Reportes/Planta/hdmi1", id));
export const gethdmi2 = async (db, id) => getDoc(doc(db, "Reportes/Planta/hdmi2", id));

export const guardarregistroplanta = (planta, fecharaw, fecha, horainicio, horafin, ingresoinicio, ingresofin, rechazoinicio, rechazofin, obseraciones) => {
    addDoc(collection(db, "Reportes/Planta/PTOI"), {
        planta,
        fecharaw,
        fecha,
        horainicio,
        horafin,
        ingresoinicio,
        ingresofin,
        rechazoinicio,
        rechazofin,
        obseraciones
    });
}
export const guardarregistrobypass = (planta, fecharaw, fecha, horainicio, horafin, plantainicio, plantafin, bypassinicio, bypassfin, obseraciones) => {
    addDoc(collection(db, "Reportes/Planta/bypass"), {
        planta,
        fecharaw,
        fecha,
        horainicio,
        horafin,
        plantainicio,
        plantafin,
        bypassinicio,
        bypassfin,
        obseraciones
    });
}
export const guardarrechazo = (fecharaw, fecha, horainicio, horafin, rechazoinicio, rechazofin, obseraciones) => {
    addDoc(collection(db, "Reportes/Piscinas/rechazo-300m3"), {
        fecharaw,
        fecha,
        horainicio,
        horafin,
        rechazoinicio,
        rechazofin,
        obseraciones
    });
}
export const guardaringreso = (fecharaw, fecha, horainicio, horafin, ingresoinicio, ingresofin, obseraciones) => {
    addDoc(collection(db, "Reportes/Piscinas/Ingreso-100m3"), {
        fecharaw,
        fecha,
        horainicio,
        horafin,
        ingresoinicio,
        ingresofin,
        obseraciones
    });
}
export const guardarphce = (fecharaw, fecha, hora, phcruda, cecruda, phcrudahdmi, cecrudahdmi, phptoi1, ceptoi1, phptoi1hdmi, ceptoi1hdmi, phptoi2, ceptoi2, phptoi2hdmi, ceptoi2hdmi, phpiscina, cepiscina, obseraciones) => {
    addDoc(collection(db, "Reportes/Planta/phce"), {
        fecharaw,
        fecha,
        hora,
        phcruda,
        cecruda,
        phcrudahdmi,
        cecrudahdmi,
        phptoi1,
        ceptoi1,
        phptoi1hdmi,
        ceptoi1hdmi,
        phptoi2,
        ceptoi2,
        phptoi2hdmi,
        ceptoi2hdmi,
        phpiscina,
        cepiscina,
        obseraciones
    });
}
export const guardarhdmi1 = (fecharaw, fecha, hora, P60, PRESSURE_SP, FIT_20, PT_20, PT_20SP, PH_02, PT20_PT01, CON_0, PT_01, PT_02, PT_03, PT_02SP, PT_03SP, PT01_PT02, TOC, PT_100, FIT_01, P_71, P_71hz, DP_01, DP_01SP, PH_01, PT_05, CON_01, FIT_02, CON_02, FIT_03, PT_06, PT03_PT06) => {
    addDoc(collection(db, "Reportes/Planta/hdmi1"), {
        fecharaw,
        fecha,
        hora,
        P60,
        PRESSURE_SP,
        FIT_20,
        PT_20,
        PT_20SP,
        PH_02,
        PT20_PT01,
        CON_0,
        PT_01,
        PT_02,
        PT_03,
        PT_02SP,
        PT_03SP,
        PT01_PT02,
        TOC,
        PT_100,
        FIT_01,
        P_71,
        P_71hz,
        DP_01,
        DP_01SP,
        PH_01,
        PT_05,
        CON_01,
        FIT_02,
        CON_02,
        FIT_03,
        PT_06,
        PT03_PT06
    });
}
export const guardarhdmi2 = (fecharaw, fecha, hora, P60, PRESSURE_SP, FIT_20, PT_20, PT_20SP, PH_60, PT20_PT01, CON_0, PT_01, PT_02, PT_03, PT_02SP, PT_03SP, PT01_PT02, TOC, PT_100, FIT_01, P_71, P_71hz, DP_01, DP_01SP, ERT, PT_05, CON_01, FIT_02, PH_01, FIT_80, FIT_03, PT_06, PT03_PT06) => {
    addDoc(collection(db, "Reportes/Planta/hdmi2"), {
        fecharaw,
        fecha,
        hora,
        P60,
        PRESSURE_SP,
        FIT_20,
        PT_20,
        PT_20SP,
        PH_60,
        PT20_PT01,
        CON_0,
        PT_01,
        PT_02,
        PT_03,
        PT_02SP,
        PT_03SP,
        PT01_PT02,
        TOC,
        PT_100,
        FIT_01,
        P_71,
        P_71hz,
        DP_01,
        DP_01SP,
        ERT,
        PT_05,
        CON_01,
        FIT_02,
        PH_01,
        FIT_80,
        FIT_03,
        PT_06,
        PT03_PT06
    });
}

export const deletergistroplanta = (db, id) => {
    deleteDoc(doc(db, "Reportes/Planta/PTOI", id));
}
export const deletebypass = (db, id) => {
    deleteDoc(doc(db, "Reportes/Planta/bypass", id));
}
export const deletergistrorechazo = (db, id) => {
    deleteDoc(doc(db, "Reportes/Piscinas/rechazo-300m3", id));
}
export const deleteingreso = (db, id) => {
    deleteDoc(doc(db, "Reportes/Piscinas/Ingreso-100m3", id));
}
export const deletergistrophce = (db, id) => {
    deleteDoc(doc(db, "Reportes/Planta/phce", id));
}
export const deletergistrohdmi1 = (db, id) => {
    deleteDoc(doc(db, "Reportes/Planta/hdmi1", id));
}
export const deletergistrohdmi2 = (db, id) => {
    deleteDoc(doc(db, "Reportes/Planta/hdmi2", id));
}

export const updateplanta = (id, planta, fecharaw, fecha, horainicio, horafin, ingresoinicio, ingresofin, rechazoinicio, rechazofin, obseraciones) => {
    updateDoc(doc(db, "Reportes/Planta/PTOI", id), {
        planta,
        fecharaw,
        fecha,
        horainicio,
        horafin,
        ingresoinicio,
        ingresofin,
        rechazoinicio,
        rechazofin,
        obseraciones
    });
}
export const updatebypass = (id, planta, fecharaw, fecha, horainicio, horafin, plantainicio, plantafin, bypassinicio, bypassfin, obseraciones) => {
    updateDoc(doc(db, "Reportes/Planta/bypass", id), {
        planta,
        fecharaw,
        fecha,
        horainicio,
        horafin,
        plantainicio,
        plantafin,
        bypassinicio,
        bypassfin,
        obseraciones
    });
}
export const updaterechazo = (id, fecharaw, fecha, horainicio, horafin, rechazoinicio, rechazofin, obseraciones) => {
    updateDoc(doc(db, "Reportes/Piscinas/rechazo-300m3", id), {
        fecharaw,
        fecha,
        horainicio,
        horafin,
        rechazoinicio,
        rechazofin,
        obseraciones
    });
}
export const updateingreso = (id, fecharaw, fecha, horainicio, horafin, ingresoinicio, ingresofin, obseraciones) => {
    updateDoc(doc(db, "Reportes/Piscinas/Ingreso-100m3", id), {
        fecharaw,
        fecha,
        horainicio,
        horafin,
        ingresoinicio,
        ingresofin,
        obseraciones
    });
}
export const updatephce = (id, fecharaw, fecha, hora, phcruda, cecruda, phcrudahdmi, cecrudahdmi, phptoi1, ceptoi1, phptoi1hdmi, ceptoi1hdmi, phptoi2, ceptoi2, phptoi2hdmi, ceptoi2hdmi, phpiscina, cepiscina, obseraciones) => {
    updateDoc(doc(db, "Reportes/Planta/phce", id), {
        fecharaw,
        fecha,
        hora,
        phcruda,
        cecruda,
        phcrudahdmi,
        cecrudahdmi,
        phptoi1,
        ceptoi1,
        phptoi1hdmi,
        ceptoi1hdmi,
        phptoi2,
        ceptoi2,
        phptoi2hdmi,
        ceptoi2hdmi,
        phpiscina,
        cepiscina,
        obseraciones
    });
}
export const updatehdmi1 = (id, fecharaw, fecha, hora, P60, PRESSURE_SP, FIT_20, PT_20, PT_20SP, PH_02, PT20_PT01, CON_0, PT_01, PT_02, PT_03, PT_02SP, PT_03SP, PT01_PT02, TOC, PT_100, FIT_01, P_71, P_71hz, DP_01, DP_01SP, PH_01, PT_05, CON_01, FIT_02, CON_02, FIT_03, PT_06, PT03_PT06) => {
    updateDoc(doc(db, "Reportes/Planta/hdmi1", id), {
        fecharaw,
        fecha,
        hora,
        P60,
        PRESSURE_SP,
        FIT_20,
        PT_20,
        PT_20SP,
        PH_02,
        PT20_PT01,
        CON_0,
        PT_01,
        PT_02,
        PT_03,
        PT_02SP,
        PT_03SP,
        PT01_PT02,
        TOC,
        PT_100,
        FIT_01,
        P_71,
        P_71hz,
        DP_01,
        DP_01SP,
        PH_01,
        PT_05,
        CON_01,
        FIT_02,
        CON_02,
        FIT_03,
        PT_06,
        PT03_PT06
    });
}
export const updatehdmi2 = (id, fecharaw, fecha, hora, P60, PRESSURE_SP, FIT_20, PT_20, PT_20SP, PH_60, PT20_PT01, CON_0, PT_01, PT_02, PT_03, PT_02SP, PT_03SP, PT01_PT02, TOC, PT_100, FIT_01, P_71, P_71hz, DP_01, DP_01SP, ERT, PT_05, CON_01, FIT_02, PH_01, FIT_80, FIT_03, PT_06, PT03_PT06) => {
    updateDoc(doc(db, "Reportes/Planta/hdmi2", id), {
        fecharaw,
        fecha,
        hora,
        P60,
        PRESSURE_SP,
        FIT_20,
        PT_20,
        PT_20SP,
        PH_60,
        PT20_PT01,
        CON_0,
        PT_01,
        PT_02,
        PT_03,
        PT_02SP,
        PT_03SP,
        PT01_PT02,
        TOC,
        PT_100,
        FIT_01,
        P_71,
        P_71hz,
        DP_01,
        DP_01SP,
        ERT,
        PT_05,
        CON_01,
        FIT_02,
        PH_01,
        FIT_80,
        FIT_03,
        PT_06,
        PT03_PT06
    });
}

export const sucessalert = (message) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}
export const erroralert = (message) => {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}
export const warningalert = (message) => {
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}
export const questionalert = (message) => {
    Swal.fire({
        position: 'center',
        icon: 'question',
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}
export const infoalert = (message) => {
    Swal.fire({
        position: 'center',
        icon: 'info',
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}