import type { User } from "../../entities/user.entity";
import { httpClient } from "../httpClient";

type MeResponse = User;

export async function me(): Promise<MeResponse> {
  const { data } = await httpClient.get<MeResponse>("/users/me");

  return data;
}
