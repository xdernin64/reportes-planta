//add planta
document.getElementById("agregarplanta").addEventListener("click", () => {
    document.querySelector("#guardarplanta").classList.remove("d-none");
    document.querySelector("#footplanta").classList.add("d-none");
    formplantas.reset();
    $('#btnupdateplanta').attr("data-id", "");
});
//add bypass
document.getElementById("agregarbypass").addEventListener("click", () => {
    document.querySelector("#guardarbypass").classList.remove("d-none");
    document.querySelector("#footbypass").classList.add("d-none");
    formbypass.reset();
    $('#btnupdatebypass').attr("data-id", "");
});
//add rechazo
document.getElementById("agregarrechazo").addEventListener("click", () => {
    document.querySelector("#guardarrechazo").classList.remove("d-none");
    document.querySelector("#footrechazo").classList.add("d-none");
    formrechazo.reset();
    $('#btnupdaterechazo').attr("data-id", "");
});

//add ingreso
document.getElementById("agregaringreso").addEventListener("click", () => {
    document.querySelector("#guardaringreso").classList.remove("d-none");
    document.querySelector("#footingreso").classList.add("d-none");
    formingreso.reset();
    $('#btnupdateingreso').attr("data-id", "");
});
//add phce
document.getElementById("agregarphce").addEventListener("click", () => {
    document.querySelector("#guardarphce").classList.remove("d-none");
    document.querySelector("#footphce").classList.add("d-none");
    formphce.reset();
    $('#btnupdatephce').attr("data-id", "");
});


document.querySelectorAll(".check24hrs").forEach((check) => {
    check.addEventListener("click", (e) => {
        const id = e.target.dataset.ref;
        if (e.target.checked) {

            $("#" + id).attr('type', 'text');
            $("#" + id).val("24:00");
            $("#" + id).prop('disabled', true);

        } else {
            $("#" + id).attr('type', 'time');
            $("#" + id).prop('disabled', false);
        }
    });
});
document.querySelector("#chkobs").addEventListener("click", (e) => {
    if (e.target.checked) {
        $("#plantas-obs").val("Retrolavado");
        $("#plantas-obs").prop('disabled', true);
    } else {
        $("#plantas-obs").val("");
        $("#plantas-obs").prop('disabled', false);
    }
});

//editar planta 2
document.querySelector("#editar-ptoi2").addEventListener("click", (e) => {
    $(".ed2").attr("readonly", false);
    $("#guardar-ptoi2").prop('disabled', false);
    $(".ed2").css("filter", "grayscale(0%)");
    $("#guardar-ptoi2").css("filter", "grayscale(0%)");
    document.querySelector("#guardar-ptoi2").classList.add("d-none");
    document.querySelector("#actualizar-ptoi2").classList.remove("d-none");
});
//cancelar planta 2
document.querySelector("#cancelar-ptoi2").addEventListener("click", (e) => {
    $(".ed2").attr("readonly", false);
    $("#guardar-ptoi2").prop('disabled', false);
    $("#editar-ptoi2").prop('disabled', true);
    $(".ed2").css("filter", "grayscale(0%)");
    $("#guardar-ptoi2").css("filter", "grayscale(0%)");
    $("#editar-ptoi2").css("filter", "grayscale(100%)");
    document.querySelector("#guardar-ptoi2").classList.remove("d-none");
    document.querySelector("#actualizar-ptoi2").classList.add("d-none");
    document.querySelector("#imagenplanta2").reset();
}
);
//editar planta 1
document.querySelector("#editar-ptoi1").addEventListener("click", (e) => {
    $(".ed1").attr("readonly", false);
    $("#guardar-ptoi1").prop('disabled', false);
    $(".ed1").css("filter", "grayscale(0%)");
    $("#guardar-ptoi1").css("filter", "grayscale(0%)");
    document.querySelector("#guardar-ptoi1").classList.add("d-none");
    document.querySelector("#actualizar-ptoi1").classList.remove("d-none");
}
);
//cancelar planta 1
document.querySelector("#cancelar-ptoi1").addEventListener("click", (e) => {
    $(".ed1").attr("readonly", false);
    $("#guardar-ptoi1").prop('disabled', false);
    $("#editar-ptoi1").prop('disabled', true);
    $(".ed1").css("filter", "grayscale(0%)");
    $("#guardar-ptoi1").css("filter", "grayscale(0%)");
    $("#editar-ptoi1").css("filter", "grayscale(100%)");
    document.querySelector("#guardar-ptoi1").classList.remove("d-none");
    document.querySelector("#actualizar-ptoi1").classList.add("d-none");
    document.querySelector("#imagenplanta").reset();
}
);


