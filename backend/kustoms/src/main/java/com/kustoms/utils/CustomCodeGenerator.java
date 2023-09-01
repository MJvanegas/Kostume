package com.kustoms.utils;

import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Component
public class CustomCodeGenerator {
        // Mantenemos un conjunto para mantener el seguimiento de los códigos generados previamente
        private static Set<String> generatedCodes = new HashSet<>();

        // Método para generar el código para un disfraz
        public static String generateCustomCode(String name, String reference, String size) {
            // Obtenemos las iniciales de cada elemento
            String nameInitial = getInitials(name);
            String referenceInitial = getInitials(reference);

            // Concatenamos las iniciales
            String code = nameInitial + referenceInitial + size + UUID.randomUUID().toString();

            // Verificamos si el código ya ha sido generado previamente y si es así, le agregamos un número único
            int count = 1;
            String originalCode = code;
            while (generatedCodes.contains(code)) {
                code = originalCode + count;
                count++;
            }

            // Agregamos el código generado al conjunto
            generatedCodes.add(code);
            System.out.println(code.toUpperCase() + "este el el codigo del nuevo disfraz");
            return code.toUpperCase();
        }

        // Método para obtener las iniciales de una cadena
        private static String getInitials(String input) {
            if (input == null || input.isEmpty()) {
                return "";
            }

            StringBuilder initials = new StringBuilder();
            String[] words = input.split("\\s+");
            for (String word : words) {
                if (!word.isEmpty()) {
                    initials.append(word.charAt(0));
                }
            }
            return initials.toString().toUpperCase();

        }

    // Método para reiniciar el generador de códigos (por ejemplo, al inicio de una nueva sesión)
    public static void resetGenerator() {
        generatedCodes.clear();
    }

}
