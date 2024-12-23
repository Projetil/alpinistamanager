"use client";
import React, { useState } from "react";
import Container from "./Container";
import Header from "./Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InsertCodeLogin({
  onClose,
  nextPage,
}: {
  onClose: () => void;
  nextPage: () => void;
}) {
  const [isCodeValid, setIsCodeValid] = useState<boolean | null>(null);

  const verifyCode = () => {
    return true;
  };

  const handleNext = () => {
    const isValid = verifyCode();
    setIsCodeValid(isValid);

    if (isValid) {
      onClose();
      nextPage();
    }
  };

  return (
    <Container>
      <Header title="Recuperar Senha" onClose={onClose} />
      <div className="p-4 space-y-4">
        <p
          className={`text-sm ${
            isCodeValid === false ? "text-red-600" : "text-gray-700"
          }`}
        >
          Enviamos um código de recuperação para o seu e-mail ou telefone
          cadastrado. Por favor, verifique a sua caixa de entrada e a pasta de
          spam, se necessário.
        </p>

        <div className="space-y-1">
          <label className="block font-semibold">
            Digite o código: <span className="text-red-500">*</span>
          </label>
          <Input type="name" placeholder="EX25YI" />
        </div>

        <Button onClick={handleNext} className="w-full bg-[#3088EE] text-white">
          Enviar
        </Button>
      </div>
    </Container>
  );
}
