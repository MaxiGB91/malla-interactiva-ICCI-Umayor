
const malla = [
    {
        semestre: 1,
        asignaturas: [
            { nombre: "Química aplicada a la ingeniería", estado: "pendiente", prereqs: [] },
            { nombre: "Álgebra", estado: "pendiente", prereqs: [] },
            { nombre: "Cálculo", estado: "pendiente", prereqs: [] },
            { nombre: "Pensamiento computacional", estado: "pendiente", prereqs: [] }
        ]
    },
    {
        semestre: 2,
        asignaturas: [
            { nombre: "Física", estado: "pendiente", prereqs: ["Cálculo"] },
            { nombre: "Cálculo integral", estado: "pendiente", prereqs: ["Cálculo"] },
            { nombre: "Estadística", estado: "pendiente", prereqs: [] },
            { nombre: "Arquitectura de computadores", estado: "pendiente", prereqs: ["Pensamiento computacional"] }
        ]
    }
];

function crearTarjetas() {
    const contenedor = document.getElementById("malla");
    contenedor.innerHTML = "";
    let total = 0, completado = 0;

    malla.forEach(sem => {
        const divSem = document.createElement("div");
        divSem.className = "semestre";
        const titulo = document.createElement("h3");
        titulo.textContent = "Semestre " + sem.semestre;
        divSem.appendChild(titulo);

        sem.asignaturas.forEach(ramo => {
            total++;
            if (ramo.estado === "cursado") completado++;
            const divRamo = document.createElement("div");
            divRamo.className = "ramo " + ramo.estado;
            divRamo.title = "Prerrequisitos: " + (ramo.prereqs.length > 0 ? ramo.prereqs.join(", ") : "Ninguno");
            divRamo.textContent = ramo.nombre;
            divRamo.onclick = () => {
                const estados = ["pendiente", "en-curso", "cursado"];
                let i = estados.indexOf(ramo.estado);
                i = (i + 1) % estados.length;
                ramo.estado = estados[i];
                localStorage.setItem("malla", JSON.stringify(malla));
                crearTarjetas();
            };
            divSem.appendChild(divRamo);
        });
        contenedor.appendChild(divSem);
    });

    const progreso = Math.round((completado / total) * 100);
    document.getElementById("progreso-barra").style.width = progreso + "%";
    document.getElementById("progreso-texto").textContent = "Progreso: " + progreso + "%";
}

document.getElementById("buscador").addEventListener("input", function () {
    const valor = this.value.toLowerCase();
    document.querySelectorAll(".ramo").forEach(div => {
        if (div.textContent.toLowerCase().includes(valor)) {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    });
});

document.getElementById("resetear").addEventListener("click", function () {
    localStorage.removeItem("malla");
    location.reload();
});

window.onload = () => {
    const guardado = localStorage.getItem("malla");
    if (guardado) {
        const datos = JSON.parse(guardado);
        datos.forEach((sem, i) => {
            sem.asignaturas.forEach((r, j) => {
                malla[i].asignaturas[j].estado = r.estado;
            });
        });
    }
    crearTarjetas();
};
