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
import {useForm} from 'react-hook-form';
import {z} from 'zod';


const formSchema = z.object({
    email: z.string().email({
        message: "Must be a valid email."
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
    name: z.string().min(4, {
        message: 'Full name must be at least 4 characters.',
    }),
    username: z.string().min(5, {
        message: 'Username must be at least 5 characters.'
    })
});
export default function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            username: ''
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.password !== values.confirmPassword) {
            form.setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match.',
            });
            return;
        }
      console.log(values)
    }

    return (
        <div className="mt-2 sm:mx-auto sm:max-w-sm">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 max-w-7xl"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem style={{margin: 0}}>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please enter your email address.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem className="">
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Full name" {...field} />
                                </FormControl>
                                <FormDescription>Please enter your full name.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    /> <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem className="">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormDescription>What do you want to be called with</FormDescription>
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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please confirm your password.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button
                        className="w-full"
                        type="submit"
                        style={{
                            boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.30) inset',
                        }}
                    >
                        Sign Up
                    </Button>
                </form>
            </Form>
        </div>
    );
}