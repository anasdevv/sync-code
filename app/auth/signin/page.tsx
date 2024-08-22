'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { GithubIcon } from '@/icons/GitubIcon';
import { useCallback, useState } from 'react';
const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    const res = await signIn();
    console.log('sign in ', res);
    setIsLoading(false);
    window.location.href = '/';
  }, []);
  return (
    <div className='w-full  flex items-center justify-center'>
      <Card
        className={`w-full max-w-lg text-foreground ${'dark:bg-background dark:text-card-foreground'}`}
      >
        <CardHeader className='px-6 pt-6'>
          {/* <CardTitle className='text-2xl font-bold'>Welcome Back</CardTitle> */}
          <CardDescription
            className={`text-foreground/80 ${'dark:text-card-foreground/80'}`}
          >
            Sign in with your GitHub account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className='px-6 pb-6 grid gap-4'>
          <form>
            <Button
              onClick={handleSignIn}
              type='button'
              variant='secondary'
              className='w-full flex items-center justify-center gap-2'
            >
              {/* <Spinner */}
              <GithubIcon className='h-5 w-5' />
              Sign in with GitHub
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
