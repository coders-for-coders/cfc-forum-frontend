"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input, PasswordInput } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import Link from "next/link"
import { FaDiscord, FaGithub } from "react-icons/fa"
import Image from "next/image"

import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z.string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string()
        .min(1, { message: "Please confirm your password" }),
    fullname: z.string()
        .min(1, { message: "Full name is required" })
        .max(50, { message: "Full name must be less than 50 characters" }),
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must be less than 20 characters" })
        .regex(/^[a-zA-Z0-9_-]+$/, { message: "Username can only contain letters, numbers, underscores and dashes" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default function RegisterPage() {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            fullname: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { confirmPassword, ...dataToSend } = values;
            const response = await api.post(
                "/auth/register",
                JSON.stringify(dataToSend)
            )
            if (response.status === 201) {
                toast({
                    title: "Success",
                    description: "Registration successful! Please log in.",
                });
                router.push("/login")
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Registration failed",
                variant: "destructive"
            });
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-900 rounded-lg shadow-xl p-8 border border-slate-800">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <Image
                                src="/logo.png"
                                alt="CFC Forum Logo"
                                width={48}
                                height={48}
                                className="rounded-lg"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-100 mb-2">Create an Account</h1>
                        <p className="text-slate-400">Join our coding community</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">Full Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="bg-slate-800 border-slate-700 text-slate-100 focus:border-slate-600" />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="bg-slate-800 border-slate-700 text-slate-100 focus:border-slate-600" />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" className="bg-slate-800 border-slate-700 text-slate-100 focus:border-slate-600" />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-slate-300">Password</FormLabel>
                                            <FormControl>
                                                <PasswordInput {...field} className="bg-slate-800 border-slate-700 text-slate-100 focus:border-slate-600" />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-slate-300">Confirm Password</FormLabel>
                                            <FormControl>
                                                <PasswordInput {...field} className="bg-slate-800 border-slate-700 text-slate-100 focus:border-slate-600" />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormDescription className="pt-5">
                                <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100">
                                    Create Account
                                </Button>

                                <Separator className="mt-6 mb-4 bg-slate-700" />
                                <p className="text-center text-slate-400 mb-4">or continue with</p>
                                <div className="flex gap-6 items-center justify-center">
                                    <Link href={`${process.env.NODE_ENV === 'production' 
                                        ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL 
                                        : process.env.NEXT_PUBLIC_DEV_BACKEND_URL}/api/auth/github`}
                                        className="text-slate-400 hover:text-slate-200 transition-colors">
                                        <FaGithub size={24} />
                                    </Link>
                                    <Link href={`${process.env.NODE_ENV === 'production'
                                        ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL
                                        : process.env.NEXT_PUBLIC_DEV_BACKEND_URL}/api/auth/discord`}
                                        className="text-slate-400 hover:text-slate-200 transition-colors">
                                        <FaDiscord size={24} />
                                    </Link>
                                </div>
                            </FormDescription>
                        </form>
                    </Form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-slate-300 hover:text-slate-100 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
