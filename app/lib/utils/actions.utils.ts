import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const SubmitWithAction = <TEntity, TResult>(
  submit: (entity: TEntity) => Promise<TResult>,
  action: 'redirect' | 'revalidate',
  url: string,
  revalidate?: 'layout' | 'page'
) =>
  async (entity: TEntity): Promise<TResult> => {
    return submit(entity)
      .then((result) => {
        if (result) {
          if (revalidate) {
            revalidatePath(url, revalidate);
          }
          if (action === "redirect") {
            redirect(url); // Redirige tras éxito
          }
        }
        return result;
      })
  }

export { SubmitWithAction }