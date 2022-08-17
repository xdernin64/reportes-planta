import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import {
    deletergistroplanta,
    getplanta,
    deletebypass,
    getbypass,
    deletergistrorechazo,
    getrechazo,
    getingreso,
    deleteingreso,
    getphce,
    deletergistrophce,
    deletergistrohdmi1,
    deletergistrohdmi2,
    gethdmi1,
    gethdmi2,
    sucessalert,
    erroralert
} from "././funcionesrep.js";
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
    updateDoc,
    startAt,
    endAt,
    startAfter,
    endBefore
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import {
    totimestamp
} from "./helptorch.js";
export const dateformater = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
};


//cargando tabla plantas
export const cargarplanta = async (db, planta, inicio, fin, lim) => {
    const queryplanta = query(collection(db, "Reportes/Planta/PTOI"), where("planta", "==", planta), orderBy("fecha", "desc"), orderBy("horainicio", "desc"), startAt(fin, "25:00"), endBefore(inicio, true), limit(lim));
    onSnapshot(queryplanta, (snapshot) => {
        var html = "";

        snapshot.forEach((doc) => {

            const fechas = doc.data().fecha.toDate().toLocaleDateString("es-PE", dateformater);
            const li = `
            <tr>
                <td>${doc.data().planta}</td>
                <td>${fechas}</td>
                <td>${doc.data().horainicio}</td>
                <td>${doc.data().horafin}</td>
                <td>${doc.data().ingresoinicio}</td>
                <td>${doc.data().ingresofin}</td>
                <td>${doc.data().rechazoinicio}</td>
                <td>${doc.data().rechazofin}</td>
                <td>${doc.data().obseraciones}</td>
                <td>
                <div class="btn-group">
                    <button class="btn btn-white border border-3 editarplanta"  data-id="${doc.id}">Editar</button>
<button class="btn btn-dark border border-3 eliminarplanta" data-id="${doc.id}">Eliminar</path>
</svg></button>
                </div>
                </td>
            </tr>
            `
            html += li;
        });

        document.getElementById("contenido-plantas").innerHTML = html;
        const btneliminarplanta = document.querySelectorAll(".eliminarplanta");
        btneliminarplanta.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                Swal.fire({
                    title: '¿Quieres eliminar el registro?',
                    text: "No lo podras recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Eliminado!',
                            'El registro fue eliminado.',
                            'success'
                        )
                        deletergistroplanta(db, id);
                    }
                })

            });
        });
        const btnEditarplanta = document.querySelectorAll(".editarplanta");
        btnEditarplanta.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                const doc = (await getplanta(db, id)).data();
                document.getElementById("formplantas")['nombre-planta'].value = doc.planta;
                document.getElementById("formplantas")['fecha-planta'].value = doc.fecha.toDate().toLocaleDateString('en-CA');
                document.getElementById("formplantas")['hora_inicio'].value = doc.horainicio;
                document.getElementById("formplantas")['hora_final'].value = doc.horafin;
                document.getElementById("formplantas")['ingreso_inicio_caudal'].value = doc.ingresoinicio;
                document.getElementById("formplantas")['ingreso_fin_caudal'].value = doc.ingresofin;
                document.getElementById("formplantas")['rechazo_inicio_caudal'].value = doc.rechazoinicio;
                document.getElementById("formplantas")['rechazo_fin_caudal'].value = doc.rechazofin;
                document.getElementById("formplantas")['plantas-obs'].value = doc.obseraciones;
                //show modal

                $('#modal-rplanta').modal('show');
                document.querySelector("#guardarplanta").classList.add("d-none");
                document.querySelector("#footplanta").classList.remove("d-none");
                $('#btnupdateplanta').attr("data-id", id);
            });
        });
    });
}
//CARGANDO BYPASS
export const cargarbypass = async (db, planta, inicio, fin, lim) => {
    const querybypass = query(collection(db, "Reportes/Planta/bypass"), where("planta", "==", planta), orderBy("fecha", "desc"), orderBy("horainicio", "desc"), startAt(fin, "25:00"), endBefore(inicio, true), limit(lim));
    onSnapshot(querybypass, (snapshot) => {
        var html = "";

        snapshot.forEach((doc) => {

            const fechas = doc.data().fecha.toDate().toLocaleDateString();
            const li = `
            <tr>
                <td>${doc.data().planta}</td>
                <td>${fechas}</td>
                <td>${doc.data().horainicio}</td>
                <td>${doc.data().horafin}</td>
                <td>${doc.data().plantainicio}</td>
                <td>${doc.data().plantafin}</td>
                <td>${doc.data().bypassinicio}</td>
                <td>${doc.data().bypassfin}</td>
                <td>${doc.data().obseraciones}</td>
                <td>
                <div class="btn-group">
                    <button class="btn btn-white border border-3 editarbypass"  data-id="${doc.id}">Editar</button>
<button class="btn btn-dark border border-3 eliminarbypass" data-id="${doc.id}">Eliminar</path>
</svg></button>
                </div>
                </td>
            </tr>
            `
            html += li;
        });

        document.getElementById("contenido-bypass").innerHTML = html;
        const btneliminarbypass = document.querySelectorAll(".eliminarbypass");
        btneliminarbypass.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                Swal.fire({
                    title: '¿Quieres eliminar el registro?',
                    text: "No lo podras recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Eliminado!',
                            'El registro fue eliminado.',
                            'success'
                        )
                        deletebypass(db, id);
                    }
                })

            });
        });
        const btnEditarbypass = document.querySelectorAll(".editarbypass");
        btnEditarbypass.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                const doc = (await getbypass(db, id)).data();
                document.getElementById("formbypass")['nombre-planta-bypass'].value = doc.planta;
                document.getElementById("formbypass")['fecha-planta-bypass'].value = doc.fecha.toDate().toLocaleDateString('en-CA');
                document.getElementById("formbypass")['hora_inicio-bypass'].value = doc.horainicio;
                document.getElementById("formbypass")['hora_final-bypass'].value = doc.horafin;
                document.getElementById("formbypass")['ingreso_inicio_ptoi'].value = doc.plantainicio;
                document.getElementById("formbypass")['ingreso_fin_ptoi'].value = doc.plantafin;
                document.getElementById("formbypass")['inicio_caudal-bypass'].value = doc.bypassinicio;
                document.getElementById("formbypass")['fin_caudal-bypass'].value = doc.bypassfin;
                document.getElementById("formbypass")['bypass-obs'].value = doc.obseraciones;
                //show modal
                $('#modal-bypass').modal('show');
                document.querySelector("#guardarbypass").classList.add("d-none");
                document.querySelector("#footbypass").classList.remove("d-none");
                $('#btnupdatebypass').attr("data-id", id);
            });
        });
    });
}
//cargando rechazo
export const cargarrechazo = async (db, inicio, fin, lim) => {
    const queryrechazo = query(collection(db, "Reportes/Piscinas/rechazo-300m3"), orderBy("fecha", "desc"), orderBy("horainicio", "desc"), startAt(fin, "25:00"), endBefore(inicio, true), limit(lim));
    onSnapshot(queryrechazo, (snapshot) => {
        var html = "";

        snapshot.forEach((doc) => {

            const fechas = doc.data().fecha.toDate().toLocaleDateString();
            const li = `
            <tr>
                <td>${fechas}</td>
                <td>${doc.data().horainicio}</td>
                <td>${doc.data().horafin}</td>
                <td>${doc.data().rechazoinicio}</td>
                <td>${doc.data().rechazofin}</td>
                <td>${doc.data().obseraciones}</td>
                <td>
                <div class="btn-group">
                    <button class="btn btn-white border border-3 editarrechazo"  data-id="${doc.id}">Editar</button>
<button class="btn btn-dark border border-3 eliminarrechazo" data-id="${doc.id}">Eliminar</path>
</svg></button>
                </div>
                </td>
            </tr>
            `
            html += li;
        });

        document.getElementById("contenido-rechazo").innerHTML = html;
        const btneliminarrechazo = document.querySelectorAll(".eliminarrechazo");
        btneliminarrechazo.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                Swal.fire({
                    title: '¿Quieres eliminar el registro?',
                    text: "No lo podras recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Eliminado!',
                            'El registro fue eliminado.',
                            'success'
                        )
                        deletergistrorechazo(db, id);
                    }
                })

            });
        });
        const btnEditarrechazo = document.querySelectorAll(".editarrechazo");
        btnEditarrechazo.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                const doc = (await getrechazo(db, id)).data();
                document.getElementById("formrechazo")['fecha-rechazo'].value = doc.fecha.toDate().toLocaleDateString('en-CA');
                document.getElementById("formrechazo")['hora_inicio-rechazo'].value = doc.horainicio;
                document.getElementById("formrechazo")['hora_final-rechazo'].value = doc.horafin;
                document.getElementById("formrechazo")['inicio_caudal-rechazo'].value = doc.rechazoinicio;
                document.getElementById("formrechazo")['fin_caudal-rechazo'].value = doc.rechazofin;
                document.getElementById("formrechazo")['rechazo-obs'].value = doc.obseraciones;
                //show modal
                $('#modal-rechazo').modal('show');
                document.querySelector("#guardarrechazo").classList.add("d-none");
                document.querySelector("#footrechazo").classList.remove("d-none");
                $('#btnupdaterechazo').attr("data-id", id);
            });
        });
    });
}
//cargando ingreso
export const cargaringreso = async (db, inicio, fin, lim) => {
    const queryingreso = query(collection(db, "Reportes/Piscinas/Ingreso-100m3"), orderBy("fecha", "desc"), orderBy("horainicio", "desc"), startAt(fin, "25:00"), endBefore(inicio, true), limit(lim));
    onSnapshot(queryingreso, (snapshot) => {
        var html = "";

        snapshot.forEach((doc) => {

            const fechas = doc.data().fecha.toDate().toLocaleDateString();
            const li = `
            <tr>
                <td>${fechas}</td>
                <td>${doc.data().horainicio}</td>
                <td>${doc.data().horafin}</td>
                <td>${doc.data().ingresoinicio}</td>
                <td>${doc.data().ingresofin}</td>
                <td>${doc.data().obseraciones}</td>
                <td>
                <div class="btn-group">
                    <button class="btn btn-white border border-3 editaringreso"  data-id="${doc.id}">Editar</button>
<button class="btn btn-dark border border-3 eliminaringreso" data-id="${doc.id}">Eliminar</path>
</svg></button>
                </div>
                </td>
            </tr>
            `
            html += li;
        });

        document.getElementById("contenido-ingreso").innerHTML = html;
        const btneliminaringreso = document.querySelectorAll(".eliminaringreso");
        btneliminaringreso.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                Swal.fire({
                    title: '¿Quieres eliminar el registro?',
                    text: "No lo podras recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Eliminado!',
                            'El registro fue eliminado.',
                            'success'
                        )
                        deleteingreso(db, id);
                    }
                })

            });
        });

        const btnEditaringreso = document.querySelectorAll(".editaringreso");
        btnEditaringreso.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                const doc = (await getingreso(db, id)).data();
                document.getElementById("formingreso")['fecha-ingreso'].value = doc.fecha.toDate().toLocaleDateString('en-CA');
                document.getElementById("formingreso")['hora_inicio-ingreso'].value = doc.horainicio;
                document.getElementById("formingreso")['hora_final-ingreso'].value = doc.horafin;
                document.getElementById("formingreso")['inicio_caudal-ingreso'].value = doc.ingresoinicio;
                document.getElementById("formingreso")['fin_caudal-ingreso'].value = doc.ingresofin;
                document.getElementById("formingreso")['ingreso-obs'].value = doc.obseraciones;
                //show modal
                $('#modal-ingreso').modal('show');
                document.querySelector("#guardaringreso").classList.add("d-none");
                document.querySelector("#footingreso").classList.remove("d-none");
                $('#btnupdateingreso').attr("data-id", id);
            });
        });
    });
}
//cargando phce
export const cargarphce = async (db, inicio, fin, lim) => {
    const queryphce = query(collection(db, "Reportes/Planta/phce"), orderBy("fecha", "desc"), orderBy("hora", "desc"), startAt(fin, "25:00"), endBefore(inicio, true), limit(lim));
    onSnapshot(queryphce, (snapshot) => {
        var html = "";

        snapshot.forEach((doc) => {

            const fechas = doc.data().fecha.toDate().toLocaleDateString();
            const li = `
            <tr>
                <td>${fechas}</td>
                <td>${doc.data().hora}</td>
                <td>${doc.data().phcruda}</td>
                <td>${doc.data().cecruda}</td>
                <td>${doc.data().phptoi1}</td>
                <td>${doc.data().ceptoi1}</td>
                <td>${doc.data().phptoi2}</td>
                <td>${doc.data().ceptoi2}</td>
                <td>${doc.data().phpiscina}</td>
                <td>${doc.data().cepiscina}</td>
                <td>${doc.data().obseraciones}</td>
                <td>
                <div class="btn-group">
                    <button class="btn btn-white border border-3 editarphce"  data-id="${doc.id}">Editar</button>
<button class="btn btn-dark border border-3 eliminarphce" data-id="${doc.id}">Eliminar</path>
</svg></button>
                </div>
                </td>
            </tr>
            `
            html += li;
        });

        document.getElementById("contenido-phce").innerHTML = html;
        const btneliminarphce = document.querySelectorAll(".eliminarphce");
        btneliminarphce.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                Swal.fire({
                    title: '¿Quieres eliminar el registro?',
                    text: "No lo podras recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Eliminado!',
                            'El registro fue eliminado.',
                            'success'
                        )
                        deletergistrophce(db, id);
                    }
                })

            });
        });
        const btnEditarphce = document.querySelectorAll(".editarphce");
        btnEditarphce.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                const doc = (await getphce(db, id)).data();
                document.getElementById("formphce")['fecha-phce'].value = doc.fecha.toDate().toLocaleDateString('en-CA');
                document.getElementById("formphce")['chk_hora-phce'].value = doc.hora;
                document.getElementById("formphce")['ph-100'].value = doc.phcruda;
                document.getElementById("formphce")['ce-100'].value = doc.cecruda;
                document.getElementById("formphce")['ph-ptoi'].value = doc.phptoi1;
                document.getElementById("formphce")['ce-ptoi'].value = doc.ceptoi1;
                document.getElementById("formphce")['ph-ptoi2'].value = doc.phptoi2;
                document.getElementById("formphce")['ce-ptoi2'].value = doc.ceptoi2;
                document.getElementById("formphce")['ph-piscina'].value = doc.phpiscina;
                document.getElementById("formphce")['ce-piscina'].value = doc.cepiscina;
                document.getElementById("formphce")['phce-obs'].value = doc.obseraciones;
                //show modal
                $('#modal-PHCE').modal('show');
                document.querySelector("#guardarphce").classList.add("d-none");
                document.querySelector("#footphce").classList.remove("d-none");
                $('#btnupdatephce').attr("data-id", id);
            });
        });
    });
}
export const setptoi1 = async (db, id) => {
    const doc = (await gethdmi1(db, id)).data();
    document.getElementById("imagenplanta")['ptoi1-fecha'].value = doc.fecha.toDate().toLocaleDateString('en-CA'),
        document.getElementById("imagenplanta")['hora-ptoi1'].value = doc.hora,
        document.getElementById("imagenplanta")['p60-1'].value = doc.P60,
        document.getElementById("imagenplanta")['pressueresp-1'].value = doc.PRESSURE_SP,
        document.getElementById("imagenplanta")['fit-20-1'].value = doc.FIT_20,
        document.getElementById("imagenplanta")['pt20-1'].value = doc.PT_20,
        document.getElementById("imagenplanta")['pt20sp-1'].value = doc.PT_20SP,
        document.getElementById("imagenplanta")['ph02-1'].value = doc.PH_02,
        document.getElementById("imagenplanta")['pt20-pt1-1'].value = doc.PT20_PT01,
        document.getElementById("imagenplanta")['con0-1'].value = doc.CON_0,
        document.getElementById("imagenplanta")['pt01-1'].value = doc.PT_01,
        document.getElementById("imagenplanta")['pt02-1'].value = doc.PT_02,
        document.getElementById("imagenplanta")['pt03-1'].value = doc.PT_03,
        document.getElementById("imagenplanta")['pt02sp-1'].value = doc.PT_02SP,
        document.getElementById("imagenplanta")['pt03sp-1'].value = doc.PT_03SP,
        document.getElementById("imagenplanta")['pt01-pt02-1'].value = doc.PT01_PT02,
        document.getElementById("imagenplanta")['toc-1'].value = doc.TOC,
        document.getElementById("imagenplanta")['pt100-1'].value = doc.PT_100,
        document.getElementById("imagenplanta")['fit01-1'].value = doc.FIT_01,
        document.getElementById("imagenplanta")['p71-1'].value = doc.P_71,
        document.getElementById("imagenplanta")['p71hz-1'].value = doc.P_71hz,
        document.getElementById("imagenplanta")['dp01-1'].value = doc.DP_01,
        document.getElementById("imagenplanta")['dp01sp-1'].value = doc.DP_01SP,
        document.getElementById("imagenplanta")['ph01-1'].value = doc.PH_01,
        document.getElementById("imagenplanta")['pt05-1'].value = doc.PT_05,
        document.getElementById("imagenplanta")['con01-1'].value = doc.CON_01,
        document.getElementById("imagenplanta")['fit02-1'].value = doc.FIT_02,
        document.getElementById("imagenplanta")['con02-1'].value = doc.CON_02,
        document.getElementById("imagenplanta")['fit03-1'].value = doc.FIT_03,
        document.getElementById("imagenplanta")['pt06-1'].value = doc.PT_06,
        document.getElementById("imagenplanta")['pt03-pt06-1'].value = doc.PT03_PT06
}

