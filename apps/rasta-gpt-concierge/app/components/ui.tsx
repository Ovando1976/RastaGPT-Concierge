"use client";
import React from "react";

export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <article className={`card ${className || ""}`}>{children}</article>
);

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "outline" }
> = ({ variant = "solid", className, ...props }) => (
  <button {...props} className={`btn ${variant === "outline" ? "btn-outline" : ""} ${className || ""}`} />
);

export const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <span className={`badge ${className || ""}`}>{children}</span>
);