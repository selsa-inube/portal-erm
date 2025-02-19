import { ErrorPage } from "@components/layout/ErrorPage";
import clientNotFound from "@assets/images/Expired.png";

function ErrorNotClient() {
  return (
    <ErrorPage
      image={clientNotFound}
      imageAlt="No se han encontrado unidades de negocio"
      heading="No se han encontrado unidades de negocio"
      errorCode={1003}
    />
  );
}

export { ErrorNotClient };
