import RegisterForm from "~/components/auth/register-form";
import {Button} from "~/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <div className="px-6 py-10 lg:px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    Become a member
                </h2>
            </div>
            <RegisterForm/>
            <p className="mt-4 text-center text-sm text-gray-500">
                Already a member?{' '}
                <Button asChild variant='link'>
                    <Link href={'/login'}>Sign in here</Link>
                </Button>
            </p>
        </div>
    )
}