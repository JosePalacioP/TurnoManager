"use client";
import { useState } from "react";
import { registerUser } from "./actions";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("Registrando usuario...");
        const result = await registerUser(formData);

        if (result.error) {
            setMessage(result.error);
        } else {
            setMessage(`¡Registrado correctamente! Bienvenido: ${result.user?.name}`);
            setFormData({ name: "", email: "", password: "" }); // Limpiar el formulario
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm p-4">
            <div>
                <label htmlFor="name">Nombre:</label>
                <input
                    id="name"
                    name="name"
                    type="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                    className="border p-1 w-full text-black"
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                    className="border p-1 w-full text-black"
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    required
                    onChange={handleChange}
                    className="border p-1 w-full text-black"
                />
            </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrarse</button>
        {message && (
            <p className={`mt-2 ${message.includes("error") ? "text-red-500" : "text-green-500"}`}>
                {message}
            </p>
        )}
        </form>
    );
}