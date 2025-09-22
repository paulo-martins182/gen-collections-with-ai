export type InputChangeHandler = (value: string, field: any) => void;

export type FormDataTypes = {
  file: File | undefined;
  description: string;
  size: string;
  imageUrl: string;
};