//navegacion general
document.getElementById("plantas-tab").addEventListener("click", async (e) => {
    document.querySelector("#content-plantas").classList.remove("d-none");
    document.querySelector("#content-bypass").classList.add("d-none");
    document.querySelector("#content-rechazo").classList.add("d-none");
    document.querySelector("#content-ingreso").classList.add("d-none");
    document.querySelector("#content-hdmi1").classList.add("d-none");
    document.querySelector("#content-hdmi2").classList.add("d-none");
    document.querySelector("#content-phce").classList.add("d-none");
});
document.getElementById("bypass-tab").addEventListener("click", async (e) => {
    document.querySelector("#content-plantas").classList.add("d-none");
    document.querySelector("#content-bypass").classList.remove("d-none");
    document.querySelector("#content-rechazo").classList.add("d-none");
    document.querySelector("#content-ingreso").classList.add("d-none");
    document.querySelector("#content-hdmi1").classList.add("d-none");
    document.querySelector("#content-hdmi2").classList.add("d-none");
    document.querySelector("#content-phce").classList.add("d-none");

});
document.getElementById("rechazo-tab").addEventListener("click", async (e) => {
    document.querySelector("#content-plantas").classList.add("d-none");
    document.querySelector("#content-bypass").classList.add("d-none");
    document.querySelector("#content-rechazo").classList.remove("d-none");
    document.querySelector("#content-ingreso").classList.add("d-none");
    document.querySelector("#content-hdmi1").classList.add("d-none");
    document.querySelector("#content-hdmi2").classList.add("d-none");
    document.querySelector("#content-phce").classList.add("d-none");
});
document.getElementById("ingreso-tab").addEventListener("click", async (e) => {
    document.querySelector("#content-plantas").classList.add("d-none");
    document.querySelector("#content-bypass").classList.add("d-none");
    document.querySelector("#content-rechazo").classList.add("d-none");
    document.querySelector("#content-ingreso").classList.remove("d-none");
    document.querySelector("#content-hdmi1").classList.add("d-none");
    document.querySelector("#content-hdmi2").classList.add("d-none");
    document.querySelector("#content-phce").classList.add("d-none");
});
document.getElementById("hdmi1-tab").addEventListener("click", async (e) => {
    document.querySelector("#content-plantas").classList.add("d-none");
    document.querySelector("#content-bypass").classList.add("d-none");
    document.querySelector("#content-rechazo").classList.add("d-none");
    document.querySelector("#content-ingreso").classList.add("d-none");
    document.querySelector("#content-hdmi1").classList.remove("d-none");
    document.querySelector("#content-hdmi2").classList.add("d-none");
    document.querySelector("#content-phce").classList.add("d-none");
});
document.getElementById("hdmi2-tab").addEventListener("click", async (e) => {
    document.querySelector("#content-plantas").classList.add("d-none");
    document.querySelector("#content-bypass").classList.add("d-none");
    document.querySelector("#content-rechazo").classList.add("d-none");
    document.querySelector("#content-ingreso").classList.add("d-none");
    document.querySelector("#content-hdmi1").classList.add("d-none");
    document.querySelector("#content-hdmi2").classList.remove("d-none");
    document.querySelector("#content-phce").classList.add("d-none");
});
document.getElementById("phce-tab").addEventListener("click", async (e) => {
    document.querySelector("#content-plantas").classList.add("d-none");
    document.querySelector("#content-bypass").classList.add("d-none");
    document.querySelector("#content-rechazo").classList.add("d-none");
    document.querySelector("#content-ingreso").classList.add("d-none");
    document.querySelector("#content-hdmi1").classList.add("d-none");
    document.querySelector("#content-hdmi2").classList.add("d-none");
    document.querySelector("#content-phce").classList.remove("d-none");
});