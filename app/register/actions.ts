"use server";
import bcryptjs from 'bcryptjs';
import { prisma } from "@/lib/db";

export async function registerUser(data: any){
    // Validación de campos
    console.log("Intentando registrar a:", data.email);
    if (!data.email || !data.password || !data.name){
        return { error: "Todos los campos son obligatorios." };
    }

    try{
        // Encriptación de contraseña de forma asíncrona
        const hashedPassword = await bcryptjs.hash(data.password, 10);

        // Creación del registro en la base de datos usando Prisma
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });

        const { password: _, ...userWithoutPassword } = newUser;
        return { success: true, user: userWithoutPassword };
    } catch (error: any) {
        // Manejo de errores
        if (error.code === 'P2002') {
            return { error: "El correo electrónico ya está registrado." };
        }
        return { error: "Hubo un problema al crear la cuenta." };
    }
}