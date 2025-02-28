'use client';

import {
  UserCircleIcon,
  InboxArrowDownIcon
} from '@heroicons/react/24/outline';

import { Button } from '@/app/ui/button';
import { sendEmail, State } from '@/app/lib/mailClaimPageAction';
import { useActionState, useState } from 'react';

// If want default data, put this in the intitialState:  data: {recipientName: 'jc', email: 'chartraj@mit.edu'}
export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(sendEmail, initialState);
  const [success, setSuccess] = useState(false)

  return (
    <div>

{ !state.success &&

    <form action={formAction} id="blah">
      <div className="rounded-md bg-gray-50 p-2 md:p-6">
       
  {/* Name to put on the credential */}
        <div className="mb-1 md:mb-4">
          <label htmlFor="recipientName" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-1 md:mt-2 rounded-md">
            <div className="relative">
              <input
                id="recipientName"
                name="recipientName"
                type="string"
                defaultValue={state.data?.recipientName?state.data.recipientName:undefined}
                placeholder="Recipient's name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="recipientName-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="recipientName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.recipientName &&
              state.errors.recipientName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>


  {/* Email address to which to send the credential */}
  <div className="mb-1 md:mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email Address
          </label>
          <div className="relative  mt-1 md:mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={state.data?.email?state.data.email:undefined}
                placeholder="Recipient's email address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
              <InboxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

      {/* Any returned messages, i.e., errors */}
        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>

      {/* The submit button */}
      <div className="mt-2 md:mt-6 flex justify-center md:gap-4">
        <Button className="bg-[#429EA6] hover:bg-gray-200 text-gray-900" type="submit">Issue Credential</Button>
      </div>
    </form>
}

    { state.success &&

      <div className=" max-w-[500px] space-y-2.5 p-4 md:-mt-10 text-center">
        <br/><br/>
        Your credential has been issued!. 
        <br/><br/>
        You should momentarily receive an email with a link to collect the credential.
        <br/><br/>
        <div className="mt-2 md:mt-6 flex justify-center md:gap-4">
          <Button className="bg-[#429EA6] hover:bg-gray-200 text-gray-900" onClick={()=>{state.success = false; setSuccess(!success)}}>Issue Another</Button>
        </div>
      </div>
    }
</div>

    
  );
}
