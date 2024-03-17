'use client';

import {Button} from '~/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form';
import {Input} from '~/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {signIn} from 'next-auth/react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';


const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 6 characters.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
});


export default function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await signIn('credentials', {
            email: values.username,
            password: values.password,
            redirect: false,
            callbackUrl: '/dashboard',
        })

        if (res) {
            console.log(res);
        }
    }

    return (
        <div className="mt-2 sm:mx-auto sm:max-w-lg">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 max-w-7xl"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please enter your username.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please enter your password.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit"
                            style={{boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.30) inset',}}>
                        Sign In
                    </Button>
                </form>
            </Form>
        </div>
    );
}