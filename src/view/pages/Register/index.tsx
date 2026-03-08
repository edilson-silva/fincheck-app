import { AppRoutes } from "../../../Router/constants";
import { AuthForm } from "../../components/AuthForm";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function Register() {
  return (
    <AuthForm
      title="Crie sua conta"
      subtitle="Já possui uma conta?"
      linkTitle="Fazer Login"
      linkTo={AppRoutes.LOGIN}
      children={
        <>
          <Input type="text" name="name" placeholder="Nome" />
          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Senha" />
          <Button type="submit" className="mt-2">
            Criar conta
          </Button>
        </>
      }
    />
  );
}
