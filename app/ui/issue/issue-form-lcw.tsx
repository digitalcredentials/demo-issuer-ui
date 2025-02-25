'use client';

import { CredentialTypes, ExpirationChoices } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  LinkIcon,
  LinkSlashIcon,
  ClockIcon,
  AcademicCapIcon,
  UserCircleIcon,
  WalletIcon,
  DocumentTextIcon,
  InboxArrowDownIcon
} from '@heroicons/react/24/outline';

import { Button } from '@/app/ui/button';
import { issueCredential, State } from '@/app/lib/lcwActions';
import { useActionState } from 'react';


export default function Form() {
  const initialState: State = { message: null, errors: {}, deepLink: null, data: {recipientName: 'jc', email: 'chartraj@mit.edu'} };
  const [state, formAction] = useActionState(issueCredential, initialState);

  return (
    <div>
    <form action={formAction} id="blah">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
       
  {/* Name to put on the credential */}
        <div className="mb-4">
          <label htmlFor="recipientName" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="recipientName"
                name="recipientName"
                type="string"
                defaultValue={state.data.recipientName}
                placeholder="Enter the name of credential recipient"
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
  <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={state.data.email}
                placeholder="Email address to send credential to"
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

       
  

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/lcw/create"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Clear
        </Link>
        <Button type="submit">Issue Credential</Button>
      </div>
    </form>


{ state.deepLink &&
    <div>
       <br/> <br/>
      Lovely - your credential has been issued! <br/> <br/> You should momentarily receive an email with a link to collect the credential.
    </div>
}
    </div>
  );
}
