"use client";
import { useState } from "react";
import { registerUser } from "./actions";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState({ text: "", isError: false });
    const [isPending, setIsPending] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setMessage({ text: "Procesando registro...", isError: false });

        const result = await registerUser(formData);
        
        setIsPending(false);
        if (result.error) {
            setMessage({ text: result.error, isError: true });
        } else {
            setMessage({ text: `¡Bienvenido, ${result.user?.name}! Redirigiendo...`, isError: false });
            setFormData({ name: "", email: "", password: "" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {/* Encabezado */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Crear cuenta</h1>
                    <p className="text-gray-500 mt-2">Únete a TurnoManager y gestiona tus citas</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Campo: Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre completo
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            required
                            onChange={handleChange}
                            placeholder="Ej. Juan Pérez"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                        />
                    </div>

                    {/* Campo: Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                        />
                    </div>

                    {/* Campo: Contraseña */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            required
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                        />
                    </div>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                            isPending 
                            ? "bg-blue-300 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.98] shadow-md hover:shadow-lg"
                        }`}
                    >
                        {isPending ? "Registrando..." : "Crear cuenta"}
                    </button>

                    {/* Mensaje de feedback */}
                    {message.text && (
                        <div className={`p-3 rounded-lg text-sm text-center ${
                            message.isError ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                        }`}>
                            {message.text}
                        </div>
                    )}
                </form>

                {/* Enlace al Login (opcional por ahora) */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    ¿Ya tienes cuenta? <span className="text-blue-600 font-medium hover:underline cursor-pointer">Inicia sesión</span>
                </p>
            </div>
        </div>
    );
}