"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input, PasswordInput } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"

import { FaGithub, FaDiscord, FaArrowLeft } from "react-icons/fa";
import { HiCode } from "react-icons/hi";

const formSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
})

export default function LoginPage() {
    const router = useRouter();
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
  
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <Button 
                variant="ghost" 
                className="absolute top-4 left-4 text-slate-300 hover:bg-slate-800/50"
                onClick={() => router.push('/')}
            >
                <FaArrowLeft className="mr-2" /> Back to Home
            </Button>
            
            <div className="w-full flex items-center justify-center py-6 px-4">
                <Card className="w-full max-w-md bg-slate-950 border-slate-800 p-6 md:p-8">
                    <div className="flex justify-center mb-6">
                        <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-slate-700">
                            <Image 
                                src="https://avatars.githubusercontent.com/u/184518998?s=200&v=4" 
                                alt="Coders Forum Logo" 
                                width={56} 
                                height={56}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    
                    <h2 className="text-center text-2xl font-bold mb-2 text-slate-100">Welcome Back!</h2>
                    <p className="text-center text-slate-400 mb-6">
                        Please sign in to continue to QnA
                    </p>
                    
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                type="email" 
                                                placeholder="your@email.com"
                                                className="h-10 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-slate-700"
                                            />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel className="text-slate-300">Password</FormLabel>
                                            <Link href="/forgot-password" className="text-xs text-slate-400 hover:text-slate-300">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <PasswordInput 
                                                {...field}
                                                placeholder="••••••••"
                                                className="h-10 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-slate-700"
                                            />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            
                            <Button 
                                type="submit" 
                                className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-800 mt-2"
                            >
                                Sign In
                            </Button>
                            
                            <div className="text-center text-sm text-slate-400 mt-4">
                                Don't have an account? 
                                <Link href="/register" className="text-slate-300 hover:text-slate-100 ml-1">
                                    Sign up
                                </Link>
                            </div>
                            
                            <div>
                                <Separator className="my-5 bg-slate-800" />
                                <p className="text-center text-sm text-slate-400 mb-4">or continue with</p>
                                <div className="flex justify-center gap-4">
                                    <Link 
                                        href={`${process.env.NODE_ENV === 'production' 
                                            ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL 
                                            : process.env.NEXT_PUBLIC_DEV_BACKEND_URL}/api/auth/github`}
                                        className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800"
                                    >
                                        <FaGithub size={20} className="text-slate-300" />
                                    </Link>
                                    <Link 
                                        href={`${process.env.NODE_ENV === 'production'
                                            ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL
                                            : process.env.NEXT_PUBLIC_DEV_BACKEND_URL}/api/auth/discord`}
                                        className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800"
                                    >
                                        <FaDiscord size={20} className="text-slate-300" />
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    )
}
                