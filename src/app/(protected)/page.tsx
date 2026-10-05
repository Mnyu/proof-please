'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ProofPlease, ProofPleaseSchema } from '@/types/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { LinkIcon, MoveRight } from 'lucide-react';
import Image from 'next/image';

const Home = () => {
  const form = useForm<ProofPlease>({
    resolver: zodResolver(ProofPleaseSchema),
    mode: 'onBlur',
    defaultValues: {
      reelUrl: '',
    },
  });

  const runProofPlease = async (formInput: ProofPlease) => {
    console.log(formInput);
  };

  return (
    <div className='h-full flex flex-col items-center justify-start'>
      <Card className='w-full max-w-3xl ring-0 bg-transparent pt-5'>
        <CardHeader className=''>
          <CardTitle className='text-3xl xl:text-4xl py-2 font-serif'>From viral videos to verifiable facts.</CardTitle>
          <CardDescription className='text-md xl:text-lg font-sans'>
            Paste an Instagram Reel and we extract the key claims, verify them with trusted sources, and give you a
            clear, unbiased verdict.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id='reel-form' onSubmit={form.handleSubmit(runProofPlease)}>
            <FieldGroup className='py-4'>
              <Controller
                name='reelUrl'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className='flex justify-between items-center gap-2 border-2 rounded-2xl px-3 py-1'>
                      <LinkIcon className='' />
                      <Input
                        {...field}
                        id='reelUrl'
                        aria-invalid={fieldState.invalid}
                        placeholder='https://www.instagram.com/reel/abcdefghik/'
                        autoComplete='off'
                        className='h-12 !bg-transparent border-0 shadow-none outline-none focus:border-0 focus:ring-0 focus-visible:ring-0'
                      />
                      <Button type='submit' form='reel-form' className='h-12 px-4 rounded-xl cursor-pointer'>
                        Proof Please <MoveRight />
                      </Button>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <div className='relative w-full min-h-fit hidden md:block flex-1 -mt-16'>
        <Image src='/images/home.png' alt='home-image' fill priority className='object-contain' sizes='100%' />
      </div>
    </div>
  );
};
export default Home;
