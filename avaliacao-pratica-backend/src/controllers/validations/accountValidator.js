import { z } from "zod";

const saveAccountValidator = (data) => {
  const schema = z.object({
    personId: z.string(),
    accountNumber: z.string()
      .refine((value) => /^[0-9]*$/.test(value), 'account number should contain only numbers'),
  });

  const validate = schema.passthrough().safeParse(data)

  if(!validate.success){
    return {
      success: false,
      message: "Dados inválidos", 
      errors: validate.error.issues.map(({ message, path }) => ({
          message,
          path,
      })),
    }
  }

  return {
    success: true,
  }
}

const accountByIdValidator = (data) => {
  const schema = z.object({
    accountId: z.string()
  });

  const validate = schema.passthrough().safeParse(data)

  if(!validate.success){
    return {
      success: false,
      message: "Dados inválidos", 
      errors: validate.error.issues.map(({ message, path }) => ({
          message,
          path,
      })),
    }
  }

  return {
    success: true,
  }
}

const updateAccountByIdValidator = (data) => {
  const schema = z.object({
    accountId: z.string(),
    personId: z.string(),
    accountNumber: z.string()
      .refine((value) => /^[0-9]*$/.test(value), 'account number should contain only numbers'),
  });

  const validate = schema.passthrough().safeParse(data)

  if(!validate.success){
    return {
      success: false,
      message: "Dados inválidos", 
      errors: validate.error.issues.map(({ message, path }) => ({
          message,
          path,
      })),
    }
  }

  return {
    success: true,
  }
}

export {
  saveAccountValidator,
  accountByIdValidator,
  updateAccountByIdValidator
};