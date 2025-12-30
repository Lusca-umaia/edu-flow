import FormInput from "@/components/FormInput/FormInput";
import Button from "@/components/UI/Button/Button";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { enviarFeedback } from "@/services/tarefa/enviarFeedback";
import z from "zod";

const feedbackSchema = z.object({
  feedback: z
    .string()
    .refine((value) => value.trim().length > 0, "Informe o nome da tarefa"),
});

type FeedbackSchema = z.infer<typeof feedbackSchema>;

interface FeedbackProps {
  alunoId: string;
  tarefaId: string;
}

const Feedback: React.FC<FeedbackProps> = ({ alunoId, tarefaId }) => {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useFormSubmit<FeedbackSchema>({
      schema: feedbackSchema,
      initialData: { feedback: "" } as FeedbackSchema,
      onSubmit: async (data) =>
        await enviarFeedback({ alunoId, tarefaId, feedback: data.feedback }),
      redirectUrl: `/tarefa-alunos/${tarefaId}`,
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="bg-white shadow-lg w-full col-span-2 p-4 rounded-lg grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className={"col-span-full"}>
            <FormInput
              label="Feedback da tarefa"
              placeholder="Dê um feedback para a tarefa do aluno..."
              name={"feedback"}
              handleChange={(value) => handleChange("feedback", value)}
              value={formData["feedback" as keyof typeof formData].toString()}
              type={"textarea"}
              error={errors["feedback" as keyof typeof errors]}
              required
            />
          </div>
          <div className=" col-span-full pt-6 flex items-center justify-end border-t border-gray-900/10">
            <Button
              isLoading={false}
              disabled={isLoading}
              type="submit"
              buttonStyle="primary"
            >
              {false ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Feedback;
