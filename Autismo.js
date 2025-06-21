document.addEventListener("DOMContentLoaded", function () {

    const preguntasAutismo = [
    "1. No me gusta ir a lugares ruidosos como centros comerciales, mercados y parques",
    "2. Es estresante para mí tener que mantener el contacto visual con las personas",
    "3. Me obsesiono con cadenas de números, como fechas o matrículas",
    "4. Casi siempre llevo algún objeto especial en mi bolso o cartera que me produce una sensación de seguridad o control",
    "5. La gente me ha dicho que puedo estar obsesionado con mis intereses",
    "6. Otras personas me han dicho que hablo como un robot",
    "7. Tengo una postura inusual",
    "8. Otros me han dicho que tengo problemas para controlar mi ira",
    "9. Las personas me han dicho que tengo movimientos corporales repetitivos",
    "10. Soy muy sensible al ruido",
    "11. Incluso cuando estoy prestando atención en las conversaciones, no necesariamente miro a los ojos del orador",
    "12. En fiestas u otras reuniones sociales, normalmente me paro en las esquinas o cerca de una pared",
    "13. Hablo con mis amigos en una fiesta de la misma manera que hablaría con mis compañeros de trabajo",
    "14. A menudo me balanceo o jugueteo con mis manos para sentirme mejor",
    "15. De niño a menudo repetía palabras o frases que me decían",
    "16. Prefiero hacer las cosas por mi cuenta, antes que con otros",
    "17. Acumulo muchos hechos sobre temas y asuntos que me interesan",
    "18. La gente me ha dicho que hago ruidos extraños repetitivos y/o repito ciertas palabras fuera de contexto",
    "19. Tengo ciertas rutinas o hábitos que siento que debo seguir",
    "20. Me siento irritado y/o enfadado cuando tengo que navegar por situaciones inciertas",
    "21. Me resulta difícil mantener una conversación fluida con otros",
    "22. A menudo tengo que seguir instrucciones paso a paso para realizar tareas",
    "23. Tengo una necesidad fuerte de que las cosas estén organizadas de una manera específica",
    "24. Las personas a menudo me dicen que soy 'demasiado directo' cuando hablo",
    "25. Me siento incómodo en situaciones sociales que no puedo controlar",
    "26. Cuando me siento estresado, prefiero estar solo en lugar de buscar apoyo social",
    "27. Siento que no entiendo algunas bromas o sarcasmos",
    "28. Prefiero hacer las cosas de la misma manera una y otra vez",
    "29. Si intento imaginar algo me es muy fácil construir una imagen en mi mente",
    "30. Con frecuencia me quedo tan profundamente absorto en un tema que pierdo de vista todo lo demás"
];

renderEncuesta(
        preguntasAutismo,
        "autism",
        "Probabilidad baja de rasgos autistas.",
        "Podrías tener algunos rasgos autistas.",
        "Probabilidad alta de rasgos autistas. Considera consultar a un especialista."
    );
});