export const setptoi2 = async (db, id) => {
    const doc = (await gethdmi2(db, id)).data();
    document.getElementById("imagenplanta2")['ptoi2-fecha'].value = doc.fecha.toDate().toLocaleDateString('en-CA'),
        document.getElementById("imagenplanta2")['hora-ptoi2'].value = doc.hora,
        document.getElementById("imagenplanta2")['p60-2'].value = doc.P60,
        document.getElementById("imagenplanta2")['pressueresp-2'].value = doc.PRESSURE_SP,
        document.getElementById("imagenplanta2")['fit-20-2'].value = doc.FIT_20,
        document.getElementById("imagenplanta2")['pt20-2'].value = doc.PT_20,
        document.getElementById("imagenplanta2")['pt20sp-2'].value = doc.PT_20SP,
        document.getElementById("imagenplanta2")['ph60-2'].value = doc.PH_60,
        document.getElementById("imagenplanta2")['pt20-pt1-2'].value = doc.PT20_PT01,
        document.getElementById("imagenplanta2")['con0-2'].value = doc.CON_0,
        document.getElementById("imagenplanta2")['pt01-2'].value = doc.PT_01,
        document.getElementById("imagenplanta2")['pt02-2'].value = doc.PT_02,
        document.getElementById("imagenplanta2")['pt03-2'].value = doc.PT_03,
        document.getElementById("imagenplanta2")['pt02sp-2'].value = doc.PT_02SP,
        document.getElementById("imagenplanta2")['pt03sp-2'].value = doc.PT_03SP,
        document.getElementById("imagenplanta2")['pt01-pt02-2'].value = doc.PT01_PT02,
        document.getElementById("imagenplanta2")['toc-2'].value = doc.TOC,
        document.getElementById("imagenplanta2")['pt100-2'].value = doc.PT_100,
        document.getElementById("imagenplanta2")['fit01-2'].value = doc.FIT_01,
        document.getElementById("imagenplanta2")['p71-2'].value = doc.P_71,
        document.getElementById("imagenplanta2")['p71hz-2'].value = doc.P_71hz,
        document.getElementById("imagenplanta2")['dp01-2'].value = doc.DP_01,
        document.getElementById("imagenplanta2")['dp01sp-2'].value = doc.DP_01SP,
        document.getElementById("imagenplanta2")['ert-2'].value = doc.ERT,
        document.getElementById("imagenplanta2")['pt05-2'].value = doc.PT_05,
        document.getElementById("imagenplanta2")['con01-2'].value = doc.CON_01,
        document.getElementById("imagenplanta2")['fit02-2'].value = doc.FIT_02,
        document.getElementById("imagenplanta2")['ph01-2'].value = doc.PH_01,
        document.getElementById("imagenplanta2")['fit80-2'].value = doc.FIT_80,
        document.getElementById("imagenplanta2")['fit03-2'].value = doc.FIT_03,
        document.getElementById("imagenplanta2")['pt06-2'].value = doc.PT_06,
        document.getElementById("imagenplanta2")['pt03-pt06-2'].value = doc.PT03_PT06
}

