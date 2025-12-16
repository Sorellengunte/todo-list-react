import React from "react";

type ButtonProps = {
  variant?: "ajouter" | "modifier" | "supprimer";
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Button({ variant = "ajouter", onClick, children }: ButtonProps) {
  const styles = {
    ajouter: "btn-primary",
    modifier: "btn-secondary",
    supprimer: "btn-danger",
  } as const;

  return <button onClick={onClick} className={styles[variant]}>{children}</button>;
}
