import { getQRFactorization } from "@/api/matrixService"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  matrix: z.array(z.array(z.number({required_error: "Numbers is required"})))
})

interface MatrixResult {
  Q_EsDiagonal: boolean;
  R_EsDiagonal: boolean;
  promedio: number;
  sumaTotal: number;
  valorMaximo: number;
  valorMinimo: number;
}
export function UseMatrixForm() {

  const [qrData, setQRData] = useState<MatrixResult>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matrix: Array(3).fill(Array(3).fill(0)), // 3x3 matrix initialized with zeros
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await getQRFactorization(values.matrix);
    setQRData(data)
  }

  return {
    form,
    qrData,
    onSubmit
  }
}
