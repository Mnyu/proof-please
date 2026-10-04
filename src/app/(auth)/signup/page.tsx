'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { SignUpInput, SignUpSchema } from '@/types/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignUp = () => {
  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSignUp = async (formInput: SignUpInput) => {
    const { data, error } = await authClient.signUp.email(
      {
        name: formInput.name,
        email: formInput.email,
        password: formInput.password,
        // image: 'https://example.com/image.png',
        callbackURL: '/',
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
      <div className='flex justify-center items-center'>
        <div className='text-4xl xl:text-5xl pt-5 font-serif'>
          Proof <span className='text-primary'>Please!</span>
        </div>
      </div>
      <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2'>
        <div className='relative h-full w-full hidden lg:block'>
          <Image src='/images/hero.png' alt='login-image' fill priority className='object-contain' sizes='100%' />
        </div>
        <div className='h-full flex items-center justify-center'>
          <Card className='w-full max-w-lg ring-0 bg-transparent'>
            <CardHeader className='my-4'>
              <CardTitle className='text-4xl xl:text-5xl py-2 font-serif'>Create account</CardTitle>
              <CardDescription className='text-lg xl:text-xl font-sans'>
                Verify claims with real evidence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id='signup-form' onSubmit={form.handleSubmit(handleSignUp)}>
                <FieldGroup className='py-4'>
                  <Controller
                    name='name'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='signup-name' className='text-lg xl:text-xl'>
                          Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id='signup-name'
                          aria-invalid={fieldState.invalid}
                          placeholder='rahul'
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
                          placeholder='rahul@journal.com'
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
              form='signup-form'
              className='m-4 h-12 text-lg font-semibold rounded-xl cursor-pointer'
            >
              Create account
            </Button>
            <div className='text-lg flex justify-center items-center'>
              <span className=''>Already have an account?</span>&nbsp;
              <Link href='/signin'>
                <span className='text-primary underline'>Sign in</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
export default SignUp;
