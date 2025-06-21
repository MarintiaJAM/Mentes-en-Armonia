document.addEventListener("DOMContentLoaded", function () {
    const preguntasDyscalculia = [
        "1. Tengo una comprensión deficiente de +, -, ÷ y x, y/o suelo confundirme con estos símbolos matemáticos.",
        "2. Tengo problemas para aprender y comprender los métodos de razonamiento y los procedimientos de cálculo de varios pasos.",
        "3. Tengo dificultades con la suma, resta, multiplicación y la división.",
        "4. Me es complejo recordar las tablas de multiplicar.",
        "5. Me resulta difícil hacer cálculos mentales.",
        "6. Aunque uso calculadora, a veces cometo errores al introducir o leer los números.",
        "7. Tiendo a invertir de lugar o mezclar números.",
        "8. Presento dificultades para medir el tiempo.",
        "9. Tengo dificultades con las tareas cotidianas que involucran números, como por ejemplo, contar dinero.",
        "10. Me resulta difícil entender la planificación financiera o la elaboración de presupuestos, a veces incluso a nivel básico.",
        "11. Se me dificulta comprender y recordar conceptos, reglas, fórmulas y secuencias matemáticas.",
        "12. Me cuesta leer o escribir números con más de una cifra (como 42, 317, 1005).",
        "13. Me es complejo estimar la medida de un objeto o distancia.",
        "14. Presento una ansiedad significativa a la hora de hacer ejercicios matemáticos y al usar dispositivos matemáticos.",
        "15. Tengo dificultad para contar con los dedos.",
        "16. Me cuesta entender que los números pueden descomponerse o componerse (como saber que 10 se forma con 9 + 1).",
        "17. Me cuesta entender tanto las operaciones básicas.",
        "18. Me confunden los números decimales o fracciones.",
        "19. A menudo escribo mal los números al copiarlos (por ejemplo, pongo 64 en lugar de 46).",
        "20. Me cuesta seguir secuencias numéricas (por ejemplo, contar de 2 en 2 o de 10 en 10).",
        "21. Me siento abrumado al ver muchos números juntos, como en tablas o facturas.",
        "22. Cuando cocino o hago manualidades, me cuesta seguir medidas y cantidades.",
        "23. Evito actividades o juegos que involucren puntuaciones, dinero o cálculos.",
        "24. Me cuesta relacionar un número con su cantidad (por ejemplo, ver 7 y visualizar 7 objetos).",
        "25. Me resulta difícil usar relojes analógicos (de manecillas).",
        "26. Me confunden los cambios de unidades de medida (por ejemplo, de metros a centímetros).",
        "27. Tengo dificultad para aprender patrones numéricos (como 2, 4, 6, 8…).",
        "28. Me cuesta aplicar las matemáticas a situaciones reales (por ejemplo, calcular el descuento en una tienda).",
        "29. Me resulta difícil entender instrucciones matemáticas escritas, incluso si son simples.",
        "30. Me confundo al usar signos como mayor que (>) o menor que (<), o no recuerdo cuál es cuál."
    ];

    renderEncuesta(
        preguntasDyscalculia,
        "dyscalculia",
        "Probabilidad baja de rasgos de discalculia.",
        "Podrías tener algunos rasgos de discalculia.",
        "Probabilidad alta de rasgos de discalculia. Considera consultar a un especialista."
    );
});