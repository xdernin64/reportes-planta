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
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import {
    guardarregistroplanta,
    updateplanta,
    guardarregistrobypass,
    updatebypass,
    guardarrechazo,
    updaterechazo,
    guardaringreso,
    updateingreso,
    guardarphce,
    updatephce,
    guardarhdmi1,
    updatehdmi1,
    guardarhdmi2,
    updatehdmi2,
    sucessalert,
    erroralert,verificarsd
} from "./funcionesrep.js";
import {
    cargarplanta,
    cargarbypass,
    cargarrechazo,
    cargaringreso,
    cargarphce,
    cargarhdmi1,
    cargarhdmi2
} from "./consultasrep.js";
import {
    totimestamp,
    currentdate
} from "./helptorch.js";
import {
    getAuth,
    deleteUser,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

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
const auth = getAuth(app);


const formplantas = document.getElementById("formplantas");
const formbypass = document.getElementById("formbypass");


auth.onAuthStateChanged(async function (user) {
    async function estado() {
        document.querySelector("#btn-logout").classList.remove("d-none");
        document.getElementById("btn-logout").addEventListener("click", function () {
            signOut(auth);
            location.reload();
        });
    }
    if (user) {
        estado();
        const snap = await getDoc(doc(db, "usuarios", user.uid));
        var labor = snap.data().labor;
        var credenciales = snap.data().credenciales;
        var apellidosynombres = snap.data().apellidosynombres;
        var uid = snap.data().uid;
        if ((labor == "OPERADOR" || labor == "PROGRAMADOR") && credenciales != "Administrador") {
            //remove class jquery
            $("#encabezado").removeClass("d-none");
            $("#contenido").removeClass("d-none");
            $("#conent-dashboard").addClass("d-none");


            formplantas.addEventListener("submit", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                const planta = document.getElementById("nombre-planta").value;
                const fecharaw = document.getElementById("fecha-planta").value;
                const fecha = totimestamp(fecharaw);
                const horainicio = document.getElementById("hora_inicio").value;
                const horafin = document.getElementById("hora_final").value;
                const ingresoinicio = Number(document.getElementById("ingreso_inicio_caudal").value);
                const ingresofin = Number(document.getElementById("ingreso_fin_caudal").value);
                const rechazoinicio = Number(document.getElementById("rechazo_inicio_caudal").value);
                const rechazofin = Number(document.getElementById("rechazo_fin_caudal").value);
                const obseraciones = document.getElementById("plantas-obs").value;
                guardarregistroplanta(
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
                );
                sucessalert("Guardado");
                formplantas.reset();
            });
            document.getElementById("btnupdateplanta").addEventListener("click", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                var id = document.getElementById("btnupdateplanta").getAttribute("data-id");
                const planta = document.getElementById("nombre-planta").value;
                const fecharaw = document.getElementById("fecha-planta").value;
                const fecha = totimestamp(fecharaw);
                const horainicio = document.getElementById("hora_inicio").value;
                const horafin = document.getElementById("hora_final").value;
                const ingresoinicio = Number(document.getElementById("ingreso_inicio_caudal").value);
                const ingresofin = Number(document.getElementById("ingreso_fin_caudal").value);
                const rechazoinicio = Number(document.getElementById("rechazo_inicio_caudal").value);
                const rechazofin = Number(document.getElementById("rechazo_fin_caudal").value);
                const obseraciones = document.getElementById("plantas-obs").value;
                updateplanta(id,
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
                );
                sucessalert("Actualizado");

            });
            //bypass
            formbypass.addEventListener("submit", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                const planta = document.getElementById("nombre-planta-bypass").value;
                const fecharaw = document.getElementById("fecha-planta-bypass").value;
                const fecha = totimestamp(fecharaw);
                const horainicio = document.getElementById("hora_inicio-bypass").value;
                const horafin = document.getElementById("hora_final-bypass").value;
                const plantainicio = Number(document.getElementById("ingreso_inicio_ptoi").value);
                const plantafin = Number(document.getElementById("ingreso_fin_ptoi").value);
                const bypassinicio = Number(document.getElementById("inicio_caudal-bypass").value);
                const bypassfin = Number(document.getElementById("fin_caudal-bypass").value);
                const obseraciones = document.getElementById("bypass-obs").value;
                guardarregistrobypass(
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
                );
                sucessalert("Guardado");
                formbypass.reset();
            });
            document.getElementById("btnupdatebypass").addEventListener("click", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                var id = document.getElementById("btnupdatebypass").getAttribute("data-id");
                const planta = document.getElementById("nombre-planta-bypass").value;
                const fecharaw = document.getElementById("fecha-planta-bypass").value;
                const fecha = totimestamp(fecharaw);
                const horainicio = document.getElementById("hora_inicio-bypass").value;
                const horafin = document.getElementById("hora_final-bypass").value;
                const plantainicio = Number(document.getElementById("ingreso_inicio_ptoi").value);
                const plantafin = Number(document.getElementById("ingreso_fin_ptoi").value);
                const bypassinicio = Number(document.getElementById("inicio_caudal-bypass").value);
                const bypassfin = Number(document.getElementById("fin_caudal-bypass").value);
                const obseraciones = document.getElementById("bypass-obs").value;
                updatebypass(id,
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
                );
                sucessalert("Actualizado");
            });
            //rechazo
            const formrechazo = document.getElementById("formrechazo");
            formrechazo.addEventListener("submit", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                const fecharaw = document.getElementById("fecha-rechazo").value;
                const fecha = totimestamp(fecharaw);
                const horainicio = document.getElementById("hora_inicio-rechazo").value;
                const horafin = document.getElementById("hora_final-rechazo").value;
                const rechazoinicio = Number(document.getElementById("inicio_caudal-rechazo").value);
                const rechazofin = Number(document.getElementById("fin_caudal-rechazo").value);
                const obseraciones = document.getElementById("rechazo-obs").value;
                guardarrechazo(
                    fecharaw,
                    fecha,
                    horainicio,
                    horafin,
                    rechazoinicio,
                    rechazofin,
                    obseraciones
                );
                sucessalert("Guardado");
                formrechazo.reset();
            });
            document.getElementById("btnupdaterechazo").addEventListener("click", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                var id = document.getElementById("btnupdaterechazo").getAttribute("data-id");
                const fecharaw = document.getElementById("fecha-rechazo").value;
                const fecha = totimestamp(fecharaw);
                const horainicio = document.getElementById("hora_inicio-rechazo").value;
                const horafin = document.getElementById("hora_final-rechazo").value;
                const rechazoinicio = Number(document.getElementById("inicio_caudal-rechazo").value);
                const rechazofin = Number(document.getElementById("fin_caudal-rechazo").value);
                const obseraciones = document.getElementById("rechazo-obs").value;
                updaterechazo(id,
                    fecharaw,
                    fecha,
                    horainicio,
                    horafin,
                    rechazoinicio,
                    rechazofin,
                    obseraciones
                );
                sucessalert("Actualizado");
            });
            //ingreso
            const formingreso = document.getElementById("formingreso");
            formingreso.addEventListener("submit", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                const fecharaw = document.getElementById("fecha-ingreso").value;
                const fecha = totimestamp(fecharaw);
                const horainicio = document.getElementById("hora_inicio-ingreso").value;
                const horafin = document.getElementById("hora_final-ingreso").value;
                const ingresoinicio = Number(document.getElementById("inicio_caudal-ingreso").value);
                const ingresofin = Number(document.getElementById("fin_caudal-ingreso").value);
                const obseraciones = document.getElementById("ingreso-obs").value;
                guardaringreso(
                    fecharaw,
                    fecha,
                    horainicio,
                    horafin,
                    ingresoinicio,
                    ingresofin,
                    obseraciones
                );
                sucessalert("Guardado");
                formingreso.reset();
            });
            document.getElementById("btnupdateingreso").addEventListener("click", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                var id = document.getElementById("btnupdateingreso").getAttribute("data-id");
                const fecharaw = document.getElementById("fecha-ingreso").value;
                const fecha = totimestamp(fecharaw);
                const horainicio = document.getElementById("hora_inicio-ingreso").value;
                const horafin = document.getElementById("hora_final-ingreso").value;
                const ingresoinicio = Number(document.getElementById("inicio_caudal-ingreso").value);
                const ingresofin = Number(document.getElementById("fin_caudal-ingreso").value);
                const obseraciones = document.getElementById("ingreso-obs").value;
                updateingreso(id,
                    fecharaw,
                    fecha,
                    horainicio,
                    horafin,
                    ingresoinicio,
                    ingresofin,
                    obseraciones
                );
                sucessalert("Actualizado");

            });
            //phce
            const formphce = document.getElementById("formphce");
            formphce.addEventListener("submit", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                const fecharaw = document.getElementById("fecha-phce").value;
                const fecha = totimestamp(fecharaw);
                const hora = document.getElementById("chk_hora-phce").value;
                const phcruda = Number(document.getElementById("ph-100").value);
                const cecruda = Number(document.getElementById("ce-100").value);
                const phplanta = Number(document.getElementById("ph-ptoi").value);
                const ceplanta = Number(document.getElementById("ce-ptoi").value);
                const phplanta2 = Number(document.getElementById("ph-ptoi2").value);
                const ceplanta2 = Number(document.getElementById("ce-ptoi2").value);
                const phpiscina = Number(document.getElementById("ph-piscina").value);
                const cepiscina = Number(document.getElementById("ce-piscina").value);
                const observaciones = document.getElementById("phce-obs").value;

                guardarphce(
                    fecharaw,
                    fecha,
                    hora,
                    phcruda,
                    cecruda,
                    phplanta,
                    ceplanta,
                    phplanta2,
                    ceplanta2,
                    phpiscina,
                    cepiscina,
                    observaciones
                );
                sucessalert("Guardado");
                formphce.reset();
            });

            document.getElementById("btnupdatephce").addEventListener("click", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                var id = document.getElementById("btnupdatephce").getAttribute("data-id");
                const fecharaw = document.getElementById("fecha-phce").value;
                const fecha = totimestamp(fecharaw);
                const hora = document.getElementById("chk_hora-phce").value;
                const phcruda = Number(document.getElementById("ph-100").value);
                const cecruda = Number(document.getElementById("ce-100").value);
                const phplanta = Number(document.getElementById("ph-ptoi").value);
                const ceplanta = Number(document.getElementById("ce-ptoi").value);
                const phplanta2 = Number(document.getElementById("ph-ptoi2").value);
                const ceplanta2 = Number(document.getElementById("ce-ptoi2").value);
                const phpiscina = Number(document.getElementById("ph-piscina").value);
                const cepiscina = Number(document.getElementById("ce-piscina").value);
                const observaciones = document.getElementById("phce-obs").value;
                updatephce(id,
                    fecharaw,
                    fecha,
                    hora,
                    phcruda,
                    cecruda,
                    phplanta,
                    ceplanta,
                    phplanta2,
                    ceplanta2,
                    phpiscina,
                    cepiscina,
                    observaciones
                );
                sucessalert("Actualizado");
            });
            const formptoi1 = document.getElementById("imagenplanta");
            formptoi1.addEventListener("submit", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                let fecharaw = document.getElementById("ptoi1-fecha").value;
                let fecha = totimestamp(fecharaw);
                let hora = document.getElementById("hora-ptoi1").value;
                let p60 = Number(document.getElementById("p60-1").value);
                let presure = Number(document.getElementById("pressueresp-1").value);
                let fit20 = Number(document.getElementById("fit-20-1").value);
                let pt20 = Number(document.getElementById("pt20-1").value);
                let pt20sp = Number(document.getElementById("pt20sp-1").value);
                let ph02 = Number(document.getElementById("ph02-1").value);
                let pt20_pt01 = Number(document.getElementById("pt20-pt1-1").value);
                let con0 = Number(document.getElementById("con0-1").value);
                let pt01 = Number(document.getElementById("pt01-1").value);
                let pt02 = Number(document.getElementById("pt02-1").value);
                let pt03 = Number(document.getElementById("pt03-1").value);
                let pt02sp = Number(document.getElementById("pt02sp-1").value);
                let pt03sp = Number(document.getElementById("pt03sp-1").value);
                let pt01_pt02 = Number(document.getElementById("pt01-pt02-1").value);
                let toc = Number(document.getElementById("toc-1").value);
                let pt100 = Number(document.getElementById("pt100-1").value);
                let fit01 = Number(document.getElementById("fit01-1").value);
                let p71 = Number(document.getElementById("p71-1").value);
                let p71hz = Number(document.getElementById("p71hz-1").value);
                let dp01 = Number(document.getElementById("dp01-1").value);
                let dp01sp = Number(document.getElementById("dp01sp-1").value);
                let ph01 = Number(document.getElementById("ph01-1").value);
                let pt05 = Number(document.getElementById("pt05-1").value);
                let con01 = Number(document.getElementById("con01-1").value);
                let fit02 = Number(document.getElementById("fit02-1").value);
                let con02 = Number(document.getElementById("con02-1").value);
                let fit03 = Number(document.getElementById("fit03-1").value);
                let pt06 = Number(document.getElementById("pt06-1").value);
                let pt03_pt06 = Number(document.getElementById("pt03-pt06-1").value);
                guardarhdmi1(
                    fecharaw,
                    fecha,
                    hora,
                    p60,
                    presure,
                    fit20,
                    pt20,
                    pt20sp,
                    ph02,
                    pt20_pt01,
                    con0,
                    pt01,
                    pt02,
                    pt03,
                    pt02sp,
                    pt03sp,
                    pt01_pt02,
                    toc,
                    pt100,
                    fit01,
                    p71,
                    p71hz,
                    dp01,
                    dp01sp,
                    ph01,
                    pt05,
                    con01,
                    fit02,
                    con02,
                    fit03,
                    pt06,
                    pt03_pt06
                );
                sucessalert("Guardado");
                formptoi1.reset();
            });
            document.getElementById("actualizar-ptoi1").addEventListener("click", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                var id = document.getElementById("actualizar-ptoi1").getAttribute("data-id");
                let fecharaw = document.getElementById("ptoi1-fecha").value;
                let fecha = totimestamp(fecharaw);
                let hora = document.getElementById("hora-ptoi1").value;
                let p60 = Number(document.getElementById("p60-1").value);
                let presure = Number(document.getElementById("pressueresp-1").value);
                let fit20 = Number(document.getElementById("fit-20-1").value);
                let pt20 = Number(document.getElementById("pt20-1").value);
                let pt20sp = Number(document.getElementById("pt20sp-1").value);
                let ph02 = Number(document.getElementById("ph02-1").value);
                let pt20_pt01 = Number(document.getElementById("pt20-pt1-1").value);
                let con0 = Number(document.getElementById("con0-1").value);
                let pt01 = Number(document.getElementById("pt01-1").value);
                let pt02 = Number(document.getElementById("pt02-1").value);
                let pt03 = Number(document.getElementById("pt03-1").value);
                let pt02sp = Number(document.getElementById("pt02sp-1").value);
                let pt03sp = Number(document.getElementById("pt03sp-1").value);
                let pt01_pt02 = Number(document.getElementById("pt01-pt02-1").value);
                let toc = Number(document.getElementById("toc-1").value);
                let pt100 = Number(document.getElementById("pt100-1").value);
                let fit01 = Number(document.getElementById("fit01-1").value);
                let p71 = Number(document.getElementById("p71-1").value);
                let p71hz = Number(document.getElementById("p71hz-1").value);
                let dp01 = Number(document.getElementById("dp01-1").value);
                let dp01sp = Number(document.getElementById("dp01sp-1").value);
                let ph01 = Number(document.getElementById("ph01-1").value);
                let pt05 = Number(document.getElementById("pt05-1").value);
                let con01 = Number(document.getElementById("con01-1").value);
                let fit02 = Number(document.getElementById("fit02-1").value);
                let con02 = Number(document.getElementById("con02-1").value);
                let fit03 = Number(document.getElementById("fit03-1").value);
                let pt06 = Number(document.getElementById("pt06-1").value);
                let pt03_pt06 = Number(document.getElementById("pt03-pt06-1").value);
                updatehdmi1(
                    id,
                    fecharaw,
                    fecha,
                    hora,
                    p60,
                    presure,
                    fit20,
                    pt20,
                    pt20sp,
                    ph02,
                    pt20_pt01,
                    con0,
                    pt01,
                    pt02,
                    pt03,
                    pt02sp,
                    pt03sp,
                    pt01_pt02,
                    toc,
                    pt100,
                    fit01,
                    p71,
                    p71hz,
                    dp01,
                    dp01sp,
                    ph01,
                    pt05,
                    con01,
                    fit02,
                    con02,
                    fit03,
                    pt06,
                    pt03_pt06
                );
                sucessalert("Actualizado");
            });
            const formptoi2 = document.getElementById("imagenplanta2");
            formptoi2.addEventListener("submit", (e) => {
                e.preventDefault(erroralert("Error al guardar"));

                let fecharaw = document.getElementById("ptoi2-fecha").value;
                let fecha = totimestamp(fecharaw);
                let hora = document.getElementById("hora-ptoi2").value;
                let p60 = Number(document.getElementById("p60-2").value);
                let presure = Number(document.getElementById("pressueresp-2").value);
                let fit20 = Number(document.getElementById("fit-20-2").value);
                let pt20 = Number(document.getElementById("pt20-2").value);
                let pt20sp = Number(document.getElementById("pt20sp-2").value);
                let ph60 = Number(document.getElementById("ph60-2").value);
                let pt20_pt01 = Number(document.getElementById("pt20-pt1-2").value);
                let con0 = Number(document.getElementById("con0-2").value);
                let pt01 = Number(document.getElementById("pt01-2").value);
                let pt02 = Number(document.getElementById("pt02-2").value);
                let pt03 = Number(document.getElementById("pt03-2").value);
                let pt02sp = Number(document.getElementById("pt02sp-2").value);
                let pt03sp = Number(document.getElementById("pt03sp-2").value);
                let pt01_pt02 = Number(document.getElementById("pt01-pt02-2").value);
                let toc = Number(document.getElementById("toc-2").value);
                let pt100 = Number(document.getElementById("pt100-2").value);
                let fit01 = Number(document.getElementById("fit01-2").value);
                let p71 = Number(document.getElementById("p71-2").value);
                let p71hz = Number(document.getElementById("p71hz-2").value);
                let dp01 = Number(document.getElementById("dp01-2").value);
                let dp01sp = Number(document.getElementById("dp01sp-2").value);
                let ert = Number(document.getElementById("ert-2").value);
                let pt05 = Number(document.getElementById("pt05-2").value);
                let con01 = Number(document.getElementById("con01-2").value);
                let fit02 = Number(document.getElementById("fit02-2").value);
                let ph01 = Number(document.getElementById("ph01-2").value);
                let fit80 = Number(document.getElementById("fit80-2").value);
                let fit03 = Number(document.getElementById("fit03-2").value);
                let pt06 = Number(document.getElementById("pt06-2").value);
                let pt03_pt06 = Number(document.getElementById("pt03-pt06-2").value);
                guardarhdmi2(
                    fecharaw,
                    fecha,
                    hora,
                    p60,
                    presure,
                    fit20,
                    pt20,
                    pt20sp,
                    ph60,
                    pt20_pt01,
                    con0,
                    pt01,
                    pt02,
                    pt03,
                    pt02sp,
                    pt03sp,
                    pt01_pt02,
                    toc,
                    pt100,
                    fit01,
                    p71,
                    p71hz,
                    dp01,
                    dp01sp,
                    ert,
                    pt05,
                    con01,
                    fit02,
                    ph01,
                    fit80,
                    fit03,
                    pt06,
                    pt03_pt06
                );
                sucessalert("Guardado");
                formptoi2.reset();
            });
            document.getElementById("actualizar-ptoi2").addEventListener("click", (e) => {
                e.preventDefault(erroralert("Error al guardar"));
                var id = document.getElementById("actualizar-ptoi2").getAttribute("data-id");
                let fecharaw = document.getElementById("ptoi2-fecha").value;
                let fecha = totimestamp(fecharaw);
                let hora = document.getElementById("hora-ptoi2").value;
                let p60 = Number(document.getElementById("p60-2").value);
                let presure = Number(document.getElementById("pressueresp-2").value);
                let fit20 = Number(document.getElementById("fit-20-2").value);
                let pt20 = Number(document.getElementById("pt20-2").value);
                let pt20sp = Number(document.getElementById("pt20sp-2").value);
                let ph60 = Number(document.getElementById("ph60-2").value);
                let pt20_pt01 = Number(document.getElementById("pt20-pt1-2").value);
                let con0 = Number(document.getElementById("con0-2").value);
                let pt01 = Number(document.getElementById("pt01-2").value);
                let pt02 = Number(document.getElementById("pt02-2").value);
                let pt03 = Number(document.getElementById("pt03-2").value);
                let pt02sp = Number(document.getElementById("pt02sp-2").value);
                let pt03sp = Number(document.getElementById("pt03sp-2").value);
                let pt01_pt02 = Number(document.getElementById("pt01-pt02-2").value);
                let toc = Number(document.getElementById("toc-2").value);
                let pt100 = Number(document.getElementById("pt100-2").value);
                let fit01 = Number(document.getElementById("fit01-2").value);
                let p71 = Number(document.getElementById("p71-2").value);
                let p71hz = Number(document.getElementById("p71hz-2").value);
                let dp01 = Number(document.getElementById("dp01-2").value);
                let dp01sp = Number(document.getElementById("dp01sp-2").value);
                let ert = Number(document.getElementById("ert-2").value);
                let pt05 = Number(document.getElementById("pt05-2").value);
                let con01 = Number(document.getElementById("con01-2").value);
                let fit02 = Number(document.getElementById("fit02-2").value);
                let ph01 = Number(document.getElementById("ph01-2").value);
                let fit80 = Number(document.getElementById("fit80-2").value);
                let fit03 = Number(document.getElementById("fit03-2").value);
                let pt06 = Number(document.getElementById("pt06-2").value);
                let pt03_pt06 = Number(document.getElementById("pt03-pt06-2").value);
                updatehdmi2(
                    id,
                    fecharaw,
                    fecha,
                    hora,
                    p60,
                    presure,
                    fit20,
                    pt20,
                    pt20sp,
                    ph60,
                    pt20_pt01,
                    con0,
                    pt01,
                    pt02,
                    pt03,
                    pt02sp,
                    pt03sp,
                    pt01_pt02,
                    toc,
                    pt100,
                    fit01,
                    p71,
                    p71hz,
                    dp01,
                    dp01sp,
                    ert,
                    pt05,
                    con01,
                    fit02,
                    ph01,
                    fit80,
                    fit03,
                    pt06,
                    pt03_pt06
                );
                sucessalert("Actualizado");
            });
            //current date 

            document.getElementById("qptoidt").addEventListener("click", (e) => {

                }


            )
            cargarplanta(db, "Planta 1", totimestamp(document.getElementById("qdatestartptoi").value), totimestamp(currentdate()), 20);
            document.getElementById("qplanta").addEventListener("change", (e) => {
                e.preventDefault();
                cargarplanta(db, e.target.value, totimestamp(document.getElementById("qdatestartptoi").value), totimestamp(document.getElementById("qdateendptoi").value), 40);
            });
            document.getElementById("qptoidt").addEventListener("click", (e) => {
                let planta = document.getElementById("qplanta").value
                let fecha1 = totimestamp(document.getElementById("qdatestartptoi").value);
                let fecha2 = totimestamp(document.getElementById("qdateendptoi").value);
                cargarplanta(db, planta, fecha1, fecha2, 40);
            });

            cargarbypass(db, "Planta 2", totimestamp(document.getElementById("qdatestartbypass").value), totimestamp(currentdate()), 20);
            document.getElementById("qbypass").addEventListener("change", (e) => {
                e.preventDefault();
                let fecha1 = totimestamp(document.getElementById("qdatestartbypass").value);
                let fecha2 = totimestamp(document.getElementById("qdateendbypass").value);
                cargarbypass(db, e.target.value, fecha1, fecha2, 40);
            });
            document.getElementById("qbyoassdt").addEventListener("click", (e) => {
                let planta = document.getElementById("qbypass").value
                let fecha1 = totimestamp(document.getElementById("qdatestartbypass").value);
                let fecha2 = totimestamp(document.getElementById("qdateendbypass").value);
                cargarbypass(db, planta, fecha1, fecha2, 40);
            });

            document.querySelector("#tabla-ptoi1").addEventListener("click", async (e) => {
                //show modal
                $("#ptoi1hdmi").modal("show");
                cargarhdmi1(db, totimestamp(document.getElementById("qdatestarthdmi1").value), totimestamp(currentdate()), 20)
            });

            document.getElementById("qhdmi1dt").addEventListener("click", (e) => {
                let fecha1 = totimestamp(document.getElementById("qdatestarthdmi1").value);
                let fecha2 = totimestamp(document.getElementById("qdateendhdmi1").value);
                cargarhdmi1(db, fecha1, fecha2, 40);
            });

            document.querySelector("#tabla-ptoi2").addEventListener("click", async (e) => {
                //show modal
                $("#ptoi2hdmi").modal("show");
                cargarhdmi2(db, totimestamp(document.getElementById("qdatestarthdmi2").value), totimestamp(currentdate()), 20);
            });
            document.getElementById("qhdmi2dt").addEventListener("click", (e) => {
                let fecha1 = totimestamp(document.getElementById("qdatestarthdmi2").value);
                let fecha2 = totimestamp(document.getElementById("qdateendhdmi2").value);
                cargarhdmi2(db, fecha1, fecha2, 40);
            });

            cargarrechazo(db, totimestamp(document.getElementById("qdatestartrechazo").value), totimestamp(currentdate()), 20);
            document.getElementById("qrechazodt").addEventListener("click", (e) => {
                let fecha1 = totimestamp(document.getElementById("qdatestartrechazo").value);
                let fecha2 = totimestamp(document.getElementById("qdateendrechazo").value);
                cargarrechazo(db, fecha1, fecha2, 40);
            });

            cargaringreso(db, totimestamp(document.getElementById("qdatestartingreso").value), totimestamp(currentdate()), 20);
            document.getElementById("qingresodt").addEventListener("click", (e) => {
                let fecha1 = totimestamp(document.getElementById("qdatestartingreso").value);
                let fecha2 = totimestamp(document.getElementById("qdateendingreso").value);
                cargaringreso(db, fecha1, fecha2, 40);
            });

            cargarphce(db, totimestamp(document.getElementById("qdatestartphce").value), totimestamp(currentdate()), 20);
            document.getElementById("qphcedt").addEventListener("click", (e) => {
                let fecha1 = totimestamp(document.getElementById("qdatestartphce").value);
                let fecha2 = totimestamp(document.getElementById("qdateendphce").value);
                cargarphce(db, fecha1, fecha2, 40);
            });
        } else if (credenciales == "Administrador") {
            $("#conent-dashboard").removeClass("d-none");
            $("#encabezado").addClass("d-none");
            $("#contenido").addClass("d-none");

        } else {
            signOut(auth);
            location.reload();
        }
    } else {
        Swal.fire({
            title: 'Iniciar sesion',
            html: `<input type="text" id="login" class="swal3-input" placeholder="Usuario">
            <input type="password" id="password" class="swal3-input" placeholder="password">`,
            confirmButtonText: 'Iniciar sesión',
            focusConfirm: false,
            preConfirm: () => {
                const login = Swal.getPopup().querySelector('#login').value + "@OHYE.COM";
                const password = Swal.getPopup().querySelector('#password').value
                if (!login || !password) {
                    Swal.showValidationMessage(`Porfavor ingresar codigo y contraseña`)
                } else {
                    
                    console.log("1"+auth, "2"+db, "3"+login, "4"+password);
                    verificarsd(auth, db, login, password);
                }
            }
        })
    }
});