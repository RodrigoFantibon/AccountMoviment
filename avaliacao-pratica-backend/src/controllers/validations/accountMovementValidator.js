import { z } from "zod";

const saveAccountMovementValidator = (data) => {
  const schema = z.object({
    accountId: z.string(),
    value: z.number().positive(),
    action: z.string().refine((value) => ['deposit', 'withdraw'].includes(value), 'action should be deposit or withdraw'),
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
  saveAccountMovementValidator,
};