import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { UseMatrixForm } from "./hooks/UseMatrixForm";

function MatrixApp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { form, onSubmit, qrData } = UseMatrixForm();

  return (
    <main className='p-4 max-w-screen-lg mx-auto'>
      <header className='mb-4'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          QR MATRIX ZOLUXIONS
        </h1>
      </header>
      <section className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Ingrese su matriz</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                {form.watch("matrix").map((row, rowIndex) => (
                  <div key={rowIndex} className='flex space-x-4'>
                    {row.map((_, colIndex) => (
                      <FormField
                        key={`${rowIndex}-${colIndex}`}
                        control={form.control}
                        name={`matrix.${rowIndex}.${colIndex}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{`Fila ${rowIndex + 1}, Columna ${
                              colIndex + 1
                            }`}</FormLabel>
                            <FormControl>
                              <Input type='number' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                ))}
                <Button type='submit'>Calcular</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Datos de la factorización QR</CardTitle>
            <CardDescription>
              Valores extraídos de la factorización qr de la matriz ingresada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <article className='grid grid-cols-2 [&_p]:scroll-m-20 [&_p]:text-2xl [&_p]:font-bold [&_p]:tracking-tight '>
              <div>
                <div className='mb-3'>
                  <h2>Valor máximo</h2>
                  <p className='mt-1 overflow-hidden truncate'>{qrData?.valorMaximo}</p>
                </div>
                <div className='mb-3'>
                  <h2>Promedio</h2>
                  <p className='mt-1 overflow-hidden truncate'>{qrData?.promedio}</p>
                </div>
                <div className='mb-3'>
                  <h2>Matriz Diagonal Q:</h2>
                  <p className='mt-1 overflow-hidden truncate'>{qrData?.Q_EsDiagonal ? "SI": "NO"}</p>
                </div>
              </div>
              <div>
                <div className='mb-3'>
                  <h2>Valor mínimo</h2>
                  <p className='mt-1 overflow-hidden truncate'>{qrData?.valorMinimo}</p>
                </div>
                <div className='mb-3 overflow-hidden truncate'>
                  <h2>Total</h2>
                  <p className='mt-1 overflow-hidden truncate'>{qrData?.sumaTotal}</p>
                </div>
                <div className='mb-3'>
                  <h2>Matriz Diagonal R:</h2>
                  <p className='mt-1 overflow-hidden truncate'>{qrData?.R_EsDiagonal ? "SI" : "NO"}</p>
                </div>
              </div>
            </article>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default MatrixApp;
