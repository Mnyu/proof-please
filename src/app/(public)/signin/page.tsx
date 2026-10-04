'use client';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { SignInInput, SignInSchema } from '@/types/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignIn = () => {
  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async (formInput: SignInInput) => {
    const { data, error } = await authClient.signIn.email(
      {
        email: formInput.email,
        password: formInput.password,
        callbackURL: '/',
        rememberMe: false,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          redirect('/');
        },
        onError: (ctx) => {
          // display the error message
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <>
      <Logo />
      <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2'>
        <div className='relative h-full w-full hidden lg:block'>
          <Image src='/images/hero.png' alt='login-image' fill priority className='object-contain' sizes='100%' />
        </div>
        <div className='h-full flex flex-col items-center justify-center'>
          <Card className='w-full max-w-lg ring-0 bg-transparent'>
            <CardHeader className=''>
              <CardTitle className='text-4xl xl:text-5xl py-2 font-serif'>Welcome back</CardTitle>
              <CardDescription className='text-lg xl:text-xl font-sans'>Login to continue.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id='signin-form' onSubmit={form.handleSubmit(handleSignIn)}>
                <FieldGroup className='py-4'>
                  <Controller
                    name='email'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='signin-email' className='text-lg xl:text-xl'>
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id='signin-email'
                          aria-invalid={fieldState.invalid}
                          placeholder='rahul.sharma@gmail.com'
                          autoComplete='off'
                          className='h-12 px-4'
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <FieldGroup className='py-4'>
                  <Controller
                    name='password'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='signin-pass' className='text-lg xl:text-xl'>
                          Password
                        </FieldLabel>
                        <Input
                          {...field}
                          type='password'
                          id='signin-pass'
                          aria-invalid={fieldState.invalid}
                          placeholder='********'
                          autoComplete='off'
                          className='h-12 px-4'
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </CardContent>
            <Button
              type='submit'
              form='signin-form'
              className='m-4 h-12 text-lg font-semibold rounded-xl cursor-pointer'
            >
              Sign in
            </Button>
            <div className='text-lg flex justify-center items-center'>
              <span className=''>Don't have an account?</span>&nbsp;
              <Link href='/signup'>
                <span className='text-primary underline'>Sign up</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
export default SignIn;
