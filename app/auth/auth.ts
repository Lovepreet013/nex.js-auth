'use server';

import { prisma } from '@/util/db';
import { FormState, LoginFormSchema, SignupFormSchema } from './defination';
import { createSession, deleteSession } from './stateless-session';
import bcrypt from 'bcrypt';

export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  console.log(formData)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;

  // 3. Check if the user's email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select : {
        email : true
    }
  });

  if (existingUser) {
    console.log(existingUser)
    return {
      message: 'Email already exists, please use a different email or login.',
    };
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Insert the user into the database or call an Auth Provider's API
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  // 5. Create a session for the user
  const userId = user.id.toString();
  await createSession(userId);

//   return {};
}

//LOGIN---

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  const errorMessage = { message: 'Invalid login credentials.' };

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Query the database for the user with the given email
  const user = await prisma.user.findUnique({
    where: {
      email: validatedFields.data.email,
    },
    select : {
        email : true,
        password  : true,
        id : true
    }
  });

  // If user is not found, return early
  if (!user) {
    console.log(errorMessage)
    return errorMessage;
  }

  // 3. Compare the user's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    user.password,
  );

  // If the password does not match, return early
  if (!passwordMatch) {
    return errorMessage;
  }

  // 4. If login successful, create a session for the user and redirect
  const userId = user.id.toString();
  await createSession(userId);

}

export async function logout() {
  deleteSession();
}
