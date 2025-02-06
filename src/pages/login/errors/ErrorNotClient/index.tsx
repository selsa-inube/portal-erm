import { ErrorPage } from "@components/layout/ErrorPage";
import clientNotFound from "@assets/images/Expired.png";

function ErrorNotClient() {
  return (
    <ErrorPage
      image={clientNotFound}
      imageAlt="Cliente no encontrado"
      heading="No hay resultados..."
    />
  );
}

export { ErrorNotClient };
