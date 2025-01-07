"use client";
import React, { useState } from "react";
import Container from "./Container";
import Header from "./Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "@/components/default/Spinner";
import { toast } from "react-toastify";

export const schemaAuth = z.object({
  code: z.string().min(6, { message: "O código deve ter 6 caracteres" }),
});

export type DataSchemaAuth = z.infer<typeof schemaAuth>;

export default function InsertCodeLogin({
  onClose,
  nextPage,
}: {
  onClose: () => void;
  nextPage: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataSchemaAuth>({
    resolver: zodResolver(schemaAuth),
  });

  const onSubmit = async (data: DataSchemaAuth) => {
    setLoading(true);
    const result = await signIn("credentials", {
      value: data.code,
      codeValidationType: "1",
      redirect: false,
    });
    if (!result?.error) {
      onClose();
      nextPage();
    }
    if (result?.error) {
      toast.error("Código inválido");
      setLoading(false);
    }
  };
  return (
    <Container>
      <Header title="Autenticação" onClose={onClose} />
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        <p className={`text-sm text-[#636267]`}>
          Enviamos um código de recuperação para o seu e-mail ou telefone
          cadastrado. Por favor, verifique a sua caixa de entrada e a pasta de
          spam, se necessário.
        </p>

        <div className="space-y-1">
          <label className="block font-semibold">
            Digite o código: <span className="text-red-500">*</span>
          </label>
          <Input {...register("code")} type="name" placeholder="EX25YI" />
          {errors.code && <p>{errors.code.message}</p>}
        </div>

        <Button
          disabled={loading}
          type="submit"
          className="w-full bg-[#3088EE] text-white"
        >
          {loading ? <LoadingSpinner /> : "Continuar"}
        </Button>
      </form>
    </Container>
  );
}
