"use client";
import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form>
        <label htmlFor="name">Nombre:</label>
        <input
            id="name"
            name="name"
            type="name"
            value={formData.name}
            required
            onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
            id="email"
            name="email"
            type="email"
            value={formData.name}
            required
            onChange={handleChange}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
            id="password"
            name="password"
            type="password"
            value={formData.name}
            required
            onChange={handleChange}
        />
        <button type="submit">Registrarse</button>
        </form>
    );
}