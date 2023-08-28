import { z } from "zod";

const savePersonValidator = (data) => {
  const schema = z.object({
    name: z.string()
        .min(3)
        .max(50)
        .refine((value) => /^[a-zA-Z\s]*$/.test(value), 'O nome deve conter apenas letras')
        .refine((value) => /^([A-Z][a-z]* *)*$/.test(value), 'A primeira letra do nome e do sobrenome deve começar com letra maiúscula'),
    document: z.string()
        .min(11)
        .max(11)
        .refine((value) => /^[0-9]*$/.test(value), 'O CPF deve conter apenas números'),
    address: z.string()
        .min(3)
        .max(50),
  });

  const validate = schema.passthrough().safeParse(data)

  if(!validate.success){
    return {
      success: false,
      message: "Dados inválidos " + validate.error.issues[0].message,  
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

const personByIdValidator = (data) => {
  const schema = z.object({
    personId: z.string()
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

const updatePersonByIdValidator = (data) => {
  const schema = z.object({
    personId: z.string(),
    name: z.string()
        .min(3)
        .max(50)
        .refine((value) => /^[a-zA-Z\s]*$/.test(value), 'O nome deve conter apenas letras')
        .refine((value) => /^([A-Z][a-z]* *)*$/.test(value), 'A primeira letra do nome e do sobrenome deve começar com letra maiúscula'),
    document: z.string()
        .min(11)
        .max(11)
        .refine((value) => /^[0-9]*$/.test(value), 'O CPF deve conter apenas números'),
        
  });

  const validate = schema.passthrough().safeParse(data)

  if(!validate.success){
    return {
      success: false,
      message: "Dados inválidos " + validate.error.issues[0].message, 
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
  savePersonValidator,
  personByIdValidator,
  updatePersonByIdValidator
};