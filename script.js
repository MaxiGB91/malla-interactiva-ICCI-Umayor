
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
    },
    {
        semestre: 3,
        asignaturas: [
            { nombre: "Inferencia", estado: "pendiente", prereqs: ["Estadística"] },
            { nombre: "Álgebra lineal", estado: "pendiente", prereqs: ["Álgebra"] },
            { nombre: "Ecuaciones diferenciales", estado: "pendiente", prereqs: ["Cálculo integral"] },
            { nombre: "Programación aplicada en análisis de datos", estado: "pendiente", prereqs: ["Pensamiento computacional"] }
        ]
    },
    {
        semestre: 4,
        asignaturas: [
            { nombre: "Cálculo multivariable", estado: "pendiente", prereqs: ["Cálculo integral"] },
            { nombre: "Mecánica", estado: "pendiente", prereqs: ["Física"] },
            { nombre: "Microeconomía", estado: "pendiente", prereqs: [] },
            { nombre: "Estructura de datos", estado: "pendiente", prereqs: ["Pensamiento computacional"] }
        ]
    },
    {
        semestre: 5,
        asignaturas: [
            { nombre: "Análisis numérico", estado: "pendiente", prereqs: ["Ecuaciones diferenciales"] },
            { nombre: "Estadística multivariada", estado: "pendiente", prereqs: ["Inferencia"] },
            { nombre: "Base de datos I", estado: "pendiente", prereqs: ["Estructura de datos"] },
            { nombre: "Lenguajes de programación", estado: "pendiente", prereqs: ["Estructura de datos"] }
        ]
    },
    {
        semestre: 6,
        asignaturas: [
            { nombre: "Proyecto cornerstone", estado: "pendiente", prereqs: [] },
            { nombre: "Interacción humano computador", estado: "pendiente", prereqs: [] },
            { nombre: "Sistemas operativos", estado: "pendiente", prereqs: ["Arquitectura de computadores"] },
            { nombre: "Base de datos II", estado: "pendiente", prereqs: ["Base de datos I"] }
        ]
    },
    {
        semestre: 7,
        asignaturas: [
            { nombre: "Arquitectura de desarrollo (móvil y web)", estado: "pendiente", prereqs: ["Estructura de datos"] },
            { nombre: "Seguridad de la información", estado: "pendiente", prereqs: [] },
            { nombre: "Ingeniería de software", estado: "pendiente", prereqs: ["Estructura de datos"] },
            { nombre: "Proyecto capstone intermedio", estado: "pendiente", prereqs: ["Proyecto cornerstone"] }
        ]
    },
    {
        semestre: 8,
        asignaturas: [
            { nombre: "Calidad de software", estado: "pendiente", prereqs: ["Ingeniería de software"] },
            { nombre: "Inteligencia artificial", estado: "pendiente", prereqs: ["Estructura de datos"] },
            { nombre: "Redes de computadores", estado: "pendiente", prereqs: [] },
            { nombre: "Ingeniería financiera", estado: "pendiente", prereqs: [] }
        ]
    },
    {
        semestre: 9,
        asignaturas: [
            { nombre: "Computación paralela y distribuida", estado: "pendiente", prereqs: [] },
            { nombre: "Machine learning", estado: "pendiente", prereqs: ["Inteligencia artificial"] },
            { nombre: "Práctica inicial", estado: "pendiente", prereqs: [] },
            { nombre: "Deep learning", estado: "pendiente", prereqs: ["Machine learning"] }
        ]
    },
    {
        semestre: 10,
        asignaturas: [
            { nombre: "Inteligencia de negocios", estado: "pendiente", prereqs: ["Machine learning"] },
            { nombre: "Evaluación económica y financiera de proyectos", estado: "pendiente", prereqs: [] },
            { nombre: "Desarrollo seguro de software", estado: "pendiente", prereqs: ["Ingeniería de software"] },
            { nombre: "Práctica profesional", estado: "pendiente", prereqs: ["Práctica inicial"] }
        ]
    },
    {
        semestre: 11,
        asignaturas: [
            { nombre: "Proyecto de ingeniería", estado: "pendiente", prereqs: ["Proyecto capstone intermedio"] },
            { nombre: "Planificación estratégica", estado: "pendiente", prereqs: [] },
            { nombre: "Gestión de proyectos de TI", estado: "pendiente", prereqs: [] },
            { nombre: "Proyecto de título", estado: "pendiente", prereqs: ["Proyecto de ingeniería"] }
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
