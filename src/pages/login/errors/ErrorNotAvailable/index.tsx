import { ErrorPage } from "@components/layout/ErrorPage";

function ErrorNotAvailable() {
  return (
    <ErrorPage
      errorCode={403}
      heading="Acceso denegado"
      imageAlt="No tienes permisos para acceder a este recurso"
    />
  );
}

export { ErrorNotAvailable };
