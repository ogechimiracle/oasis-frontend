import { useState } from "react";

type FormConfig = {
  booleanFields?: string[];
  numberFields?: string[];
};

export function useForm<T>(initialValues: T, config?:FormConfig) {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    setFormData((prev) => {
      // FILE INPUT
      if (target instanceof HTMLInputElement && target.type === "file") {
        return {
          ...prev,
          [target.name]: target.files?.[0] || null,
        };
      }

      // CHECKBOX
      if (target instanceof HTMLInputElement && target.type === "checkbox") {
        return {
          ...prev,
          [target.name]: target.checked,
        };
      }

       // BOOLEAN FIELDS
      if (
        target instanceof HTMLSelectElement &&
        config?.booleanFields?.includes(target.name)
      ) {
        return {
          ...prev,
          [target.name]: target.value === "true",
        };
      }

      // NUMBER FIELDS (optional extension)
      if (
        config?.numberFields?.includes(target.name)
      ) {
        return {
          ...prev,
          [target.name]: Number(target.value),
        };
      }

      // DEFAULT (text, textarea, select)
      return {
        ...prev,
        [target.name]: target.value,
      };
    });
  };

    const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, files } = e.target;

    if (!files || files.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0], // single file
    }));
  };

  const resetForm = () => setFormData(initialValues);

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
    handleFileChange
  };
}