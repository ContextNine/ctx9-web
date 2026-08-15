export interface ErrorDescriptor {
  title: string;
  message: string;
  reference?: string;
  retry?: { label: string; action: () => void };
}
