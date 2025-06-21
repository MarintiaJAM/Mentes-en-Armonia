document.addEventListener("DOMContentLoaded", function () {
    const preguntasDyslexia = [
        "1. Confundo palabras visualmente similares como coser y comer.",
        "2. A menudo me pierdo al leer un párrafo y necesito volver a empezar.",
        "3. Confundo los nombres de objetos comunes, como decir \"mesa\" en lugar de \"silla\".",
        "4. Tengo problemas para distinguir la izquierda de la derecha.",
        "5. Me resulta confusa la lectura de mapas así como encontrar el camino a un lugar desconocido.",
        "6. Con regularidad necesito volver a leer los párrafos para entenderlos.",
        "7. Me confundo cuando se me dan varias instrucciones a la vez.",
        "8. A menudo cometo errores al escribir mensajes en el móvil.",
        "9. Me es complicado encontrar la palabra adecuada para lo que estoy tratando de decir o escribir.",
        "10. Para leer palabras nuevas, necesito separarlas en sílabas, como e-le-fan-te.",
        "11. Cuando escribo me resulta difícil organizar mis pensamientos en el papel.",
        "12. Me cuesta recordar el orden de las letras del alfabeto.",
        "13. Se me dificulta la lectura en voz alta.",
        "14. Me cuesta pronunciar palabras fonéticamente, sobre todo nuevas palabras.",
        "15. Cuando transcribo un texto, a menudo omito palabras.",
        "16. Tengo problemas en exámenes de opción múltiple pues no logro entender los detalles de las preguntas.",
        "17. A menudo tengo dificultades para comprender procesos de varios pasos o instrucciones.",
        "18. Con regularidad cometo errores a la hora de hablar pues cambio de posición las letras en las palabras como \"cocholate\" en lugar de \"chocolate\".",
        "19. No puedo recordar con precisión nombres de letras, cosas o personas.",
        "20. Me es difícil recordar la ortografía correcta de palabras que uso con frecuencia.",
        "21. Encuentro que las tareas de lectura me llevan más tiempo que a las personas a mi alrededor.",
        "22. A veces mis notas contienen errores ortográficos que no detecto en la revisión.",
        "23. Me siento frustrado cuando tengo que leer textos largos o complicados.",
        "24. Siento que mis habilidades de escritura no reflejan mi nivel de conocimiento.",
        "25. Me cuesta identificar rimas o patrones en las palabras al leer en voz alta.",
        "26. Me resulta difícil escribir palabras largas sin verlas escritas antes.",
        "27. Me abruma leer cuando hay muchas palabras juntas sin imágenes o espacios.",
        "28. He recibido comentarios negativos sobre mi ortografía o redacción aunque me esfuerzo mucho.",
        "29. Cuando leo en voz alta, me salto líneas o repito palabras sin darme cuenta.",
        "30. Prefiero escuchar audiolibros o que alguien me lea en lugar de leer por mí mismo."
    ];

    renderEncuesta(
        preguntasDyslexia,
        "dyslexia",
        "Probabilidad baja de rasgos disléxicos.",
        "Podrías tener algunos rasgos disléxicos.",
        "Probabilidad alta de rasgos disléxicos. Considera consultar a un especialista."
    );
});