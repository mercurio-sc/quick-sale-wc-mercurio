import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Textarea,
  Button,
  Input,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import {
  DOCUMENT_TYPES,
  DEFAULT_DOCUMENT_TYPE,
  MAX_LENGTH_DESCRIPTION,
  MIN_CREDIT_VALUE,
} from "@wc/constants/constants";
import useMainContext from "@wc/hooks/use-main-context.hook";
import TransactionCreatedCard from "@wc/components/transaction-created-card";
import InformationModal from "@wc/components/information-modal";

export default function TransactionForm() {
  const { form, createTransaction, onSubmit } = useMainContext();

  return (
    <div className="mx-auto max-w-[786px] space-y-4 p-2">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card
          classNames={{
            base: "p-4",
          }}
        >
          <CardHeader>
            <h1 className="text-xl font-bold">Venta rápida</h1>
          </CardHeader>
          <CardBody className="space-y-5">
            <p>
              Haz ventas personalizadas para cada cliente, genera un enlace
              único e intransferible.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 place-items-start gap-3 md:grid-cols-2">
                <Controller
                  name="documentType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Select
                      label="Tipo de documento"
                      placeholder="Tipo de documento"
                      labelPlacement="outside"
                      variant="bordered"
                      defaultSelectedKeys={[DEFAULT_DOCUMENT_TYPE]}
                      isInvalid={!!fieldState.error}
                      errorMessage={fieldState.error?.message}
                      {...field}
                    >
                      {DOCUMENT_TYPES.map(({ value, name }) => (
                        <SelectItem key={value} value={value}>
                          {name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                  rules={{
                    required: "Tipo de documento requerido.",
                  }}
                />
                <Input
                  label="Número de documento"
                  placeholder="Ingresa el número de documento"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={!!form.formState.errors.documentNumber}
                  errorMessage={form.formState.errors.documentNumber?.message}
                  {...form.register("documentNumber", {
                    required: "Tu número de documento es requerido.",
                  })}
                />
              </div>

              <Controller
                name="saleValue"
                control={form.control}
                render={({ field, fieldState }) => (
                  <NumericFormat
                    label="Valor de la venta"
                    placeholder="Ingrese el valor de la venta"
                    labelPlacement="outside"
                    variant="bordered"
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    customInput={Input}
                    prefix="$ "
                    autoComplete="off"
                    decimalScale={2}
                    allowNegative={false}
                    thousandSeparator
                    valueIsNumericString
                    name={field.name}
                    getInputRef={field.ref}
                    value={field.value}
                    onBlur={field.onBlur}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue);
                    }}
                  />
                )}
                rules={{
                  required: "El valor de la venta es requerido.",
                  min: {
                    value: MIN_CREDIT_VALUE,
                    message: `El valor mínimo a pagar es ${new Intl.NumberFormat(
                      "es-CO",
                      {
                        currency: "COP",
                        style: "currency",
                        minimumFractionDigits: 0,
                      }
                    ).format(MIN_CREDIT_VALUE)}`,
                  },
                }}
              />

              <Textarea
                label="Descripción"
                placeholder="Ingresa una descripción de la venta rápida"
                labelPlacement="outside"
                variant="bordered"
                isInvalid={!!form.formState.errors.description}
                errorMessage={form.formState.errors.description?.message}
                disableAnimation
                disableAutosize
                {...form.register("description", {
                  required: "Ingresa una descripción de la venta rápida.",
                  maxLength: MAX_LENGTH_DESCRIPTION,
                })}
              />

              <div className="flex items-center rounded-large border border-default-200 bg-default-100 px-4 py-2">
                <span className="mr-3 text-xl text-foreground">
                  <i className="fa-regular fa-circle-info"></i>
                </span>
                <p className="text-sm">
                  Debemos validar si tu cliente está registrado con nosotros y
                  tiene cupo disponible para hacer la compra.
                </p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="justify-end">
            <Button
              className="font-semibold"
              color="primary"
              radius="full"
              type="submit"
              isLoading={
                form.formState.isSubmitting ||
                form.formState.isLoading ||
                createTransaction.isLoading
              }
            >
              Crear venta
            </Button>

            {createTransaction.isSuccess && (
              <div className="absolute inset-0 z-30 w-full bg-white/50"></div>
            )}
          </CardFooter>
        </Card>
      </form>

      <TransactionCreatedCard />

      <InformationModal />
    </div>
  );
}
