import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const SubmitWithAction = <
  TParams extends any[],
  TResult,
  TSubmit extends (...args: TParams) => TResult | Promise<TResult>
>(
  submit: TSubmit,
  action: 'redirect' | 'revalidate',
  url: string,
  revalidate?: 'layout' | 'page'
) =>
  async (...params: TParams): Promise<TResult> => {
    const result = await submit(...params); // await maneja si es una promesa o no

    if (revalidate) {
      revalidatePath(url, revalidate);
    }
    if (action === "redirect") {
      redirect(url); // Redirige tras éxito
    }
    return result;
  }

export { SubmitWithAction }