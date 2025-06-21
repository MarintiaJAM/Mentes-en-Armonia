document.addEventListener("DOMContentLoaded", function () {

    const preguntasTDAH = [
    "1. Tengo dificultades para esperar mi turno.",
    "2. Suelo tener problemas para terminar los detalles finales de un proyecto una vez terminadas las partes más complejas.",
    "3. Me muevo constantemente en mi silla y me resulta difícil permanecer sentado durante mucho tiempo.",
    "4. He pospuesto tareas que sé que requerirán mucha atención o pensamiento.",
    "5. A menudo me siento inquieto.",
    "6. Suelo perder o extraviar cosas con regularidad, como llaves, documentos importantes o incluso mi celular.",
    "7. Las tareas aburridas o repetitivas no pueden mantener mi atención.",
    "8. Con frecuencia dejo mi asiento en reuniones u otras situaciones en las que se espera que permanezca sentado.",
    "9. Me distraigo fácilmente con el ruido o la actividad a mi alrededor.",
    "10. Tengo problemas para recordar citas y obligaciones.",
    "11. Interrumpo o molesto a los demás cuando están ocupados.",
    "12. Tengo dificultad para entender los detalles y/o a menudo cometo errores por descuido.",
    "13. Me resulta difícil concentrarme en lo que dicen los demás, incluso cuando me hablan directamente.",
    "14. Interrumpo conversaciones o termino frases de otros sin darme cuenta.",
    "15. Siempre estoy \"en movimiento\" y me siento obligado a estar constantemente en acción.",
    "16. Tengo dificultades para mantener mi área de trabajo organizada.",
    "17. Tiendo a hablar más que los demás, o más de lo que creo que debería.",
    "18. A menudo interrumpo a los demás cuando están ocupados en alguna actividad.",
    "19. Con frecuencia cometo errores tipográficos, errores de cálculo u otros errores descuidados en el trabajo.",
    "20. A menudo me resulta difícil seguir conferencias o conversaciones largas, incluso en las que estoy involucrado.",
    "21. Es difícil para mí comenzar con tareas que sé que requerirán mucha concentración y esfuerzo.",
    "22. Encuentro que esperar en una fila es insoportable.",
    "23. A menudo me distraigo con pensamientos aleatorios que aparecen en mi cabeza.",
    "24. Si alguien más está hablando o haciendo ruido mientras estoy trabajando, es difícil para mí mantenerme enfocado.",
    "25. Me frustro o molesto fácilmente.",
    "26. A menudo estoy tan absorto en mis pasatiempos que me siento desconectado del resto del mundo.",
    "27. A veces tomo decisiones impulsivas que pueden ser peligrosas, como saltar desde alturas, manejar de forma imprudente, o no evaluar riesgos.",
    "28. Me resulta difícil sentarme en silencio y leer un libro.",
    "29. A menudo me meto en conversaciones de las que no soy parte o hablo por encima de otras personas.",
    "30. Con frecuencia me siento excesivamente activo, como si me impulsara un motor."
];

renderEncuesta(
        preguntasTDAH,
        "adhd",                    
        "Probabilidad baja de rasgos de TDAH.",
        "Podrías tener algunos rasgos de TDAH.",
        "Probabilidad alta de rasgos de TDAH. Considera consultar a un especialista."
    );
});
