import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Navbar from "./Navbar";
import { loginUserApi } from "../../lib/api/commonApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/authSlice";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const result = await loginUserApi(data);
            if (result?.token) {
                dispatch(setCredentials({ user: result.user, token: result.token }));
                navigate("/dashboard");
            } else {
                alert("Login failed! Invalid response.");
            }
            alert("Login successful!");
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed! Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-8">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
                        Login to Your Account
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="mt-2"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="mt-2"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>

                    {/* <p className="text-center text-gray-500 text-sm mt-6">
                        Don’t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-green-600 hover:underline font-medium"
                        >
                            Register here
                        </Link>
                    </p> */}
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
