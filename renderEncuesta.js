function renderEncuesta(preguntas, idBase, msgBajo, msgMedio, msgAlto) {
    const opciones = [
        { texto: "Nunca", valor: 0, color: "red" },
        { texto: "Rara vez", valor: 1, color: "orange" },
        { texto: "A veces", valor: 2, color: "gray" },
        { texto: "Frecuentemente", valor: 3, color: "lightgreen" },
        { texto: "Siempre", valor: 4, color: "green" }
    ];

    const contenedor = document.getElementById(`questions-${idBase}`);
    const form = document.getElementById(`form-${idBase}`);
    const resultadoDiv = document.getElementById(`result-${idBase}`);
    const canvas = document.getElementById(`chart-${idBase}`);
    const restartBtn = document.getElementById(`restart-${idBase}`);

    preguntas.forEach((pregunta, index) => {
        const div = document.createElement("div");
        div.classList.add("pregunta", "question");

        const p = document.createElement("p");
        p.textContent = pregunta;
        div.appendChild(p);

        const optionsGroup = document.createElement("div");
        optionsGroup.classList.add("options");

        opciones.forEach((opcion, i) => {
            const optionWrapper = document.createElement("div");
            optionWrapper.classList.add("option-wrapper");

            const input = document.createElement("input");
            const inputId = `p${index}-${idBase}-opt${i}`;
            input.type = "radio";
            input.name = `p${index}-${idBase}`;
            input.value = opcion.valor;
            input.id = inputId;
            input.required = true;

            const label = document.createElement("label");
            label.classList.add("option");
            label.setAttribute("for", inputId);
            label.setAttribute("data-color", opcion.color);

            const circle = document.createElement("div");
            circle.classList.add("circle");

            const text = document.createElement("div");
            text.classList.add("option-text");
            text.textContent = opcion.texto;

            label.appendChild(circle);
            label.appendChild(text);

            optionWrapper.appendChild(input);
            optionWrapper.appendChild(label);

            optionsGroup.appendChild(optionWrapper);
        });

        div.appendChild(optionsGroup);
        contenedor.appendChild(div);
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let total = 0;
        preguntas.forEach((_, index) => {
            const respuesta = document.querySelector(`input[name="p${index}-${idBase}"]:checked`);
            total += parseInt(respuesta.value);
        });

        let resultadoTexto = "";
        if (total <= 10) {
            resultadoTexto = msgBajo;
        } else if (total <= 25) {
            resultadoTexto = msgMedio;
        } else {
            resultadoTexto = msgAlto;
        }

        resultadoDiv.textContent = resultadoTexto;
        canvas.style.display = "block";
        restartBtn.style.display = "block";

        const ctx = canvas.getContext("2d");
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Resultado"],
                datasets: [{
                    label: "Resultado del test",
                    data: [total, 120 - total],
                    backgroundColor: ["#36a2eb", "#e0e0e0"]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    });

    restartBtn.addEventListener("click", function () {
        form.reset();
        resultadoDiv.textContent = "";
        canvas.style.display = "none";
        restartBtn.style.display = "none";
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}