//cargando tabla hdmi
export const cargarhdmi1 = async (db, inicio, fin, lim) => {
    const queryhdmi = query(collection(db, "Reportes/Planta/hdmi1"), orderBy("fecha", "desc"), orderBy("hora", "desc"), startAt(fin, "25:00"), endBefore(inicio, true), limit(lim));
    onSnapshot(queryhdmi, (snapshot) => {
        var html = "";

        snapshot.forEach((doc) => {

            const fechas = doc.data().fecha.toDate().toLocaleDateString();
            const li = `
            <tr>
                <td>${fechas}</td>
                <td>${doc.data().hora}</td>
                <td>${doc.data().P60}</td>
                <td>${doc.data().PRESSURE_SP}</td>
                <td>${doc.data().FIT_20}</td>
                <td>${doc.data().PT_20}</td>
                <td>${doc.data().PT_20SP}</td>
                <td>${doc.data().PH_02}</td>
                <td>${doc.data().PT20_PT01}</td>
                <td>${doc.data().CON_0}</td>
                <td>${doc.data().PT_01}</td>
                <td>${doc.data().PT_02}</td>
                <td>${doc.data().PT_03}</td>
                <td>${doc.data().PT_02SP}</td>
                <td>${doc.data().PT_03SP}</td>
                <td>${doc.data().PT01_PT02}</td>
                <td>${doc.data().TOC}</td>
                <td>${doc.data().PT_100}</td>
                <td>${doc.data().FIT_01}</td>
                <td>${doc.data().P_71}</td>
                <td>${doc.data().P_71hz}</td>
                <td>${doc.data().DP_01}</td>
                <td>${doc.data().DP_01SP}</td>
                <td>${doc.data().PH_01}</td>
                <td>${doc.data().PT_05}</td>
                <td>${doc.data().CON_01}</td>
                <td>${doc.data().FIT_02}</td>
                <td>${doc.data().CON_02}</td>
                <td>${doc.data().FIT_03}</td>
                <td>${doc.data().PT_06}</td>
                <td>${doc.data().PT03_PT06}</td>
                <td>
                <div class="btn-group">
                    <button class="btn btn-white border border-3 editarhdmi"  data-id="${doc.id}">Ver</button>   
<button class="btn btn-dark border border-3 eliminarhdmi" data-id="${doc.id}">Eliminar</path>
</svg></button>
                </div>
                </td>
            </tr>
            `
            html += li;
        });

        document.getElementById("content-hdmi1-tabla").innerHTML = html;
        const btneliminarhdmi = document.querySelectorAll(".eliminarhdmi");
        btneliminarhdmi.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                Swal.fire({
                    title: '¿Quieres eliminar el registro?',
                    text: "No lo podras recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Eliminado!',
                            'El registro fue eliminado.',
                            'success'
                        )
                        deletergistrohdmi1(db, id);
                    }
                })

            });
        });
        const btneditarhdmi = document.querySelectorAll(".editarhdmi");
        btneditarhdmi.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                setptoi1(db, id);
                $("#actualizar-ptoi1").attr("data-id", id);
                $('#ptoi1hdmi').modal('hide');
                document.querySelectorAll(".ed1").forEach((boton) => {
                    $(".ed1").attr("readonly", true);
                    $("#guardar-ptoi1").prop('disabled', true);
                    $(".ed1").css("filter", "grayscale(100%)");
                    $("#guardar-ptoi1").css("filter", "grayscale(100%)");
                    $("#editar-ptoi1").css("filter", "grayscale(0%)");
                    $("#editar-ptoi1").prop('disabled', false);
                });
            });
        });
    });
}

