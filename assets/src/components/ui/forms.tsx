import * as React from "react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = ({ children, initialValues = {}, handleSubmit }) => {
  const { data, setData, post, put, processing, errors } =
    useForm(initialValues);

  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={{ data, setData, errors }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

const FormContext = React.createContext(null);

const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext should be used within <Form>");
  }
  return context;
};

const FormField = ({ name, children }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
};

const FormFieldContext = React.createContext(null);

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const formContext = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    name: fieldContext.name,
    value: formContext.data[fieldContext.name] || "",
    setValue: (value) => formContext.setData(fieldContext.name, value),
    error: formContext.errors[fieldContext.name] || null,
  };
};

const FormItem = ({ className, children }) => {
  return <div className={cn("grid gap-2", className)}>{children}</div>;
};

const FormLabel = ({ className, htmlFor, ...props }) => {
  return (
    <Label
      className={cn("text-gray-700 dark:text-gray-300", className)}
      htmlFor={htmlFor}
      {...props}
    />
  );
};

const FormControl = ({ as: Component = "input", ...props }) => {
  const { name, value, setValue, error } = useFormField();

  return (
    <Component
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cn("border p-2 rounded-md w-full", error && "border-red-500")}
      {...props}
    />
  );
};

const FormDescription = ({ className, ...props }) => {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />;
};

const FormMessage = ({ className, error }) => {
  // const { error } = useFormField();

  if (!error) return null;

  return <p className={cn("text-red-500 text-sm", className)}>{error}</p>;
};

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
