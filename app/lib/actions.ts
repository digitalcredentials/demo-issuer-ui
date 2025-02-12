'use server';

import { z } from 'zod';
import { testVC } from './vc-templates/getVC';

const FormSchema = z.object({
  recipientName: z.string().trim()
    .min(1, { message: "You must enter a name." }),
  credentialType: z.string({
    invalid_type_error: 'Please select a credential type.',
  }),
  expiry: z.string({
    invalid_type_error: 'Please select an expiration period.',
  }),
  revocable: z.coerce.boolean(),
  delivery: z.enum(['lcw', 'direct'], {
    invalid_type_error: "Please choose how you'd like to receive the credential.",
  }),
});

export type State = {
  errors?: {
    recipientName?: string[];
    credentialType?: string[];
    revocable?: string[];
    expiry?: string[];
    delivery?: string[];
  };
  message?: string | null;
};

export async function issueCredential(prevState: State, formData: FormData) {

  const validatedFields = FormSchema.safeParse({
    recipientName: formData.get('recipientName'),
    credentialType: formData.get('credentialType'),
    revocable: formData.get('revocable'),
    expiry: formData.get('expiry'),
    delivery: formData.get('delivery'),
  });
console.log("validatedFields:")
console.log(JSON.stringify(validatedFields))
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields - complete them so we can issue away!",
    };
  }

  const { recipientName, credentialType, expiry, delivery, revocable } = validatedFields.data;
 
  const expiryDate = new Date().toISOString();

  // Call the signing service
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch("https://test-issuer.dcconsortium.org/instance/test/credentials/issue", {
      method: "POST",
      body: JSON.stringify(testVC),
      headers: myHeaders,
    });

    const json = await response.json();

    console.log("the signed VC:")
    console.log(json)
    return json
  } catch (error) {
    return {
      message: 'Error: Failed to sign the VC.',
    };
  }
}


