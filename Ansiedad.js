document.addEventListener("DOMContentLoaded", function () {
    const preguntasAnsiedad = [
        "1. Con frecuencia presento una sensación de agobio y angustia.",
        "2. Me mantengo con una sensación de inquietud, nervios e intranquilidad.",
        "3. Mi corazón late muy rápido en momentos de preocupación, incluso sin motivo médico aparente.",
        "4. Constantemente mantengo una sensación de fatiga.",
        "5. Tengo dificultades para dormir (como tardar en conciliar el sueño, despertarme frecuentemente o tener pesadillas).",
        "6. Mi cuerpo presenta tensión muscular o dolores en algunas partes (como cuello, espalda, mandíbula, o extremidades).",
        "7. Me cuesta respirar y a menudo siento presión en el pecho así como una sensación de ahogo.",
        "8. A menudo tengo malestar estomacal, como náuseas, dolor o sensación de vacío en el estómago.",
        "9. Tengo problemas de concentración incluso en tareas sencillas.",
        "10. A menudo siento una incapacidad de pensar claramente o bloqueo mental.",
        "11. Continuamente tengo pensamientos anticipatorios, negativos o catastróficos.",
        "12. Me cuesta recordar cosas.",
        "13. Me causa mucha inseguridad el tomar decisiones incluso si estas son muy simples.",
        "14. Le doy muchas vueltas a las cosas.",
        "15. He notado un aumento en conductas como fumar, beber o comer en exceso para calmar la ansiedad.",
        "16. He tenido cambios en mi apetito.",
        "17. Recientemente he llorado mucho más de lo habitual.",
        "18. Presento continuos cambios de humor e irritabilidad.",
        "19. Me cuesta disfrutar actividades que antes me hacían sentir bien.",
        "20. Siento que algo malo va a pasar, incluso cuando todo parece estar bien.",
        "21. Me cuesta dejar de pensar en cosas que podrían salir mal.",
        "22. A menudo me sorprendo imaginando escenarios negativos sin razón clara.",
        "23. Siento que pierdo el control sobre mis pensamientos cuando estoy ansioso.",
        "24. Evito situaciones sociales o tareas por miedo a equivocarme o ser juzgado.",
        "25. Me resulta difícil relajarme, incluso cuando tengo tiempo libre.",
        "26. Me distraigo fácilmente por preocupaciones constantes.",
        "27. Tengo dolores de cabeza o migrañas frecuentes cuando estoy estresado.",
        "28. Mis manos sudan o tiemblan en situaciones estresantes.",
        "29. A veces siento miedo o pánico sin saber exactamente por qué.",
        "30. Me siento desconectado de mí mismo o de la realidad cuando estoy muy ansioso."
    ];

    renderEncuesta(
        preguntasAnsiedad,
        "anxiety",
        "Probabilidad baja de rasgos de ansiedad generalizada.",
        "Podrías tener algunos rasgos de ansiedad generalizada.",
        "Probabilidad alta de rasgos de ansiedad generalizada. Considera consultar a un especialista."
    );
});