export const cargarhdmi2 = async (db, inicio, fin, lim) => {
    const queryhdmi = query(collection(db, "Reportes/Planta/hdmi2"), orderBy("fecha", "desc"), orderBy("hora", "desc"), startAt(fin, "25:00"), endBefore(inicio, true), limit(lim));
    onSnapshot(queryhdmi, (snapshot) => {
        var html = "";

        snapshot.forEach((doc) => {

            const fechas = doc.data().fecha.toDate().toLocaleDateString();
            const li = `
            <tr>
                    <td>${fechas}</td>
                    <td>${doc.data().hora}</td>
                    <td>${doc.data().P60}</td>
                    <td>${doc.data().PRESSURE_SP}</td>
                    <td>${doc.data().FIT_20}</td>
                    <td>${doc.data().PT_20}</td>
                    <td>${doc.data().PT_20SP}</td>
                    <td>${doc.data().PH_60}</td>
                    <td>${doc.data().PT20_PT01}</td>
                    <td>${doc.data().CON_0}</td>
                    <td>${doc.data().PT_01}</td>
                    <td>${doc.data().PT_02}</td>
                    <td>${doc.data().PT_03}</td>
                    <td>${doc.data().PT_02SP}</td>
                    <td>${doc.data().PT_03SP}</td>
                    <td>${doc.data().PT01_PT02}</td>
                    <td>${doc.data().TOC}</td>
                    <td>${doc.data().PT_100}</td>
                    <td>${doc.data().FIT_01}</td>
                    <td>${doc.data().P_71}</td>
                    <td>${doc.data().P_71hz}</td>
                    <td>${doc.data().DP_01}</td>
                    <td>${doc.data().DP_01SP}</td>
                    <td>${doc.data().ERT}</td>
                    <td>${doc.data().PT_05}</td>
                    <td>${doc.data().CON_01}</td>
                    <td>${doc.data().FIT_02}</td>
                    <td>${doc.data().PH_01}</td>
                    <td>${doc.data().FIT_80}</td>
                    <td>${doc.data().FIT_03}</td>
                    <td>${doc.data().PT_06}</td>
                    <td>${doc.data().PT03_PT06}</td>
                <td>
                <div class="btn-group">
                    <button class="btn btn-white border border-3 editarhdmi2"  data-id="${doc.id}">Ver</button>   
<button class="btn btn-dark border border-3 eliminarhdmi2" data-id="${doc.id}">Eliminar</path>
</svg></button>
                </div>
                </td>
            </tr>
            `
            html += li;
        });

        document.getElementById("content-hdmi2-tabla").innerHTML = html;
        const btneliminarhdmi = document.querySelectorAll(".eliminarhdmi2");
        btneliminarhdmi.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                Swal.fire({
                    title: '¿Quieres eliminar el registro?',
                    text: "No lo podras recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Eliminado!',
                            'El registro fue eliminado.',
                            'success'
                        )
                        deletergistrohdmi2(db, id);
                    }
                })

            });
        });
        const btneditarhdmi = document.querySelectorAll(".editarhdmi2");
        btneditarhdmi.forEach((boton) => {
            boton.addEventListener("click", async (e) => {
                const id = e.target.dataset.id;
                setptoi2(db, id);
                $("#actualizar-ptoi2").attr("data-id", id);
                $('#ptoi2hdmi').modal('hide');
                document.querySelectorAll(".ed2").forEach((boton) => {
                    $(".ed2").attr("readonly", true);
                    $("#guardar-ptoi2").prop('disabled', true);
                    $(".ed2").css("filter", "grayscale(100%)");
                    $("#guardar-ptoi2").css("filter", "grayscale(100%)");
                    $("#editar-ptoi2").css("filter", "grayscale(0%)");
                    $("#editar-ptoi2").prop('disabled', false);
                });
            });
        });
    });
}