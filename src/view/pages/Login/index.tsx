import { AppRoutes } from "../../../Router/constants";
import { AuthForm } from "../../components/AuthForm";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function Login() {
  return (
    <AuthForm
      title="Entre em sua conta"
      subtitle="Novo por aqui?"
      linkTitle="Crie uma conta"
      linkTo={AppRoutes.REGISTER}
      children={
        <>
          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Senha" />
          <Button type="submit" className="mt-2">
            Entrar
          </Button>
        </>
      }
    />
  );
}
