import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Navbar from "./Navbar";
import { Progress } from "../ui/progress";
import { registerUserApi } from "../../lib/api/commonApi";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    department: z.string().min(2, "Department is required"),
    yearOfPassing: z.string().min(4, "Year of Passing is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    skills: z.string().min(1, "Select at least one skill"),
    // resume: z
    //     .instanceof(FileList)
    //     .refine((files) => files?.length === 1, "Resume file is required"),
});

function RegisterPage() {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("department", data.department);
        formData.append("yearOfPassing", data.yearOfPassing);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("skills", data.skills);

        if (selectedFile) {
            formData.append("resume", selectedFile);
        }

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        const result = await registerUserApi(formData);
        console.log('result', result);


        console.log("FormData prepared:", [...formData.entries()]);
        alert("Form data ready to send!");
    };


    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const simulateUpload = (file) => {
        setSelectedFile(null);
        setUploading(true);
        setUploadProgress(0);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setUploading(false);
                setSelectedFile(file);
            }
        }, 200);
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-20 mt-10">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-5xl">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
                        Create an Account
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <div className="space-y-5">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    className="mt-2"
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="department">Department</Label>
                                <Input
                                    className="mt-2"
                                    id="department"
                                    type="text"
                                    placeholder="Enter your department"
                                    {...register("department")}
                                />
                                {errors.department && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.department.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="yearOfPassing">Year of Passing</Label>
                                <Input
                                    className="mt-2"
                                    id="yearOfPassing"
                                    type="text"
                                    placeholder="Enter your Year of Passing"
                                    {...register("yearOfPassing")}
                                />
                                {errors.yearOfPassing && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.yearOfPassing.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="skills">Skills</Label>
                                <select
                                    id="skills"
                                    {...register("skills")}
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                                >
                                    <option value="">Select a skill</option>
                                    <option value="React">React</option>
                                    <option value="Node.js">Node.js</option>
                                    <option value="MongoDB">MongoDB</option>
                                    <option value="Express">Express</option>
                                    <option value="Next.js">Next.js</option>
                                </select>
                                {errors.skills && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.skills.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    className="mt-2"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
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
                                    className="mt-2"
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>


                        </div>

                        <div
                            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${dragActive
                                ? "border-green-600 bg-green-50"
                                : "border-gray-300 bg-gray-50"
                                }`}
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={(e) => {
                                handleDrop(e);
                                const file = e.dataTransfer.files[0];
                                if (file) {
                                    simulateUpload(file);
                                }
                            }}
                        >
                            <Label
                                htmlFor="resume"
                                className="text-gray-700 font-medium text-lg mb-3"
                            >
                                Upload Your Resume
                            </Label>

                            <Input
                                id="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                {...register("resume")}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) simulateUpload(file);
                                }}
                                className="hidden"
                            />

                            <div className="text-center">
                                <p className="text-gray-600 mb-2">
                                    Drag and drop your resume here or click below
                                </p>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        document.getElementById("resume")?.click()
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {uploading ? "Uploading..." : "Browse File"}
                                </Button>
                                {uploading && (
                                    <div className="w-full mt-4">
                                        <Progress value={uploadProgress} className="h-2 w-64 mx-auto" />
                                        <p className="text-gray-500 text-sm mt-2">
                                            Uploading... {uploadProgress}%
                                        </p>
                                    </div>
                                )}

                                {!uploading && selectedFile && (
                                    <p className="text-green-700 text-sm mt-3 font-medium">
                                        ✅ Uploaded: {selectedFile.name}
                                    </p>
                                )}
                                {errors.resume && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.resume.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-center">
                            <Button
                                type="submit"
                                className="w-full md:w-1/2 bg-green-600 hover:bg-green-700 text-white"
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
