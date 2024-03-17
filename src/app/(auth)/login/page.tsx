import LoginForm from "~/components/auth/login-form";
import Link from "next/link";
import {Button} from "~/components/ui/button";

export default function Page() {
    return (
        <div className="flex flex-1 flex-col justify-center items-center px-6 py-2 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    Sign in to your account
                </h2>
            </div>
            <LoginForm />
            <div>
            <p className="mt-1 lg:text-center text-sm text-gray-500">
                Not a member?{' '}
                <Button asChild variant='link' className={'px-0'}>
                    <Link href={'/register'}>Register here</Link>
                </Button>
            </p>
            <p className="mt- lg:text-center text-sm text-gray-500">
                Forgot your password or username?{' '}
               <Button asChild variant='link' className={'px-0'}>
                    <Link href={'/reset'}>Reset</Link>
                </Button>
            </p>

            </div>
        </div>
    )
}