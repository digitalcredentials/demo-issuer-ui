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
  DocumentTextIcon
} from '@heroicons/react/24/outline';

import { Button } from '@/app/ui/button';
import { issueCredential, State } from '@/app/lib/actions';
import { useActionState } from 'react';

import {CopyToClipboard} from 'react-copy-to-clipboard';

const expiryOptions : ExpirationChoices[] = [
  {id: 1, name: 'In One Minute'},
  {id: 2, name: 'In Thirty Minutes'},
  {id: 3, name: 'In One Day'}, 
  {id: 4, name: 'In One Week'},
  {id: 5, name: 'In One Month'},
  {id: 6, name: 'In One Year'}
]

const credentialTypes : CredentialTypes[] = [
  {id: "bachelor", name: "Bachelor's Degree"}, 
  {id: "course", name: "Course Credential"}
]

export default function Form() {
  const initialState: State = { message: null, errors: {}, signedVC: null };
  const [state, formAction] = useActionState(issueCredential, initialState);

  return (
    <div>
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Credential Type */}
        <div className="mb-4">
          <label htmlFor="credentialType" className="mb-2 block text-sm font-medium">
            Choose credential type
          </label>
          <div className="relative">
            <select
              id="credentialType"
              name="credentialType"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="1"
              aria-describedby="credentialType-error"
            >
              <option value="" disabled>
                Select a credential type
              </option>
              {credentialTypes.map((credentialType) => (
                <option key={credentialType.id} value={credentialType.id}>
                  {credentialType.name}
                </option> 
              ))}
            </select>
            <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="credentialType-error" aria-live="polite" aria-atomic="true">
            {state.errors?.credentialType &&
              state.errors.credentialType.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

{/* Expiry */}
<div className="mb-4">
          <label htmlFor="expiry" className="mb-2 block text-sm font-medium">
            When should the credential expire?
          </label>
          <div className="relative">
            <select
              id="expiry"
              name="expiry"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="2"
              aria-describedby="expiry-error"
            >
              <option value="" disabled>
                Expires in
              </option>
              {expiryOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option> 
              ))}
            </select>
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="expiry-error" aria-live="polite" aria-atomic="true">
            {state.errors?.expiry &&
              state.errors.expiry.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

  {/* Name to put on the credential */}
        <div className="mb-4">
          <label htmlFor="recipientName" className="mb-2 block text-sm font-medium">
            Recipient Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="recipientName"
                name="recipientName"
                type="string"
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

        {/* Revokable */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Make it revocable?
          </legend>
          <div className="rounded-md border mb-4 border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="revocable"
                  name="revocable"
                  type="checkbox"
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                />
                <label
                  htmlFor="revocable"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-white-600"
                >
                  Revocable <LinkSlashIcon className="h-4 w-4" />
                </label>
              </div>
              
            </div>
          </div>
          <div id="revocable-error" aria-live="polite" aria-atomic="true">
            {state.errors?.revocable &&
              state.errors.revocable.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>


        {/* LCW vs direct */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            How would you like to receive the signed credential?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="lcw"
                  name="delivery"
                  type="radio"
                  value="lcw" 
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                />
                <label
                  htmlFor="delivery"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-white-600"
                >
                  Issue to the Learner Credential Wallet. <WalletIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="direct"
                  name="delivery"
                  type="radio"
                  value="direct"
                  defaultChecked
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="direct"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-white-600"
                >
                  Display it here in the playground <DocumentTextIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="lcw-error" aria-live="polite" aria-atomic="true">
            {state.errors?.delivery &&
              state.errors.delivery.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

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
    { state.signedVC &&
    <div>
        <CopyToClipboard text={JSON.stringify(state.signedVC,null,2)}>
          <Button>Copy VC to clipboard</Button>
        </CopyToClipboard>
        </div>
}
    <pre>
    {state.signedVC?JSON.stringify(state.signedVC,null,2):''}</pre>
    </div>
  );
}
