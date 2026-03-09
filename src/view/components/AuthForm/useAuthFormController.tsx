import { useForm } from "react-hook-form";

export function useAuthFormController() {
  const { handleSubmit: hookFormHandleSubmit, register } = useForm();

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log("DATA");
    console.log(data);
  });

  return { handleSubmit, register };
}
