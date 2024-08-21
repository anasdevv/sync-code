import { Button } from '@/components/ui/button';
import { CloudIcon } from '@/icons/CloudIcon';
import { GitlabIcon } from '@/icons/GitlabIcon';
import { RocketIcon } from '@/icons/RocketIcon';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <main className='flex-1 bg-muted'>
        <section className='container mx-auto py-12 md:py-24 px-4 md:px-6 grid md:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <h1 className='text-4xl font-bold text-gray-400'>
              Sync Your Leetcode to GitHub
            </h1>
            <p className='text-muted-foreground text-lg'>
              Easily push your Leetcode solutions to your GitHub profile. Never
              worry about managing your coding challenges separately again.
            </p>
            <div className='flex gap-4'>
              <Button>Get Started</Button>
              <Button variant='secondary'>Learn More</Button>
            </div>
          </div>
          <div>
            <img
              src='/illustration.svg'
              width='600'
              height='400'
              alt='Sync Leetcode to GitHub'
              className='rounded-lg'
              style={{ aspectRatio: '600/400', objectFit: 'cover' }}
            />
          </div>
        </section>
        <section className='container mx-auto py-12 md:py-24 px-4 md:px-6'>
          <div className='space-y-4 text-center'>
            <h2 className='text-3xl font-bold text-gray-400'>Features</h2>
            <p className='text-muted-foreground text-lg'>
              Sync your Leetcode problems to your GitHub profile with ease.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8 mt-8'>
            <div className='bg-background rounded-lg p-6 shadow-md'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='bg-primary text-primary-foreground rounded-full p-2'>
                  <CloudIcon className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold text-primary-foreground'>
                  Cloud Sync
                </h3>
              </div>
              <p className='text-muted-foreground'>
                Automatically sync your Leetcode problems to the cloud, so you
                can access them from anywhere.
              </p>
            </div>
            <div className='bg-background rounded-lg p-6 shadow-md'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='bg-primary text-primary-foreground rounded-full p-2'>
                  <GitlabIcon className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold text-primary-foreground'>
                  GitHub Integration
                </h3>
              </div>
              <p className='text-muted-foreground'>
                Push your Leetcode solutions directly to your GitHub profile,
                keeping your coding journey in one place.
              </p>
            </div>
            <div className='bg-background rounded-lg p-6 shadow-md'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='bg-primary text-primary-foreground rounded-full p-2'>
                  <RocketIcon className='h-6 w-6' />
                </div>
                <h3 className='text-xl font-bold text-primary-foreground'>
                  Seamless Workflow
                </h3>
              </div>
              <p className='text-muted-foreground'>
                Integrate Leetcode and GitHub seamlessly, so you can focus on
                coding and let the app handle the rest.
              </p>
            </div>
          </div>
        </section>
        <section className='container mx-auto py-12 md:py-24 px-4 md:px-6'>
          <div className='space-y-4 text-center'>
            <h2 className='text-3xl font-bold text-gray-400'>Get Started</h2>
            <p className='text-muted-foreground text-lg'>
              Sign up and start syncing your Leetcode problems to GitHub today.
            </p>
          </div>
          <div className='max-w-md mx-auto mt-8'>{children}</div>
        </section>
      </main>
      <footer className='bg-primary text-primary-foreground px-4 md:px-6 py-4 flex items-center justify-between'>
        <div className='text-sm'>
          &copy; 2024 Sync Leetcode to GitHub. All rights reserved.
        </div>
        <div className='flex items-center gap-4'>
          <Link href='#' className='hover:underline' prefetch={false}>
            Terms of Service
          </Link>
          <Link href='#' className='hover:underline' prefetch={false}>
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
