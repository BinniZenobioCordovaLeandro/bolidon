import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from 'zod';

export const useReactForm = (
  schema: zod.ZodObject<any, any>
) => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
  });

  return {
    control,
    handleSubmit,
  };
};
